import Vue from "vue";

export default {
    SET_LOADING(state, value) {
        state.loading = value;
    },
    SET_LOGIN_STATUS(state, value) {
        state.isLogin = value;
    },
    SET_AUTHORIZE_USER(state, value) {
        state.authorize = value;
    },
    SET_USER(state, value) {
        Vue.set(state, "users", value);
    },
    SET_USER_PAGINATION(state, value) {
        state.pagination = value;
    },
    SET_USER_FILTER(state, value) {
        state.filter = value;
    },
    SET_PAGE_NUMBER(state, value) {
        Vue.set(state, "pageNumber", value);
    },
    UPDATE_USER(state, updatedUser) {
        let userIndex = state.users.findIndex((user) => user.id === updatedUser.id);
        Vue.set(state.users, userIndex, updatedUser);
    },
}
