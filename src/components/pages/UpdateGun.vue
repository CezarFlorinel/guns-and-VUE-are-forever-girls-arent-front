<template>
  <div class="the_container">
    <div class="container mt-5">
      <br />
      <h1 class="mb-4">Edit Gun</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="gunName">Name</label>
          <input
            type="text"
            class="form-control"
            id="gunName"
            v-model="form.gunName"
            required
          />
        </div>
        <div class="form-group">
          <label for="gunDescription">Description</label>
          <textarea
            class="form-control"
            id="gunDescription"
            v-model="form.gunDescription"
            rows="3"
            maxlength="999"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="gunYear">Year</label>
          <input
            type="number"
            class="form-control"
            id="gunYear"
            v-model="form.gunYear"
            step="1"
            required
          />
        </div>
        <div class="form-group">
          <label for="estimatedPrice">Estimated Price</label>
          <input
            type="number"
            class="form-control"
            id="estimatedPrice"
            v-model="form.estimatedPrice"
            step="0.01"
            required
          />
        </div>
        <div class="form-group">
          <label for="gunCountry">Country of Origin</label>
          <input
            type="text"
            class="form-control"
            id="gunCountry"
            v-model="form.gunCountry"
            required
          />
        </div>
        <div class="form-group">
          <label for="gunType">Type</label>
          <select class="form-control" v-model="form.gunType" required>
            <option v-for="option in gunTypes" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="gunImage">Gun Image</label>
          <input
            type="file"
            class="form-control-file"
            id="gunImage"
            @change="onFileChange('image', $event)"
          />
          <img
            v-if="form.gunImagePreview"
            :src="form.gunImagePreview"
            alt="Gun Image"
            style="max-width: 200px; max-height: 200px; margin-top: 10px"
          />
        </div>
        <div class="form-group">
          <label for="gunSound">Gun Sound</label>
          <input
            type="file"
            class="form-control-file"
            id="gunSound"
            @change="onFileChange('sound', $event)"
          />
          <audio
            v-if="form.gunSoundPreview"
            :src="form.gunSoundPreview"
            controls
            style="display: block; margin-top: 10px"
          ></audio>
        </div>
        <div class="btn-center">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/createWeapons.css";
import { onMounted, ref, computed } from "vue";
import { gunsStore } from "@/stores/gun";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useLoggedInStore } from "@/stores/logged_in";

export default {
  name: "EditGun",
  props: ["id"], // Get the gun ID from the route parameters
  setup(props) {
    const store = gunsStore();
    const router = useRouter();
    const loggedInStore = useLoggedInStore();
    const userID = computed(() => loggedInStore.getId);
    const userRole = computed(
      () => loggedInStore.isAdmin || localStorage.getItem("admin") === "true"
    );

    const form = ref({
      userID: 0,
      gunName: "",
      gunDescription: "",
      gunYear: "",
      estimatedPrice: "",
      gunCountry: "",
      gunType: "",
      gunImage: null,
      gunImagePreview: null,
      gunSound: null,
      gunSoundPreview: null,
    });

    const gunTypes = ref([]);

    onMounted(async () => {
      try {
        await store.fetchTypesOfGuns();
        gunTypes.value = store.gunTypes;

        const gunDetails = await store.getGunDetails(props.id); // Fetch gun details by ID
        form.value = {
          userID: gunDetails.userId,
          gunName: gunDetails.gunName,
          gunDescription: gunDetails.description,
          gunYear: gunDetails.year,
          estimatedPrice: gunDetails.estimatedPrice,
          gunCountry: gunDetails.countryOfOrigin,
          gunType: gunDetails.typeOfGun,
          gunImage: null,
          gunImagePreview: `data:image/jpeg;base64,${gunDetails.imagePath}`, // Set the existing image preview
          gunSound: null,
          gunSoundPreview: `data:audio/mp3;base64,${gunDetails.soundPath}`, // Set the existing audio preview
        };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });

    const onFileChange = (type, event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (type === "image") {
          form.value.gunImage = file;
          form.value.gunImagePreview = e.target.result;
        } else if (type === "sound") {
          form.value.gunSound = file;
          form.value.gunSoundPreview = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append("userId", userID.value);
      formData.append("gunName", form.value.gunName);
      formData.append("gunDescription", form.value.gunDescription);
      formData.append("gunYear", form.value.gunYear);
      formData.append("estimatedPrice", form.value.estimatedPrice);
      formData.append("gunCountry", form.value.gunCountry);
      formData.append("gunType", form.value.gunType);
      if (form.value.gunImage) {
        formData.append("gunImage", form.value.gunImage);
      }
      if (form.value.gunSound) {
        formData.append("gunSound", form.value.gunSound);
      }

      try {
        await store.updateGun(props.id, formData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Gun updated successfully!",
        });
        router.push(userRole.value ? "/guns" : "/favouriteguns");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };

    return {
      form,
      gunTypes,
      submitForm,
      onFileChange,
    };
  },
};
</script>

<style scoped>
label {
  color: white;
  margin-top: 10px;
  font-size: 25px;
}

.btn {
  margin-bottom: 10px;
  background-image: linear-gradient(25deg, #ff0000, #fbfbfb);
  min-width: 200px;
  min-height: 50px;
  font-size: 25px;
  max-width: 200px;
}

.btn:hover {
  background-image: linear-gradient(25deg, #fbfbfb, #ff0000);
}

.btn-1 {
  margin-top: 10px;
  margin-bottom: 10px;
  background-image: linear-gradient(25deg, #bfef00, #12dbaf);
  min-width: 200px;
  min-height: 50px;
  font-size: 25px;
}

@media (max-width: 400px) {
  .form-control {
    font-size: 15px;
    margin-bottom: 3px;
    max-width: 300px;
    margin-left: 13px;
  }

  label {
    margin-top: 8px;
    font-size: 18px;
    margin-left: 13px;
  }
}
</style>
