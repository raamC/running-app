import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as env from '../env';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickedPath: [],
    snappedPath: [],

  },
  mutations: {
    updateClickedPath(state, newPath) {
      state.clickedPath = newPath;
    },
    updateSnappedPath(state, newPath) {
      state.snappedPath = newPath;
    },
  },
  actions: {
    updatePaths({ commit }, newPath) {
      commit('updateClickedPath', newPath);
      if (newPath.length > 1) {
        const pathString = preparePathString(newPath);
        axios
          .get('https://roads.googleapis.com/v1/snapToRoads', {
            params: {
              path: pathString,
              interpolate: true,
              key: env.API_KEY,
            },
          })
          .then((response) =>  response.data.snappedPoints)
          .then((snappedPoints) => snappedPoints.map((p: any) => {
            return {lat: p.location.latitude, lng: p.location.longitude};
          }))
          .then((snappedPath) => commit('updateSnappedPath', snappedPath));
      }
      if (newPath.length === 0) {
        commit('updateSnappedPath', []);
      }
    },
  },
});

function preparePathString(path: any) {
  const rawPathString = (path.toString()).split(',').map((p: any) => p.replace('(', '').replace(')', ''));
  let pathString = '';
  for (let i = 0; i < rawPathString.length; i += 2) {
    pathString = pathString + rawPathString[i] + ',' + rawPathString[i + 1] + '|';
  }
  pathString = pathString.slice(0, pathString.length - 1);
  return pathString;
}
