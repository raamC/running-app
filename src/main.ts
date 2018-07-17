import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as env from '../env';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: env.API_KEY,
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
