import { defineStore } from "pinia";
import axios from "../axios_auth";

export const gunsStore = defineStore({
    id: "gunsStore",
    state: () => ({
        guns: [],
        favouriteGuns: [],
        favouriteGunsIds: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
    }),
    actions: {
        async fetchGunsToDisplayInMainPage(page = 1, limit = 8) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/get-all-guns?page=${page}&limit=${limit}`);
                console.log('API response:', response.data);
                this.guns = response.data.guns;
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
        async fetchGunsToDisplayInFavouritesPage(userID) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/guns/favourite-guns/${userID}`);
                console.log('API response:', response.data);
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
                console.log('API response:', response.data);
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
                console.log('API response:', response.data);
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
                console.log('API response:', response.data);
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
                console.log('API response:', response.data);
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
        }
    },

});