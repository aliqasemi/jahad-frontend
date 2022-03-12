import AttachProductRepository from "../../../abstraction/repository/AttachProductRepository";
import {store} from "../../index";

let repository = new AttachProductRepository();

export default {
    async loadRequireProduct({commit}, project_id) {
        try {
            commit("SET_LOADING", true);
            return await repository.indexRequireProduct(project_id);
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async attachProduct({commit}, {data, requireProductId}) {
        try {
            commit('SET_LOADING', false);
            let response = await repository.attachProduct(data.productRequireProduct, requireProductId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true});
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'عملیات با موفقیت انجام شد'});
            return response;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async deleteRequireProductProduct({commit}, id) {
        try {
            commit('SET_LOADING', false);
            const response = await repository.deleteRequireProductProduct(id);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true});
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data});
            return response;
        } catch (e) {
            return e;
        }
    }
};
