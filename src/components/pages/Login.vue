<template>
  <section>
    <div class="logInBody">
      <h1 class="logInHeader text-center">Log In</h1>
      <form class="logInForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            class="form-control"
            id="inputUsername"
            v-model="username"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            class="form-control"
            id="inputPassword"
            v-model="password"
            type="password"
          />
        </div>
        <button @click="login" type="button" class="btn btn-primary">
          Log In
        </button>
        <p class="account-creation-p">
          Don't have an account? <a href="/createAccount">Sign Up</a>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import "@/assets/CSS/logIn.css";
import { useLoggedInStore } from "@/stores/logged_in";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

export default {
  name: "Login",
  setup() {
    const { proxy } = getCurrentInstance();
    const username = ref("");
    const password = ref("");
    const store = useLoggedInStore();
    const router = useRouter();

    const login = async () => {
      try {
        await store.login(username.value, password.value);
        if (store.isLoggedIn) {
          proxy.$swal.fire({
            title: "Success",
            text: "Login Successful",
            icon: "success",
            confirmButtonText: "OK",
          });
          router.replace("/");
        } else {
          proxy.$swal.fire({
            title: "Error",
            text: "Login Failed",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        proxy.$swal.fire({
          title: "Error",
          text: "Login Failed",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(error);
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.btn-primary {
  font-size: 1.2rem;
  padding: 10px 24px;
  width: 100%;
  font-family: "Keania One", sans-serif;
  background-color: black;
}
</style>
