import Vue from "vue";

export default {
    SET_TEMPLATE(state, template) {
        Vue.set(state, "templates", template);
    },

    UPDATE_TEMPLATE(state, template) {
        const index = state.templates.findIndex(
            (x) => x.id === template.id
        );
        Vue.set(state.templates, index, template);
    },

    REMOVE_TEMPLATE(state, id) {
        const Index = state.templates.findIndex((x) => x.id === id);
        Vue.delete(state.templates, Index);
    },

    ADD_TEMPLATE(state, template) {
        Vue.set(
            state.templates,
            state.templates.length,
            template
        );
    },

    SET_LOADING(state, value) {
        state.loading = value;
    },

    SET_TEMPLATE_FILTER(state, value) {
        state.filter = value;
    },
}

