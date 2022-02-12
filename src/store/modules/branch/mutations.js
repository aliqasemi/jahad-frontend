import Vue from "vue";

export default {
    SET_BRANCH(state, branch) {
        Vue.set(state, "branches", branch);
    },

    UPDATE_BRANCH(state, branch) {
        const index = state.branches.findIndex(
            (x) => x.id === branch.id
        );
        Vue.set(state.branches, index, branch);
    },

    REMOVE_BRANCH(state, id) {
        const Index = state.branches.findIndex((x) => x.id === id);
        Vue.delete(state.branches, Index);
    },

    ADD_BRANCH(state, product) {
        Vue.set(
            state.branches,
            state.branches.length,
            product
        );
    },

    SET_LOADING(state, value) {
        state.loading = value;
    },

    SET_BRANCH_PAGINATION(state, value) {
        state.pagination = value;
    }
}


