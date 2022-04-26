import AuthenticationRepository from "../../../abstraction/repository/AuthenticationRepository";
import {store} from "@/store";

let repository = new AuthenticationRepository();

export default {
    async login({commit}, body) {
        try {
            commit("SET_LOADING", true);
            const response = await repository.logIn(body);
            if (!(response instanceof Error)) {
                commit("SET_LOGIN_STATUS", true);
            }
            if (response.verify === false){
                commit("SET_LOGIN_STATUS", false);
            }
            return response;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async logout({commit}) {
        try {
            commit("SET_LOADING", true);
            const response = await repository.logOut();
            if (!(response instanceof Error)) {
                commit("SET_LOGIN_STATUS", false);
            }
            return response;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async register({commit}, {formData}) {
        try {
            commit("SET_LOADING", true);
            const register = await repository.register(formData);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'ثبت نام شما تکمیل شد. جهت تکمیل آن احراز هویت خود را انجام دهید'})
            return register;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async confirmRegister({commit}, {userId}) {
        try {
            commit("SET_LOADING", true);
            const register = await repository.confirmRegister(userId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'پیامک با موفقیت ارسال شد.'})
            return register;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async verifyRegister({commit}, {formData, userId}) {
        try {
            commit("SET_LOADING", true);
            const register = await repository.verifyRegister(formData, userId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'احراز هویت با موفقیت انجام شد'})
            return register;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'کد ارسالی صحیح نیست'})
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async confirmForgotPassword({commit}, {formData}) {
        try {
            commit("SET_LOADING", true);
            const register = await repository.confirmForgotPassword(formData);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'پیامک با موفقیت ارسال شد.'})
            return register;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async verifyForgotPassword({commit}, {formData}) {
        try {
            commit("SET_LOADING", true);
            const register = await repository.verifyForgotPassword(formData);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'عملیات با موفقیت انجام شد'})
            return register;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'کد ارسالی صحیح نیست'})
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async resetPassword({commit}, {formData}) {
        try {
            commit("SET_LOADING", true);
            const register = await repository.resetPassword(formData);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'رمز شما با موفقیت تغییر کرد'})
            return register;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async loadUsersList({commit, state}) {
        try {
            commit("SET_LOADING", true);
            const users = await repository.index({
                pagination: state.pagination,
                filter: state.filter
            });
            commit("SET_USER", users.data);
            commit("SET_USER_PAGINATION", users.pagination);
            return users;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },

    async active({commit}, {data, userId}) {
        try {
            let user = await repository.active(data, userId);
            commit('UPDATE_USER', user);
            if (!(user instanceof Error)) {
                store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
                store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'عملیات با موفقیت انجام شد'})
            }
        } catch (e) {
            return e;
        }
    },

    async assignRole({commit}, {role, userId}) {
        try {
            let user = await repository.assignRole(role, userId);
            commit('UPDATE_USER', user);
            if (!(user instanceof Error)) {
                store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
                store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'عملیات با موفقیت انجام شد'})
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    async update({commit}, {data, userId}) {
        try {
            let user = await repository.update(data, userId);
            if (!(user instanceof Error)) {
                store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
                store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'عملیات با موفقیت انجام شد'})
            }
            return user;
        } catch (e) {
            return e;
        }finally {
            commit("SET_LOADING", false);
        }
    },
    async show({commit}, userId) {
        try {
            commit("SET_LOADING", true);
            return await repository.show(userId);
        } catch (e) {
            return e;
        }finally {
            commit("SET_LOADING", false);
        }
    },
};
