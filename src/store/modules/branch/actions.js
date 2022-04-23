import BranchRepository from "../../../abstraction/repository/BranchRepository";
import {store} from "../../index";

let repository = new BranchRepository();

export default {
    async loadBranchList({state, commit}) {
        try {
            commit("SET_LOADING", true);
            const branches = await repository.index(
                {
                    pagination: state.pagination,
                    filter: state.filter
                }
            );
            commit("SET_BRANCH", branches.data);
            commit("SET_BRANCH_PAGINATION", branches.pagination);
            return branches;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showBranch({commit}, id) {
        try {
            commit("SET_LOADING", false);
            const branch = await repository.show(id);
            commit("SET_LOADING", true);
            return branch;
        } catch (e) {
            return e;
        }
    },
    async storeBranch({commit}, {data}) {
        try {
            const branch = await repository.store(data);
            commit("ADD_BRANCH", branch);
            return branch;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async updateBranch({commit}, {data}) {
        try {
            const branch = await repository.update(data);
            commit("UPDATE_BRANCH", branch);
            return branch;
        } catch (e) {
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: e})
            return e;
        }
    },
    async removeBranch({commit}, branchId) {
        try {
            const response = await repository.destroy(branchId);
            commit("REMOVE_BRANCH", branchId);
            store.commit('snackbar/SET_SNACKBAR_STATUS', {value: true})
            store.commit('snackbar/SET_SNACKBAR_MESSAGE', {value: response.data})
            return response;
        } catch (e) {
            return e;
        }
    },
};
