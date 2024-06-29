import { defineStore } from "pinia";
import axios from "../axios_auth";



export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,  // This will store user data after creation.
        users: [],
    }),
    actions: {
        async createUser(data) {
            try {
                const response = await axios.post('/user', data);
                this.userData = response.data;  // Assuming the API returns the newly created user data.
                console.log('User created:', this.userData);
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || 'Failed to create user');
            }
        },
        returnUserProfilePicture(id) {
            let pathToPicture = "../../src/assets/images/account avatars/1.webp";
            let idParsed = parseInt(id);

            if (idParsed) {
                switch (idParsed) {
                    case 1:
                        pathToPicture = "../../src/assets/images/account avatars/1.webp";
                        break;
                    case 2:
                        pathToPicture = "../../src/assets/images/account avatars/2.webp";
                        break;
                    case 3:
                        pathToPicture = "../../src/assets/images/account avatars/3.jpg";
                        break;
                    case 4:
                        pathToPicture = "../../src/assets/images/account avatars/4.webp";
                        break;
                    case 5:
                        pathToPicture = "../../src/assets/images/account avatars/5.jpg";
                        break;
                    default:
                        break;
                }
            }
            return pathToPicture;
        },
        async updateUser(username, data) {
            try {
                const response = await axios.put(`/user/username/${username}`, data);
                this.userData = response.data;
                return response.data;

            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || 'Failed to update user');
            }
        },
        async updatePassword(data) {
            try {
                const response = await axios.put(`/user/update-password`, data);
                return response.data;

            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || 'Failed to update user password');
            }
        },
        async deleteUser(userID) {
            try {
                const response = await axios.delete(`/user/${userID}`);
                return response.data;

            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || 'Failed to delete user');
            }

        },
        async fetchAllUsers() {
            try {
                const response = await axios.get('/user/get-all-users');
                this.users = response.data;
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || 'Failed to get all users');
            }
        }


    },

});