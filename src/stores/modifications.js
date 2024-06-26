import { defineStore } from "pinia";
import axios from "../axios_auth";


export const modificationsStore = defineStore({
    id: "modificationsStore",
    state: () => ({
        modifications: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchModifications() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get("/modifications");
                this.modifications = response.data;
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch modifications');
            } finally {
                this.loading = false;
            }
        },
    },
});