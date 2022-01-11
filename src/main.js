import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {router} from './router/paths'
import {store} from './store'

Vue.config.productionTip = false

Vue.mixin({});

new Vue({
    router: router,
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app')
