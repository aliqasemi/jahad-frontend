import TemplateRepository from "../../../abstraction/repository/TemplateRepository";
import {store} from "../../index";

let repository = new TemplateRepository();

export default {
    async loadTemplateList({commit}) {
        try {
            commit("SET_LOADING", true);
            const template = await repository.index();
            commit("SET_TEMPLATE", template);
            return template;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showTemplate({commit}, id) {
        try {
            commit("SET_LOADING", false);
            const template = await repository.show(id);
            commit("SET_LOADING", true);
            return template;
        } catch (e) {
            return e;
        }
    },
    async storeTemplate({commit}, {data}) {
        try {
            const template = await repository.store(data);
            commit("ADD_TEMPLATE", template);
            return template;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async updateTemplate({commit}, {data}) {
        try {
            const template = await repository.update(data);
            commit("UPDATE_TEMPLATE", template);
            return template;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async removeTemplate({commit}, templateId) {
        try {
            const response = await repository.destroy(templateId);
            commit("REMOVE_TEMPLATE", templateId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data})
            return response;
        } catch (e) {
            return e;
        }
    },
};
