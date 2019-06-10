import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');


// PUSHER


const Pusher = require('pusher-js');

//Pusher.logToConsole = true;

var my_pusher = new Pusher('a756753461ffa40e21fa', {
    cluster: 'eu',
    forceTLS: true
});

var channel = my_pusher.subscribe('geoffnet-changed');
channel.bind('geoffnet-event', function(message: any) {

    location.reload();
    
});