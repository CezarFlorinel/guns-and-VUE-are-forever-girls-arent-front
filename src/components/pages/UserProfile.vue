<template>
  <div class="the_body">
    <div class="container profile">
      <h1 class="profile-header">Profile</h1>
      <h2 id="subheader_top" class="profile-subheader">Current Avatar Icon:</h2>
      <div class="profile-picture text-center">
        <img class="AccountIcon" :src="avatarPath" alt="User Avatar" />
      </div>

      <form
        @submit.prevent="submitForm"
        class="border p-4 shadow rounded profile-form"
      >
        <div class="row">
          <div class="col-md-6">
            <h2 class="profile-subheader">Choose New Icon:</h2>
            <div class="avatar-selection">
              <label for="avatar1">
                <input
                  type="radio"
                  name="avatar"
                  id="avatar1"
                  value="1"
                  v-model="avatarId"
                />
                <img
                  src="../../assets/images/account avatars/1.webp"
                  alt="Avatar 1"
                  class="avatar-img"
                />
              </label>
              <label for="avatar2">
                <input
                  type="radio"
                  name="avatar"
                  id="avatar2"
                  value="2"
                  v-model="avatarId"
                />
                <img
                  src="../../assets/images/account avatars/2.webp"
                  alt="Avatar 2"
                  class="avatar-img"
                />
              </label>
              <label for="avatar3">
                <input
                  type="radio"
                  name="avatar"
                  id="avatar3"
                  value="3"
                  v-model="avatarId"
                />
                <img
                  src="../../assets/images/account avatars/3.jpg"
                  alt="Avatar 3"
                  class="avatar-img"
                />
              </label>
              <label for="avatar4">
                <input
                  type="radio"
                  name="avatar"
                  id="avatar4"
                  value="4"
                  v-model="avatarId"
                />
                <img
                  src="../../assets/images/account avatars/4.webp"
                  alt="Avatar 4"
                  class="avatar-img"
                />
              </label>
              <label for="avatar5">
                <input
                  type="radio"
                  name="avatar"
                  id="avatar5"
                  value="5"
                  v-model="avatarId"
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
                id="username"
                name="username"
                v-model="username"
                required
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="email"
                required
                class="form-control"
              />
            </div>
          </div>

          <div class="col-md-6">
            <h2 class="profile-subheader2">Change your password:</h2>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                v-model="password"
                required
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password2">Enter New Password:</label>
              <input
                type="password"
                id="passworNewPassword"
                name="passworNewPassword"
                v-model="passworNewPassword"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password3">Re-enter New Password:</label>
              <input
                type="password"
                id="passworNewPasswordEnterAgain"
                name="passworNewPassword"
                v-model="passworNewPasswordEnterAgain"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary">Update Profile</button>
        </div>
      </form>

      <button @click="logout" class="btn btn-danger btn-animate">
        LOG OUT
      </button>

      <p class="text-paragraph">
        In order to make any changes to your account, the password field is
        mandatory to be completed!
      </p>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/profile.css";
import { useLoggedInStore } from "@/stores/logged_in";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import router from "@/router/index";
import Swal from "sweetalert2";

export default {
  name: "UserProfile",
  setup() {
    const loggedInStore = useLoggedInStore();
    const userAvatarID = computed(() => loggedInStore.getAvatarId);
    const userStore = useUserStore();
    const avatarPath = computed(() =>
      userStore.returnUserProfilePicture(userAvatarID.value)
    );
    const email = ref(loggedInStore.getEmail);
    const username = ref(loggedInStore.getUsername);
    const password = ref("");
    const passworNewPassword = ref("");
    const passworNewPasswordEnterAgain = ref("");
    const avatarId = ref(loggedInStore.getAvatarId);

    const submitForm = async () => {
      if (password.value === "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password field is mandatory!",
        });
        return;
      }
      try {
        const updatedData = {
          username: username.value,
          email: email.value,
          avatarId: avatarId.value,
          password: password.value,
        };

        await userStore.updateUser(loggedInStore.getUsername, updatedData);
        loggedInStore.updateProfile(updatedData);

        if (passworNewPassword.value !== "") {
          if (passworNewPassword.value !== passworNewPasswordEnterAgain.value) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "New passwords do not match!",
            });
            return;
          } else {
            const updatedPasswordData = {
              password: password.value,
              username: username.value,
              newPassword: passworNewPassword.value,
            };
            await userStore.updatePassword(updatedPasswordData);
          }
        }
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    };

    const logout = () => {
      loggedInStore.logout();
      router.push("/");
    };

    return {
      avatarPath,
      email,
      username,
      password,
      passworNewPassword,
      passworNewPasswordEnterAgain,
      avatarId,
      submitForm,
      logout,
    };
  },
};
</script>
