import { defineStore } from "pinia";
import axios from "../axios_auth";

export const gunsStore = defineStore({
    id: "gunsStore",
    state: () => ({
        guns: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchGunsToDisplayInMainPage() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/guns`);
                console.log('API response:', response.data);
                this.guns = response.data;

            } catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }
        },
    },

});