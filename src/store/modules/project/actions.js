import ProjectRepository from "../../../abstraction/repository/ProjectRepository";
import {store} from "../../index";

let repository = new ProjectRepository();

export default {
    async loadProjectList({commit, state}) {
        try {
            commit("SET_LOADING", true);
            const project = await repository.index(
                {
                    pagination: state.pagination,
                }
            );
            commit("SET_PROJECT", project.data);
            commit("SET_PROJECT_PAGINATION", project.pagination);
            return project;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showProject({commit}, id) {
        try {
            commit("SET_LOADING", false);
            const project = await repository.show(id);
            commit("SET_LOADING", true);
            return project;
        } catch (e) {
            return e;
        }
    },
    async storeProject({commit}, {data}) {
        try {
            const project = await repository.store(data);
            commit("ADD_PROJECT", project);
            return project;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async updateProject({commit}, {data}) {
        try {
            const project = await repository.update(data);
            commit("UPDATE_PROJECT", project);
            return project;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },

    async changeStep({commit}, {data}) {
        try {
            const project = await repository.update(data);
            commit("UPDATE_PROJECT", project);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true});
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: 'مرحله با موفقیت تغییر کرد'});
            return project;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },

    async removeProject({commit}, projectId) {
        try {
            const response = await repository.destroy(projectId);
            commit("REMOVE_PROJECT", projectId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data})
            return response;
        } catch (e) {
            return e;
        }
    },
};
