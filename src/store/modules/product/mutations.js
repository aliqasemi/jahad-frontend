import Vue from "vue";

export default {
    SET_PRODUCT(state, product) {
        Vue.set(state, "products", product);
    },

    UPDATE_PRODUCT(state, product) {
        const index = state.products.findIndex(
            (x) => x.id === product.id
        );
        Vue.set(state.templates, index, product);
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
}

