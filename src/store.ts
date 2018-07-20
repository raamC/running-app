import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    path: [],
  },
  mutations: {
    updatePath(state, newPath) {
      state.path = newPath;
    },
  },
  actions: {

  },
});
