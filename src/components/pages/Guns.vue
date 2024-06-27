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
                  <div class="admin-buttons">
                    <button
                      v-if="userRole && isLoggedIn"
                      class="delete_btn btn btn-danger btn-sm"
                    >
                      <i class="bi bi-trash-fill"></i> Delete
                    </button>
                    <button
                      v-if="userRole && isLoggedIn"
                      class="edit_btn btn btn-primary btn-sm"
                    >
                      <i class="bi bi-pencil-fill"></i> Edit
                    </button>
                  </div>
                  <img
                    v-if="!userRole || !isLoggedIn"
                    :src="
                      isFavourite(gun.gunId)
                        ? '../../src/assets/images/elements/star.png'
                        : '../../src/assets/images/elements/starv2.png'
                    "
                    class="clickable img-button img-fluid"
                    alt="Star Image"
                    @click="toggleFavourite(gun.gunId)"
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
          <nav aria-label="page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                  class="page-link"
                  @click.prevent="fetchGunsToDisplayInMainPage(currentPage - 1)"
                  >Previous</a
                >
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a
                  class="page-link"
                  @click.prevent="fetchGunsToDisplayInMainPage(page)"
                  >{{ page }}</a
                >
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <a
                  class="page-link"
                  @click.prevent="fetchGunsToDisplayInMainPage(currentPage + 1)"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
          <br />
        </div>
      </div>
    </div>

    <div v-if="userRole && isLoggedIn" class="createButtonForAdminWithJs">
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

export default {
  name: "Guns",
  setup() {
    const store = gunsStore();
    const loggedInStore = useLoggedInStore();
    const userID = computed(() => loggedInStore.getId);
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn);
    const userRole = computed(
      () => loggedInStore.isAdmin || localStorage.getItem("admin") === "true"
    );

    onMounted(async () => {
      if (isLoggedIn.value) {
        try {
          await store.getIdsOfFavouriteGuns(userID.value);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while finding your favourite guns!",
          });
        }
      }
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

    const toggleFavourite = async (gunId) => {
      try {
        if (store.favouriteGunsIds.includes(gunId)) {
          await store.removeFromFavourites(gunId, userID.value);
        } else {
          await store.addGunToFavourites(gunId, userID.value);
        }
        await store.getIdsOfFavouriteGuns(userID.value);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while toggling the favourite status!",
        });
      }
    };

    const isFavourite = (gunId) => {
      return store.favouriteGunsIds.includes(gunId);
    };

    const {
      guns,
      loading,
      error,
      currentPage,
      totalPages,
      fetchGunsToDisplayInMainPage,
    } = toRefs(store);

    return {
      guns,
      loading,
      error,
      playAudio,
      toggleFavourite,
      isFavourite,
      isLoggedIn,
      userRole,
      currentPage,
      totalPages,
      fetchGunsToDisplayInMainPage,
    };
  },
};
</script>
