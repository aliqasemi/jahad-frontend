import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {router} from './router/paths'
import {store} from './store'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

Vue.config.productionTip = false

Vue.component('date-picker', VuePersianDatetimePicker);

Vue.mixin({});

new Vue({
    router: router,
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app')
