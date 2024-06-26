<template>
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
      <div class="col-md-3 col-sm-6 mb-4">
        <div class="modification-item bg-dark text-white p-3">
          <img src="path" class="img-fluid" alt="name" />
          <h5 class="mt-3">name</h5>
          <p class="description">Description: description</p>
          <p class="estimated-price">Estimated Price: price $</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/modifications.css";

export default {
  name: "Modifications",
};
</script>
