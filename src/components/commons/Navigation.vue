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
      <router-link to="/guns" class="nav-link">Guns</router-link>
      <router-link to="/modifications" class="nav-link"
        >Modifications</router-link
      >

      <router-link to="/" v-if="userRole && isLoggedIn" class="nav-link"
        >Admin</router-link
      >
      <!--add check if it's admin or not, also remove admin for fav-->
      <router-link to="/" v-if="!userRole && isLoggedIn" class="nav-link"
        >Favourite</router-link
      >

      <router-link to="/userprofile" v-if="isLoggedIn">
        <img class="AccountIcon" :src="avatarPath" alt="User Avatar" />
      </router-link>
      <router-link to="/login" v-if="!isLoggedIn">
        <img
          class="AccountIcon"
          src="../../assets/images/elements/profile-user.png"
          alt="Default Profile"
        />
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
import { useLoggedInStore } from "@/stores/logged_in";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

export default {
  name: "Navigation",
  setup() {
    const loggedInStore = useLoggedInStore();
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn);
    const userRole = computed(
      () => loggedInStore.isAdmin || localStorage.getItem("admin") === "true"
    );
    const userAvatarID = computed(() => loggedInStore.getAvatarId);
    const userStore = useUserStore();
    const avatarPath = computed(() =>
      userStore.returnUserProfilePicture(userAvatarID.value)
    );

    return { isLoggedIn, userRole, avatarPath };
  },
};
</script>
