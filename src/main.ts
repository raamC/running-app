import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import * as env from '../env';
import * as VueGoogleMaps from 'vue2-google-maps';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import firebase from 'firebase';

const config = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
};

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueGoogleMaps, {
  load: {
    key: env.MAPS_API_KEY,
    libraries: 'geometry',
  },
});

new Vue({
  router,
  store,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/');
      } else {
        this.$router.push('/login');
      }
     });
  },
  render: (h) => h(App),
}).$mount('#app');
