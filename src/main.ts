import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as env from '../env';

Vue.config.productionTip = false;

// tslint:disable-next-line:no-console
console.log(env.API_KEY);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
