import { defineStore } from "pinia";
import axios from "../axios_auth";

export const gunsStore = defineStore({
    id: "gunsStore",
    state: () => ({
        guns: [],
        favouriteGuns: [],
        favouriteGunsIds: [],
        gunTypes: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
    }),
    actions: {
        async fetchGunsToDisplayInMainPage(page = 1, limit = 8, searchTerm = '', type = '') {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/get-all-guns?page=${page}&limit=${limit}&search=${searchTerm}&type=${type}`);
                this.guns = response.data.guns;
                this.totalPages = Math.ceil(response.data.totalItems / limit);
                this.currentPage = page;
            } catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            } finally {
                this.loading = false;
            }
        },
        async fetchTypesOfGuns() {
            try {
                const response = await axios.get(`/guns/gun-types`);
                //console.log('API response:', response.data);
                this.gunTypes = response.data;
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }
        },
        async fetchGunsToDisplayInFavouritesPage(userID) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/guns/favourite-guns/${userID}`);
                this.favouriteGuns = response.data;
                return this.favouriteGuns;
            } catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }

        },
        async removeFromFavourites(gunID, userID) {
            try {
                const response = await axios.delete(`/guns/favourite-guns/${userID}/${gunID}`);
                this.favouriteGunsIds = this.favouriteGunsIds.filter(id => id !== gunID);
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }

        },
        async addGunToFavourites(gunID, userID) {
            try {
                const response = await axios.post(`/guns/favourite-guns/${userID}/${gunID}`);
                this.favouriteGunsIds.push(gunID);
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }
        },
        async getIdsOfFavouriteGuns(userID) {
            try {
                const response = await axios.get(`/guns/favourite-guns/ids/${userID}`);
                this.favouriteGunsIds = response.data;
                return response.data;
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }
        },
        async fetchGunsMadeByUser(userID) {
            try {
                const response = await axios.get(`/guns/owned-guns/${userID}`);
                this.guns = response.data;
                return response.data;
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
                this.error = "Failed to fetch data";
            }
            finally {
                this.loading = false;
            }
        },
        async createGun(formData) {
            try {
                const response = await axios.post(`/guns/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Failed to create gun:', error);
                throw error;
            }
        },
        async getGunDetails(gunId) {
            try {
                const response = await axios.get(`/guns/${gunId}`);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch gun details:', error);
                throw error;
            }
        },
        async updateGun(gunId, formData) {
            try {
                const response = await axios.post(`/guns/update/${gunId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Failed to update gun:', error);
                throw error;
            }
        },
        async deleteGun(gunId) {
            try {
                const response = await axios.delete(`/guns/${gunId}`);
                return response.data;
            } catch (error) {
                console.error('Failed to delete gun:', error);
                throw error;
            }
        }
    },

});