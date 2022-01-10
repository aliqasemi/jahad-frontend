import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {router} from './router/paths'
import {store} from './store'

Vue.config.productionTip = false

Vue.mixin({});

new Vue({
    vuetify,
    store,
    router: router,
    render: h => h(App),
}).$mount('#app')
