<template>
  <div class="guns_container">
    <div class="image-container">
      <img
        class="image"
        src="../../assets/images/elements/favourite.png"
        alt="Guns Collection Image"
      />
    </div>

    <div class="container mt-4">
      <h1 class="mb-4">Guns Collection</h1>
      <div class="row">
        <h2 class="mb-4">Favourite Guns</h2>
        <div class="guns_store col-12">
          <div v-for="gun in favouriteGuns" :key="gun.gunId" class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="'data:image/jpeg;base64,' + gun.imagePath"
                  class="img-fluid rounded-start"
                  alt="Gun Image"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body position-relative">
                  <h5 class="gun-title card-title">{{ gun.gunName }}</h5>
                  <p class="gun-description card-text">{{ gun.description }}</p>
                  <p class="card-text">
                    <small class="text-muted">
                      Type of gun: {{ gun.typeOfGun }} | Year: {{ gun.year }} |
                      Country: {{ gun.countryOfOrigin }} | Price:~
                      {{ gun.estimatedPrice }} $
                    </small>
                  </p>
                  <img
                    v-if="!userRole || !isLoggedIn"
                    src="../../assets/images/elements/star.png"
                    class="clickable img-button img-fluid"
                    alt="Star Image"
                    @click="removeFromFavourites(gun.gunId)"
                  />
                  <img
                    src="../../assets/images/elements/speaker-filled-audio-tool.png"
                    class="clickable img-button img-fluid"
                    alt="Audio Image"
                    @click="playAudio(gun.soundPath)"
                  />
                  <audio
                    :src="'data:audio/mp3;base64,' + gun.soundPath"
                    class="audio-player"
                    hidden
                    controls
                  ></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 class="mb-4">Guns Made By You</h2>
        <div class="guns_store col-12">
          <div v-for="gun in guns" :key="gun.gunId" class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="'data:image/jpeg;base64,' + gun.imagePath"
                  class="img-fluid rounded-start"
                  alt="Gun Image"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body position-relative">
                  <h5 class="gun-title card-title">{{ gun.gunName }}</h5>
                  <p class="gun-description card-text">{{ gun.description }}</p>
                  <p class="card-text">
                    <small class="text-muted">
                      Type of gun: {{ gun.typeOfGun }} | Year: {{ gun.year }} |
                      Country: {{ gun.countryOfOrigin }} | Price:~
                      {{ gun.estimatedPrice }} $
                    </small>
                  </p>
                  <div class="admin-buttons">
                    <button
                      v-if="isLoggedIn"
                      class="delete_btn btn btn-danger btn-sm"
                    >
                      <i class="bi bi-trash-fill"></i> Delete
                    </button>
                    <button
                      v-if="isLoggedIn"
                      class="edit_btn btn btn-primary btn-sm"
                      @click="navigateToEditPage(gun.gunId)"
                    >
                      <i class="bi bi-pencil-fill"></i> Edit
                    </button>
                  </div>
                  <img
                    src="../../assets/images/elements/speaker-filled-audio-tool.png"
                    class="clickable img-button img-fluid"
                    alt="Audio Image"
                    @click="playAudio(gun.soundPath)"
                  />
                  <audio
                    :src="'data:audio/mp3;base64,' + gun.soundPath"
                    class="audio-player"
                    hidden
                    controls
                  ></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isLoggedIn"
      @click="goToCreateGunPage"
      class="createButtonForAdminWithJs"
    >
      <button class="fancy-add-btn"><i class="fas fa-plus"></i> Add Gun</button>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/guns.css";
import { onMounted, toRefs, computed } from "vue";
import { gunsStore } from "@/stores/gun";
import Swal from "sweetalert2";
import { useLoggedInStore } from "@/stores/logged_in";
import { useRouter } from "vue-router";

export default {
  name: "FavoriteGuns",
  setup() {
    const store = gunsStore();
    const loggedInStore = useLoggedInStore();
    const userID = computed(() => loggedInStore.getId);
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn);
    const userRole = computed(
      () => loggedInStore.isAdmin || localStorage.getItem("admin") === "true"
    );
    const router = useRouter();

    onMounted(async () => {
      try {
        await store.fetchGunsToDisplayInFavouritesPage(userID.value);
        await store.fetchGunsMadeByUser(userID.value);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });

    const playAudio = (soundPath) => {
      const audio = new Audio(`data:audio/mp3;base64,${soundPath}`);
      audio.play();
    };

    const removeFromFavourites = async (gunId) => {
      try {
        await store.removeFromFavourites(gunId, userID.value);
        await store.fetchGunsToDisplayInFavouritesPage(userID.value);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Could not remove the gun from favourites!",
        });
      }
    };

    const goToCreateGunPage = () => {
      router.push("/creategun");
    };
    const navigateToEditPage = (gunId) => {
      router.push({ name: "UpdateGun", params: { id: gunId } });
    };

    const { favouriteGuns, loading, error, guns } = toRefs(store);

    return {
      guns,
      favouriteGuns,
      loading,
      error,
      playAudio,
      isLoggedIn,
      userRole,
      removeFromFavourites,
      goToCreateGunPage,
      navigateToEditPage,
    };
  },
};
</script>
