<template>
  <div class="the_admin_panel">
    <div class="container mt-4">
      <div class="adminContainer shadow-sm p-3 mb-5 bg-white rounded">
        <div class="adminContent">
          <h1 class="adminTitle">Welcome to the admin panel</h1>
          <h2 class="adminSubtitle">
            Here you can manage the users, modifications, and Q&A
          </h2>

          <!-- navigation of the page -->
          <div class="navigation mt-3">
            <h3 class="jump-to-title">Jump to:</h3>
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link text-primary" href="#usersSection">Users</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-primary" href="#qnaSection"
                  >Question and Answer</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link text-primary" href="#modificationsSection"
                  >Modifications</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="adminContent">
          <h1 id="usersSection" class="adminSubtitle">Users</h1>
          <div class="adminList">
            <ul v-for="user in users" :key="user.userId" class="list-group">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{{ user.username }}</span>
                <button
                  v-if="userRole && isLoggedIn"
                  @click="deleteUser(user.userId)"
                  class="delete-user-btn btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
          <br />

          <h1 id="qnaSection" class="adminSubtitle">Question and Answer</h1>
          <div class="bg-light shadow rounded p-3">
            <div id="containerForQandAstorage">
              <div
                class="qanda-card p-3 border-bottom d-flex justify-content-between align-items-start"
                data-id="${QandA.questionAndAnswerId}"
              >
                <div>
                  <p>Q:</p>
                  <p
                    class="question h5 font-weight-bold mb-0"
                    contenteditable="false"
                  >
                    ${question}
                  </p>
                  <p>A:</p>
                  <p class="answer mt-2" contenteditable="false">${answer}</p>
                </div>
                <div class="buttons-container d-flex align-items-start">
                  <button
                    class="delete-QandA-btn btn btn-danger ml-2 py-2 px-4 rounded hover:bg-opacity-75 transition"
                    onclick="deleteQandA(this)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div id="addForm" class="d-none p-3 bg-secondary border rounded">
              <h2 class="h5 mb-2">Add New Question and Answer:</h2>
              <div>
                <label for="newQuestion">Question:</label>
                <input
                  type="text"
                  id="newQuestion"
                  class="form-control mt-1 mb-2"
                />
                <label for="newAnswer">Answer:</label>
                <textarea
                  id="newAnswer"
                  class="form-control mt-1 mb-2"
                ></textarea>
                <button
                  id="submitNewInfo"
                  class="btn btn-primary py-2 px-4 rounded hover:bg-opacity-75 transition"
                >
                  Submit
                </button>
              </div>
            </div>

            <div class="p-3">
              <button
                id="addQandABtn"
                class="add-QandA-btn btn btn-success py-2 px-4 rounded hover:bg-opacity-75 transition"
              >
                Add +
              </button>
            </div>
          </div>

          <h1 id="modificationsSection" class="adminSubtitle">
            Modifications:
          </h1>
          <div class="bg-light shadow rounded p-3">
            <div id="containerForModifications">
              <div
                class="modification-card p-3 border-bottom d-flex justify-content-between align-items-start"
                data-id="${modification.modificationId}"
              >
                <div>
                  <p>Name:</p>
                  <p
                    class="name h5 font-weight-bold mb-0"
                    contenteditable="false"
                  >
                    ${name}
                  </p>
                  <br />
                  <p>Description:</p>
                  <p class="description mt-2" contenteditable="false">
                    ${description}
                  </p>
                  <p>Estimated Price:</p>
                  <p class="estimatedPrice mt-2 d-block">€${formattedPrice}</p>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control mt-2 estimatedPriceInput d-none"
                    value="${formattedPrice}"
                  />
                  <p>Image:</p>
                  <div class="row">
                    <div class="col-6 col-md-4 col-lg-3">
                      <img
                        src=""
                        class="img-fluid img-thumbnail"
                        alt="Modification Image"
                      />
                    </div>
                    <div
                      class="col-6 col-md-8 col-lg-9 d-flex flex-column justify-content-end"
                    >
                      <input type="file" class="form-control mt-2" disabled />
                    </div>
                  </div>
                </div>
                <div class="buttons-container d-flex align-items-start">
                  <button
                    class="edit-modification-btn btn btn-primary py-2 px-4 rounded hover:bg-opacity-75 transition"
                    onclick="editModification(this)"
                  >
                    Edit
                  </button>
                  <button
                    class="delete-modification-btn btn btn-danger ml-2 py-2 px-4 rounded hover:bg-opacity-75 transition"
                    onclick="deleteModification(this)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <h2>Create new modification</h2>

            <div
              id="newModificationCard"
              class="modification-card p-3 border-bottom d-flex justify-content-between"
            >
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  class="form-control nameInput mb-2"
                  placeholder="Enter name"
                  required
                />
                <p>Description:</p>
                <textarea
                  class="form-control descriptionInput mb-2"
                  placeholder="Enter description"
                  required
                ></textarea>
                <p>Estimated Price:</p>
                <input
                  type="number"
                  step="0.01"
                  class="form-control estimatedPriceInput mb-2"
                  placeholder="Enter price"
                  required
                />
                <p>Image:</p>
                <input
                  type="file"
                  class="form-control imageInput mb-2"
                  required
                />
              </div>
              <div>
                <button
                  class="save-modification-btn btn btn-success py-2 px-4 rounded hover:bg-opacity-75 transition"
                  onclick="saveNewModification()"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/CSS/admin.css";
import { onMounted, toRefs, computed, ref, watch } from "vue";
import { useLoggedInStore } from "@/stores/logged_in";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

export default {
  name: "Admin",
  setup() {
    const loggedInStore = useLoggedInStore();
    const userStore = useUserStore();
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn);
    const userRole = computed(
      () => loggedInStore.isAdmin || localStorage.getItem("admin") === "true"
    );

    onMounted(async () => {
      if (isLoggedIn.value) {
        try {
          await userStore.fetchAllUsers();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while fetching users!",
          });
        }
      }
    });

    const deleteUser = async (userId) => {
      try {
        await userStore.deleteUser(userId);
        await userStore.fetchAllUsers();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while deleting the user!",
        });
      }
    };

    const { users } = toRefs(userStore);

    return {
      isLoggedIn,
      userRole,
      users,
      deleteUser,
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: "Keania One", sans-serif;
  font-size: 50px;
  margin-bottom: 50px;
  text-align: center;
}

h2 {
  font-family: "Keania One", sans-serif;
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}

@media (max-width: 480px) {
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
