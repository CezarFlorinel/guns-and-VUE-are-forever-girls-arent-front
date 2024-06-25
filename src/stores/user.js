import { defineStore } from "pinia";
import axios from "../axios_auth";



export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,  // This will store user data after creation.
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
        }
    }
});