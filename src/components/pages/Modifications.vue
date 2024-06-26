<template>
  <div class="all_container">
    <div class="image-container">
      <img
        class="image"
        src="../../assets/images/elements/Modifications-image-page.jpg"
        alt="Modification Image"
      />
    </div>

    <!-- Modifications Grid -->
    <div class="container mt-5">
      <h1 class="header-image">Modifications</h1>

      <div class="row">
        <div
          v-for="modification in modifications"
          :key="modification.modificationId"
          class="col-md-3 col-sm-6 mb-4"
        >
          <div class="modification-item bg-dark text-white p-3">
            <img
              :src="'data:image/jpeg;base64,' + modification.imagePath"
              class="img-fluid"
              :alt="modification.name"
            />
            <h5 class="mt-3">{{ modification.name }}</h5>
            <p class="description">
              Description: {{ modification.description }}
            </p>
            <p class="estimated-price">
              Estimated Price: ${{ modification.estimatedPrice }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/modifications.css";
import { ref, onMounted } from "vue";
import { modificationsStore } from "@/stores/modifications";
import Swal from "sweetalert2";

export default {
  name: "Modifications",
  setup() {
    const store = modificationsStore();
    try {
      store.fetchModifications();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    console.log(store.modifications);
    return {
      modifications: store.modifications,
      loading: store.loading,
      error: store.error,
    };
  },
};
</script>
