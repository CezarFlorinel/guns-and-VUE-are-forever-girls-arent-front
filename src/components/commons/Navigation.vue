<template>
  <header class="header">
    <div class="logoItems">
      <router-link to="/" class="logoLink">
        <img
          class="logo"
          src="../../assets/images/elements/logo.webp"
          alt="Logo"
        />
      </router-link>
      <p class="logoTitle">The World Of Guns</p>
    </div>

    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/" class="nav-link">Guns</router-link>
      <router-link to="/" class="nav-link">Modifications</router-link>
      <router-link to="/" class="nav-link">Admin</router-link>
      <!--add check if it's admin or not, also remove admin for fav-->
      <router-link to="/" class="nav-link">Favourite</router-link>

      <router-link to="/">
        <!-- <router-link href="/"    TODO: replace with the user selected icon>
            <img class="AccountIcon" src="" alt="User Avatar" />
          </router-link> -->
        <router-link to="/login">
          <img
            class="AccountIcon"
            src="../../assets/images/elements/profile-user.png"
            alt="Default Profile"
          />
        </router-link>
      </router-link>
    </nav>
  </header>

  <!-- <audio
      id="clickSound"
      src="../../assets/audio/elements/shoot_cursror_sound.mp3"
    ></audio> -->
</template>

<script>
import "@/assets/CSS/navigation.css";
export default {
  name: "Navigation",
};
</script>
