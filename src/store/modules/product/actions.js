import ProductRepository from "../../../abstraction/repository/ProductRepository";
import {store} from "../../index";

let repository = new ProductRepository();

export default {
    async loadProductList({commit}) {
        try {
            commit("SET_LOADING", true);
            const template = await repository.index();
            commit("SET_PRODUCT", template);
            return template;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showProduct({commit}, id) {
        try {
            commit("SET_LOADING", false);
            const template = await repository.show(id);
            commit("SET_LOADING", true);
            return template;
        } catch (e) {
            return e;
        }
    },
    async storeProduct({commit}, {data}) {
        try {
            const template = await repository.store(data);
            commit("ADD_PRODUCT", template);
            return template;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async updateProduct({commit}, {data}) {
        try {
            const template = await repository.update(data);
            commit("UPDATE_PRODUCT", template);
            return template;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async removeProduct({commit}, templateId) {
        try {
            const response = await repository.destroy(templateId);
            commit("REMOVE_PRODUCT", templateId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data})
            return response;
        } catch (e) {
            return e;
        }
    },
};
