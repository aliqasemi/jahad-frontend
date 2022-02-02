import StepRepository from "../../../abstraction/repository/StepRepository";
import {store} from "../../index";

let repository = new StepRepository();

export default {
    async loadStepList({commit}, project_id) {
        try {
            commit("SET_LOADING", true);
            const step = await repository.index(project_id);
            commit("SET_STEP", step);
            return step;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showStep({commit}, id) {
        try {
            commit("SET_LOADING", false);
            const step = await repository.show(id);
            commit("SET_LOADING", true);
            return step;
        } catch (e) {
            return e;
        }
    },
    async storeStep({commit}, {data}) {
        try {
            const step = await repository.store(data);
            commit("ADD_STEP", step);
            return step;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async updateStep({commit}, {data}) {
        try {
            const step = await repository.update(data);
            commit("UPDATE_STEP", step);
            return step;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async removeStep({commit}, stepId) {
        try {
            const response = await repository.destroy(stepId);
            commit("REMOVE_STEP", stepId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data})
            return response;
        } catch (e) {
            return e;
        }
    },
    async moveUp({commit}, stepId) {
        try {
            await repository.moveUp(stepId);
            commit("MOVE_UP", stepId);
        } catch (e) {
            return e;
        }
    },
    async moveDown({commit}, stepId) {
        try {
            await repository.moveDown(stepId);
            commit("MOVE_DOWN", stepId);
        } catch (e) {
            return e;
        }
    },
};
