import { defineStore } from "pinia";
import axios from "../axios_auth";


export const useQaAStore = defineStore({
    id: "QaAStore",
    state: () => ({
        questionAndAnswers: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchQuestionAndAnswers() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get("/questionAndAnswers");
                this.questionAndAnswers = response.data;
            } catch (error) {
                this.error = error.response ? error.response.data : error.message;
            } finally {
                this.loading = false;
            }
        },
        async createQuestionAndAnswer(data) {
            try {
                const response = await axios.post("/questionAndAnswers", data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || "Failed to create question and answer");
            }
        },
        async deleteQuestionAndAnswer(id) {
            try {
                await axios.delete(`/questionAndAnswers/${id}`);
                this.questionAndAnswers = this.questionAndAnswers.filter(qaa => qaa.questionAndAnswerId !== id);
            } catch (error) {
                throw new Error(error.response?.data?.errorMessage || "Failed to delete question and answer");
            }
        }
    },
    getters: {
        getQuestionAndAnswerById: (state) => (id) => {
            return state.questionAndAnswers.find(qaa => qaa.questionAndAnswerId === id);
        },
    },
});