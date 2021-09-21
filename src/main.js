import Vue from 'vue'
import App from '@/App.vue'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import { ValidationObserver } from 'vee-validate'
import store from './store'
import Vuex from 'vuex'
import BrokerConnector from "@/services/brokerConnector";

Vue.use(BootstrapVue)
Vue.use(Vuex)

const brokerConnector = new BrokerConnector();
brokerConnector.establishConnection();

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
