import { defineStore } from "pinia";
import axios from "../axios_auth";

export const useLoggedInStore = defineStore("logged_in", {
    state: () => ({
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
        email: localStorage.getItem('email') || '',
        admin: localStorage.getItem('admin') === 'true', // Convert to boolean
        avatarId: localStorage.getItem('avatarId') || '',
    }),
    getters: {
        isLoggedIn: (state) => !!state.token && !!state.username,
        getToken: (state) => state.token,
        getEmail: (state) => state.email,
        getUsername: (state) => state.username,
        isAdmin: (state) => state.admin,
        getAvatarId: (state) => state.avatarId,
    },
    actions: {
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios.post('/users/login', {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        console.log(response.data);
                        this.username = response.data.username;
                        this.token = response.data.token;
                        this.email = response.data.email;
                        this.admin = response.data.admin;
                        this.avatarId = response.data.avatarId;

                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('username', response.data.username);
                        localStorage.setItem('email', response.data.email);
                        localStorage.setItem('admin', response.data.admin);
                        localStorage.setItem('avatarId', response.data.avatarId);

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                    });
            });
        },
        autoLogin() {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const email = localStorage.getItem('email');
            const admin = localStorage.getItem('admin') === 'true';
            const avatarId = localStorage.getItem('avatarId');

            if (token && username && email && avatarId) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.token = token;
                this.username = username;
                this.email = email;
                this.admin = admin;
                this.avatarId = avatarId;
            } else {
                console.log('Missing token, username, email, or avatarId');
            }
        },
        logout() {
            this.token = '';
            this.username = '';
            this.email = '';
            this.admin = false;
            this.avatarId = '';

            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('admin');
            localStorage.removeItem('avatarId');

            axios.defaults.headers.common['Authorization'] = '';
        },
        updateProfile(updatedData) {
            this.username = updatedData.username;
            this.email = updatedData.email;
            this.avatarId = updatedData.avatarId;

            localStorage.setItem('username', updatedData.username);
            localStorage.setItem('email', updatedData.email);
            localStorage.setItem('avatarId', updatedData.avatarId);
        }

    },
});

