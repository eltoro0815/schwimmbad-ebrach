import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import axios from 'axios'
import VueAxios from 'vue-axios'

import BootstrapVue from 'bootstrap-vue'


Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)


Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');