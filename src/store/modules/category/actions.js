import CategoryRepository from "../../../abstraction/repository/CategoryRepository";

let repository = new CategoryRepository();

export default {
    async loadCategoryList({commit}) {
        try {
            commit("SET_LOADING", true);
            const category = await repository.index();
            commit("SET_CATEGORY", category);
            return category;
        } catch (e) {
            return e;
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async showCategory({commit}, id) {
        try {
            commit();
            return await repository.show(id);
        } catch (e) {
            return e;
        }
    },
    async storeCategory({commit}, {data}) {
        try {
            const category = await repository.store(data);
            commit("ADD_CATEGORY", category);
            return category;
        } catch (e) {
            return e;
        }
    },
    async updateCategory({commit}, {data}) {
        try {
            const category = await repository.update(data);
            commit("UPDATE_CATEGORY", category);
            return category;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async removeCategory({commit}, categoryId) {
        try {
            const response = await repository.destroy(categoryId);
            commit("REMOVE_CATEGORY", categoryId);
            return response;
        } catch (e) {
            return e;
        }
    },
};
