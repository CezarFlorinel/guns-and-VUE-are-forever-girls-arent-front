<template>
  <div class="guns_container">
    <div class="image-container">
      <img
        class="image"
        src="../../assets/images/elements/guns.jpg"
        alt="Guns Collection Image"
      />
    </div>

    <div class="container mt-4">
      <h1 class="mb-4">Guns Collection</h1>
      <div class="row">
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

    <div class="createButtonForAdminWithJs">
      <button class="fancy-add-btn"><i class="fas fa-plus"></i> Add Gun</button>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/guns.css";
import { onMounted, toRefs } from "vue";
import { gunsStore } from "@/stores/gun";
import Swal from "sweetalert2";

export default {
  name: "Guns",
  setup() {
    const store = gunsStore();

    onMounted(async () => {
      try {
        await store.fetchGunsToDisplayInMainPage();
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

    console.log(store.guns);
    const { guns, loading, error } = toRefs(store);

    return {
      guns,
      loading,
      error,
      playAudio,
    };
  },
};
</script>
