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
        async createModification(data) {
            this.loading = true;
            this.error = null;
            try {
                await axios.post("/modifications", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                this.error = "Failed to create modification";
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async updateModification(id, data) {
            this.loading = true;
            this.error = null;
            try {
                await axios.post(`/modifications/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                this.error = "Failed to update modification";
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async deleteModification(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`/modifications/${id}`);
            } catch (error) {
                this.error = "Failed to delete modification";
                throw error;
            } finally {
                this.loading = false;
            }
        },
        getModificationById(id) {
            let modification = this.modifications.find((modification) => modification.modificationId === id);
            return modification;
        }
    },


});