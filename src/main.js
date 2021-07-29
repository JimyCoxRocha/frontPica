import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
 

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

var token = localStorage.getItem('token');
if(token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
