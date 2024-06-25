<template>
  <div class="bodyCreateAccount">
    <div class="container mt-5">
      <h1 class="text-center mb-4">Create Account</h1>

      <form @submit.prevent="submitForm" class="border p-4 shadow rounded">
        <h3 class="h3-avatarSelection">Choose Your Avatar:</h3>
        <div class="avatar-selection text-center mb-4">
          <!-- Avatar 1 -->
          <label for="avatar1">
            <input
              type="radio"
              name="avatar"
              id="avatar1"
              value="1"
              required
              hidden
            />
            <img
              src="../../assets/images/account avatars/1.webp"
              alt="Avatar 1"
              class="avatar-img"
            />
          </label>
          <!-- Avatar 2 -->
          <label for="avatar2">
            <input
              type="radio"
              name="avatar"
              id="avatar2"
              value="2"
              required
              hidden
            />
            <img
              src="../../assets/images/account avatars/2.webp"
              alt="Avatar 2"
              class="avatar-img"
            />
          </label>
          <!-- Avatar 3 -->
          <label for="avatar3">
            <input
              type="radio"
              name="avatar"
              id="avatar3"
              value="3"
              required
              hidden
            />
            <img
              src="../../assets/images/account avatars/3.jpg"
              alt="Avatar 3"
              class="avatar-img"
            />
          </label>
          <!-- Avatar 4 -->
          <label for="avatar4">
            <input
              type="radio"
              name="avatar"
              id="avatar4"
              value="4"
              required
              hidden
            />
            <img
              src="../../assets/images/account avatars/4.webp"
              alt="Avatar 4"
              class="avatar-img"
            />
          </label>
          <!-- Avatar 5 -->
          <label for="avatar5">
            <input
              type="radio"
              name="avatar"
              id="avatar5"
              value="5"
              required
              hidden
            />
            <img
              src="../../assets/images/account avatars/5.jpg"
              alt="Avatar 5"
              class="avatar-img"
            />
          </label>
        </div>

        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            class="form-control"
            id="username"
            name="username"
            v-model="username"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            v-model="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            v-model="password"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            name="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/createAccount.css";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

export default {
  name: "MakeAccount",
  setup() {
    const userStore = useUserStore();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const submitForm = async () => {
      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const userData = {
          username: username.value,
          email: email.value,
          password: password.value,
          avatarId: document.querySelector('input[name="avatar"]:checked')
            .value,
        };
        await userStore.createUser(userData);
        Swal.fire({
          title: "Account Created!",
          text: "You can now log in.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    return { username, email, password, confirmPassword, submitForm };
  },
};
</script>
