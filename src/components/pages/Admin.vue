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
                v-for="QandA in questionAndAnswers"
                :key="QandA.questionAndAnswerId"
              >
                <div>
                  <p>Q:</p>
                  <p class="question h5 font-weight-bold mb-0">
                    {{ QandA.question }}
                  </p>
                  <p>A:</p>
                  <p class="answer mt-2">
                    {{ QandA.answer }}
                  </p>
                </div>
                <div class="buttons-container d-flex align-items-start">
                  <button
                    class="delete-QandA-btn btn btn-danger ml-2 py-2 px-4 rounded hover:bg-opacity-75 transition"
                    @click="deleteQandA(QandA.questionAndAnswerId)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div id="addForm" class="p-3 bg-secondary border rounded">
              <h2 class="h5 mb-2">Add New Question and Answer:</h2>
              <div>
                <label for="newQuestion">Question:</label>
                <input
                  type="text"
                  id="newQuestion"
                  class="form-control mt-1 mb-2"
                  required
                />
                <label for="newAnswer">Answer:</label>
                <textarea
                  id="newAnswer"
                  class="form-control mt-1 mb-2"
                  required
                ></textarea>
                <button
                  @click="createQuestionAndAnswer"
                  class="btn btn-primary py-2 px-4 rounded hover:bg-opacity-75 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <h1 id="modificationsSection" class="adminSubtitle">
            Modifications:
          </h1>
          <div class="bg-light shadow rounded p-3">
            <div id="containerForModifications">
              <div
                class="modification-card p-3 border-bottom d-flex justify-content-between align-items-start"
                v-for="modification in modifications"
                :key="modification.modificationId"
              >
                <div>
                  <p>Name:</p>
                  <p class="name h5 font-weight-bold mb-0">
                    {{ modification.name }}
                  </p>
                  <br />
                  <p>Description:</p>
                  <p class="description mt-2">
                    {{ modification.description }}
                  </p>
                  <p>Estimated Price:</p>
                  <p class="estimatedPrice mt-2 d-block">
                    €{{ modification.estimatedPrice }}
                  </p>
                  <p>Image:</p>
                  <div class="row">
                    <div class="col-6 col-md-4 col-lg-3">
                      <img
                        :src="
                          'data:image/jpeg;base64,' + modification.imagePath
                        "
                        class="img-fluid img-thumbnail"
                        alt="Modification Image"
                      />
                    </div>
                  </div>
                </div>
                <div class="buttons-container d-flex align-items-start">
                  <button
                    class="edit-modification-btn btn btn-primary py-2 px-4 rounded hover:bg-opacity-75 transition"
                    @click="editModification(modification.modificationId)"
                  >
                    Edit
                  </button>
                  <button
                    class="delete-modification-btn btn btn-danger ml-2 py-2 px-4 rounded hover:bg-opacity-75 transition"
                    @click="deleteModification(modification.modificationId)"
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
                  v-model="newModification.name"
                  class="form-control nameInput mb-2"
                  placeholder="Enter name"
                  required
                />
                <p>Description:</p>
                <textarea
                  v-model="newModification.description"
                  class="form-control descriptionInput mb-2"
                  placeholder="Enter description"
                  required
                ></textarea>
                <p>Estimated Price:</p>
                <input
                  type="number"
                  v-model="newModification.estimatedPrice"
                  step="0.01"
                  class="form-control estimatedPriceInput mb-2"
                  placeholder="Enter price"
                  required
                />
                <p>Image:</p>
                <input
                  type="file"
                  @change="handleImageUpload"
                  class="form-control imageInput mb-2"
                  required
                />
              </div>
              <div>
                <button
                  class="save-modification-btn btn btn-success py-2 px-4 rounded hover:bg-opacity-75 transition"
                  @click="saveNewModification"
                >
                  Save
                </button>
              </div>
            </div>
            <!-- Edit modification section -->
            <h2>Edit modification</h2>
            <p>Select a modification to edit</p>
            <div
              v-if="isEditing"
              id="editModificationCard"
              class="modification-card p-3 border-bottom d-flex justify-content-between mt-3"
            >
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  v-model="editModificationData.name"
                  class="form-control nameInput mb-2"
                  placeholder="Enter name"
                  required
                />
                <p>Description:</p>
                <textarea
                  v-model="editModificationData.description"
                  class="form-control descriptionInput mb-2"
                  placeholder="Enter description"
                  required
                ></textarea>
                <p>Estimated Price:</p>
                <input
                  type="number"
                  v-model="editModificationData.estimatedPrice"
                  step="0.01"
                  class="form-control estimatedPriceInput mb-2"
                  placeholder="Enter price"
                  required
                />
                <p>Image:</p>
                <input
                  type="file"
                  @change="handleEditImageUpload"
                  class="form-control imageInput mb-2"
                />
                <img
                  v-if="editModificationData.imagePath"
                  :src="
                    'data:image/jpeg;base64,' + editModificationData.imagePath
                  "
                  class="img-fluid img-thumbnail mt-2"
                  alt="Modification Image"
                />
              </div>
              <div>
                <button
                  class="save-modification-btn btn btn-success py-2 px-4 rounded hover:bg-opacity-75 transition"
                  @click="saveEditedModification"
                >
                  Save
                </button>
                <button
                  class="cancel-edit-modification-btn btn btn-secondary py-2 px-4 rounded hover:bg-opacity-75 transition ml-2"
                  @click="cancelEdit"
                >
                  Cancel
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
import { onMounted, toRefs, computed, ref } from "vue";
import { useLoggedInStore } from "@/stores/logged_in";
import { useUserStore } from "@/stores/user";
import { useQaAStore } from "@/stores/QaA";
import { modificationsStore } from "@/stores/modifications";
import Swal from "sweetalert2";

export default {
  name: "Admin",
  setup() {
    //#region Variables
    const loggedInStore = useLoggedInStore();
    const userStore = useUserStore();
    const modificationStore = modificationsStore();
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn);
    const QaAStore = useQaAStore();
    const userRole = computed(
      () => loggedInStore.isAdmin || localStorage.getItem("admin") === "true"
    );

    const newModification = ref({
      name: "",
      description: "",
      estimatedPrice: "",
      image: null,
    });

    const isEditing = ref(false);
    const editModificationData = ref({
      id: null,
      name: "",
      description: "",
      estimatedPrice: "",
      image: null,
      imagePath: "",
    });

    //#endregion

    onMounted(async () => {
      if (isLoggedIn.value) {
        try {
          await userStore.fetchAllUsers();
          await QaAStore.fetchQuestionAndAnswers();
          await modificationStore.fetchModifications(1, 100);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while fetching users!",
          });
        }
      }
    });

    //#region delete functions
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

    const deleteQandA = async (QandAId) => {
      try {
        await QaAStore.deleteQuestionAndAnswer(QandAId);
        // await QaAStore.fetchQuestionAndAnswers();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    };
    //#endregion

    //#region create functions question and answer
    const createQuestionAndAnswer = async () => {
      const newQuestion = document.getElementById("newQuestion").value;
      const newAnswer = document.getElementById("newAnswer").value;

      if (!newQuestion || !newAnswer) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all the fields!",
        });
        return;
      }

      const newQuestionAndAnswer = {
        question: newQuestion,
        answer: newAnswer,
      };

      try {
        await QaAStore.createQuestionAndAnswer(newQuestionAndAnswer);
        await QaAStore.fetchQuestionAndAnswers();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "New Q&A added successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    };

    //#endregion

    //#region create functions modification
    const handleImageUpload = (event) => {
      newModification.value.image = event.target.files[0];
    };

    const saveNewModification = async () => {
      if (
        !newModification.value.name ||
        !newModification.value.description ||
        !newModification.value.estimatedPrice ||
        !newModification.value.image
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all the fields and upload an image!",
        });
        return;
      }

      const formData = new FormData();
      formData.append("modificationName", newModification.value.name);
      formData.append(
        "modificationDescription",
        newModification.value.description
      );
      formData.append("estimatedPrice", newModification.value.estimatedPrice);
      formData.append("modificationImage", newModification.value.image);

      try {
        await modificationStore.createModification(formData);
        await modificationStore.fetchModifications(1, 100);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Modification created successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    };

    //#endregion

    const handleEditImageUpload = (event) => {
      editModificationData.value.image = event.target.files[0];
    };

    const editModification = (modificationId) => {
      const modification = modificationStore.getModificationById(
        parseInt(modificationId)
      );
      isEditing.value = true;
      editModificationData.value = {
        id: modification.modificationId,
        name: modification.name,
        description: modification.description,
        estimatedPrice: modification.estimatedPrice,
        imagePath: modification.imagePath,
        image: null,
      };
    };

    const saveEditedModification = async () => {
      if (
        !editModificationData.value.name ||
        !editModificationData.value.description ||
        !editModificationData.value.estimatedPrice
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all the fields!",
        });
        return;
      }

      const formData = new FormData();
      formData.append("modificationName", editModificationData.value.name);
      formData.append(
        "modificationDescription",
        editModificationData.value.description
      );
      formData.append(
        "estimatedPrice",
        editModificationData.value.estimatedPrice
      );

      if (editModificationData.value.image) {
        formData.append("modificationImage", editModificationData.value.image);
      }

      try {
        await modificationStore.updateModification(
          editModificationData.value.id,
          formData
        );
        await modificationStore.fetchModifications(1, 100);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Modification updated successfully!",
        });
        isEditing.value = false;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editModificationData.value = {
        id: null,
        name: "",
        description: "",
        estimatedPrice: "",
        image: null,
        imagePath: "",
      };
    };

    const deleteModification = async (modificationId) => {
      try {
        await modificationStore.deleteModification(modificationId);
        await modificationStore.fetchModifications(1, 100);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Modification deleted successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    };

    const { users } = toRefs(userStore);
    const { questionAndAnswers } = toRefs(QaAStore);
    const { modifications } = toRefs(modificationStore);

    return {
      isLoggedIn,
      userRole,
      users,
      questionAndAnswers,
      modifications,
      deleteUser,
      deleteQandA,
      createQuestionAndAnswer,
      newModification,
      handleImageUpload,
      saveNewModification,
      editModification,
      editModificationData,
      isEditing,
      handleEditImageUpload,
      saveEditedModification,
      cancelEdit,
      deleteModification,
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
