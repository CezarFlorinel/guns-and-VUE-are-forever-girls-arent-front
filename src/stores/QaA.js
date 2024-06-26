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
    },
    getters: {
        getQuestionAndAnswerById: (state) => (id) => {
            return state.questionAndAnswers.find(qaa => qaa.questionAndAnswerId === id);
        },
    },
});