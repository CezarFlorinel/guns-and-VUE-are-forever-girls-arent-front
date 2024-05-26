<template>
  <div>
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navigation from "./components/commons/Navigation.vue";
import Footer from "./components/commons/Footer.vue";
import { useLoggedInStore } from "@/stores/logged_in";

export default {
  name: "App",
  components: {
    Navigation,
    Footer,
  },
  created() {
    const store = useLoggedInStore();
    store.autoLogin();
  },
};
</script>

<style>
/* Style as needed */
</style>
