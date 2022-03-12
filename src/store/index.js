import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import user from './modules/user/index'
import category from './modules/category/index'
import service from './modules/service/index'
import step from './modules/step/index'
import template from './modules/template/index'
import project from './modules/project/index'
import requirement from './modules/requirement/index'
import product from './modules/product/index'
import branch from './modules/branch/index'
import snackbar from './modules/snackBar/index'
import attachProduct from './modules/attachProduct/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    modules: {
        user,
        category,
        service,
        requirement,
        snackbar,
        step,
        project,
        template,
        product,
        branch,
        attachProduct
    }
})
