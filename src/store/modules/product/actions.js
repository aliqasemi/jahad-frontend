import ProductRepository from "../../../abstraction/repository/ProductRepository";
import {store} from "../../index";

let repository = new ProductRepository();

export default {
    async loadProductList({state, commit}) {
        try {
            commit("SET_LOADING", true);
            const product = await repository.index(
                {
                    pagination: state.pagination,
                    filter: state.filter
                }
            );
            commit("SET_PRODUCT", product.data);
            commit("SET_PRODUCT_PAGINATION", product.pagination);
            return product;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showProduct({commit}, id) {
        try {
            commit("SET_LOADING", false);
            const product = await repository.show(id);
            commit("SET_LOADING", true);
            return product;
        } catch (e) {
            return e;
        }
    },
    async storeProduct({commit}, {data}) {
        try {
            const product = await repository.store(data);
            commit("ADD_PRODUCT", product);
            return product;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async updateProduct({commit}, {data}) {
        try {
            const product = await repository.update(data);
            commit("UPDATE_PRODUCT", product);
            return product;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async removeProduct({commit}, productId) {
        try {
            const response = await repository.destroy(productId);
            commit("REMOVE_PRODUCT", productId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data})
            return response;
        } catch (e) {
            return e;
        }
    },
};
