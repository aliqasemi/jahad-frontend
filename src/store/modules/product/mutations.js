import Vue from "vue";

export default {
    SET_PRODUCT(state, product) {
        Vue.set(state, "products", product);
    },

    UPDATE_PRODUCT(state, product) {
        const index = state.products.findIndex(
            (x) => x.id === product.id
        );
        Vue.set(state.products, index, product);
    },

    REMOVE_PRODUCT(state, id) {
        const Index = state.products.findIndex((x) => x.id === id);
        Vue.delete(state.products, Index);
    },

    ADD_PRODUCT(state, product) {
        Vue.set(
            state.products,
            state.products.length,
            product
        );
    },

    SET_LOADING(state, value) {
        state.loading = value;
    },

    SET_PRODUCT_PAGINATION(state, value) {
        state.pagination = value;
    },

    SET_PRODUCT_FILTER(state, value) {
        state.filter = value;
    },

    SET_PAGE_NUMBER(state, value) {
        Vue.set(state, "pageNumber", value);
    },
}