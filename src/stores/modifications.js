import { defineStore } from "pinia";
import axios from "../axios_auth";

export const modificationsStore = defineStore({
    id: "modificationsStore",
    state: () => ({
        modifications: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
    }),
    actions: {
        async fetchModifications(page = 1, limit = 8) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/modifications?page=${page}&limit=${limit}`);
                console.log('API response:', response.data);
                this.modifications = response.data.modifications;
                // Assuming the API returns total pages or total items to calculate pages
                this.totalPages = Math.ceil(response.data.totalItems / limit);
                this.currentPage = page;

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