import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    distance: 0,
  },
  mutations: {
    updateDistance(state, newDistance) {
      state.distance = newDistance;
    },
  },
  actions: {

  },
});
