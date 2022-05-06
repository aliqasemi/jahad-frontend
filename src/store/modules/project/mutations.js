import Vue from "vue";

export default {
    SET_PROJECT(state, project) {
        Vue.set(state, "project", project);
    },

    UPDATE_PROJECT(state, project) {
        const index = state.project.findIndex(
            (x) => x.id === project.id
        );
        Vue.set(state.project, index, project);
    },

    REMOVE_PROJECT(state, id) {
        const Index = state.project.findIndex((x) => x.id === id);
        Vue.delete(state.project, Index);
    },

    ADD_PROJECT(state, project) {
        Vue.set(
            state.project,
            state.project.length,
            project
        );
    },

    SET_LOADING(state, value) {
        state.loading = value;
    },

    SET_PROJECT_PAGINATION(state, value) {
        state.pagination = value;
    },

    SET_PROJECT_FILTER(state, value) {
        state.filter = value;
    },

    SET_PAGE_NUMBER(state, value) {
        Vue.set(state, "pageNumber", value);
    },
}

