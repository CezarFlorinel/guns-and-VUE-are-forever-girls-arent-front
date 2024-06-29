import { defineStore } from "pinia";
import axios from "../axios_auth";
import { showLoading, closeLoading } from "../utilities/loadingIndicator";

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
            showLoading('Loading...', 'Please wait while we fetch the guns');
            try {
                const response = await axios.get(`/get-all-guns?page=${page}&limit=${limit}&search=${searchTerm}&type=${type}`);
                this.guns = response.data.guns;
                this.totalPages = Math.ceil(response.data.totalItems / limit);
                this.currentPage = page;
            } catch (error) {
                closeLoading();
                throw new Error('Failed to fetch data from the server: ' + error);
            } finally {
                closeLoading();
            }
        },
        async fetchTypesOfGuns() {
            showLoading('Loading...', 'Please wait while we fetch the gun types');
            try {
                const response = await axios.get(`/guns/gun-types`);
                this.gunTypes = response.data;
            }
            catch (error) {
                closeLoading();
                throw new Error('Failed to fetch data from the server: ' + error);
            }
            finally {
                closeLoading();
            }
        },
        async fetchGunsToDisplayInFavouritesPage(userID) {
            showLoading('Loading...', 'Please wait while we fetch the guns');
            try {
                const response = await axios.get(`/guns/favourite-guns/${userID}`);
                this.favouriteGuns = response.data;
                return this.favouriteGuns;
            } catch (error) {
                closeLoading();
                throw new Error('Failed to fetch data from the server: ' + error);
            }
            finally {
                closeLoading();
            }

        },
        async removeFromFavourites(gunID, userID) {
            try {
                await axios.delete(`/guns/favourite-guns/${userID}/${gunID}`);
                this.favouriteGunsIds = this.favouriteGunsIds.filter(id => id !== gunID);
            }
            catch (error) {

                throw new Error('Failed to remove gun from favourites: ' + error);
            }

        },
        async addGunToFavourites(gunID, userID) {
            try {
                await axios.post(`/guns/favourite-guns/${userID}/${gunID}`);
                this.favouriteGunsIds.push(gunID);
            }
            catch (error) {
                throw new Error('Failed to add gun to favourites: ' + error);
            }
        },
        async getIdsOfFavouriteGuns(userID) {
            try {
                const response = await axios.get(`/guns/favourite-guns/ids/${userID}`);
                this.favouriteGunsIds = response.data;
                return response.data;
            }
            catch (error) {
                throw new Error('Failed to fetch data from the server: ' + error);
            }
        },
        async fetchGunsMadeByUser(userID) {
            showLoading('Loading...', 'Please wait while we fetch your guns');
            try {
                const response = await axios.get(`/guns/owned-guns/${userID}`);
                this.guns = response.data;
                return response.data;
            }
            catch (error) {
                closeLoading();
                throw new Error('Failed to fetch data from the server: ' + error);
            }
            finally {
                closeLoading();
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
                throw new Error('Failed to create gun: ' + error);
            }
        },
        async getGunDetails(gunId) {
            showLoading('Loading...', 'Please wait while we fetch the gun details');
            try {
                const response = await axios.get(`/guns/${gunId}`);
                return response.data;
            } catch (error) {
                closeLoading();
                throw new Error('Failed to fetch gun details: ' + error);
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
                throw new Error('Failed to update gun: ' + error);
            }
        },
        async deleteGun(gunId) {
            try {
                const response = await axios.delete(`/guns/${gunId}`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to delete gun: ' + error);
            }
        }
    },

});