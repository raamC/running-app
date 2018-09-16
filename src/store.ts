import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as env from '../env';
declare const google: any;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    // A 2D array of paths
    steps: [],
    isSnapped: true,
    clickedPath: [],
    completedPath: [],
    distance: 0,
  },
  mutations: {
    // Mutations take the state as the first argument
    // so you don't need to specify it in the arguments in the actions

    updateClickedPath(state, marker) {
      state.clickedPath.push(marker);
    },

    addNewStep(state, pathArray) {
      state.steps.push(pathArray);
    },

    removeLastStepMutation(state) {
      state.steps.pop();
    },

    removeLastClickedMarker(state) {
      state.clickedPath.pop();
    },

    // Flattens steps and removes duplicates
    getCompletedPathFromSteps(state) {
      state.completedPath = [].concat.apply([], state.steps).filter(unique);
    },

    updateDistance(state, newDistance) {
      state.distance = newDistance;
    },

    clearSteps(state) {
      state.steps = [];
      state.completedPath = [];
      state.distance = 0;
      state.clickedPath = [];
    },

    toggleIsSnapped(state) {
      state.isSnapped = !state.isSnapped;
    },
  },
  actions: {
    updateSteps({ commit, state }, stepObject) {
      if (stepObject.isSnapped) {
        const pathString = preparePathString([stepObject.start, stepObject.end]);
        axios
          .get('https://roads.googleapis.com/v1/snapToRoads', {
            params: {
              path: pathString,
              interpolate: true,
              key: env.MAPS_API_KEY,
            },
          })
          .then((response) => response.data.snappedPoints)
          .then((snappedPoints) => snappedPoints.map((p: any) => {
            return { lat: p.location.latitude, lng: p.location.longitude };
          }))
          .then((snappedPath) => commit('addNewStep', snappedPath))
          .then(() => commit('getCompletedPathFromSteps'))
          .then(() => {
            commit('updateDistance', calculateDistance(state.completedPath));
          });
      } else {
        commit('addNewStep', [stepObject.start, stepObject.end]);
        commit('getCompletedPathFromSteps');
        commit('updateDistance', calculateDistance(state.completedPath));
      }
    },

    removeLastStep({ commit, state }) {
      commit('removeLastStepMutation');
      commit('getCompletedPathFromSteps');
      commit('updateDistance', calculateDistance(state.completedPath));
      commit('removeLastClickedMarker');
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

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

function calculateDistance(path) {
  let total = 0;
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      total += google.maps.geometry.spherical.computeDistanceBetween(
        convertPointToLatLng(path[i]),
        convertPointToLatLng(path[i + 1]));
    }
  }
  return total;
}

function convertPointToLatLng(point) {
  const latLngObj = JSON.parse(JSON.stringify(point));
  return new google.maps.LatLng(latLngObj.lat, latLngObj.lng);
}
