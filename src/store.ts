import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as env from '../env';
import { Journey } from './models/journey';
import { DetailedJourney } from './models/detailedJourney';
import { JourneySummary } from './models/journeySummary';
declare const google: any;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    // To be removed
    steps: [],
    clickedPath: [],
    completedPath: [],
    distance: 0,
    elevation: [],
    // To be kept
    isSnapped: true,
    date: Date.now(),
    duration: 0,
    journey: new Journey([]),
    detailedJourney: new DetailedJourney([]),
    journeySummary: new JourneySummary([], 0, []),

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

    updateElevation(state, newElevation) {
      state.elevation = newElevation;
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

    updateDate(state, newDate) {
      state.date = newDate;
    },

    updateDuration(state, newDuration) {
      state.duration = newDuration;
    },
  },
  actions: {
    addSection({ commit, state }, section) {
      if (section.isSnapped) {
        const pathString = preparePathString([section.start, section.end]);
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
            calculateElevation(state)
              .then((results) => commit('updateElevation', results));
          });
      } else {
        commit('addNewStep', [section.start, section.end]);
        commit('getCompletedPathFromSteps');
        commit('updateDistance', calculateDistance(state.completedPath));
        calculateElevation(state)
          .then((results) => commit('updateElevation', results));
      }
    },

    removeLastStep({ commit, state }) {
      commit('removeLastStepMutation');
      commit('getCompletedPathFromSteps');
      commit('updateDistance', calculateDistance(state.completedPath));
      calculateElevation(state)
        .then((results) => commit('updateElevation', results));
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

function calculateElevation(state) {
  // change this to read in distance and change sample number
    // const numberOfSamples = state.distance / 50; // every 50m
    const elevator = new google.maps.ElevationService();
    const elevatorParams = {
      path: state.completedPath.map((p) => convertPointToLatLng(p)),
      samples: 10, // always 10 elevation points between Positions
    };

    return new Promise((resolve, reject) => {
      elevator.getElevationAlongPath(elevatorParams, (elevations, status) => {
        if (status !== 'OK') {
          reject('Could not get elevation data');
        } else {
          resolve(elevations.map((e) => e.elevation));
        }
      });
    });
}

function convertPointToLatLng(point) {
  const latLngObj = JSON.parse(JSON.stringify(point));
  return new google.maps.LatLng(latLngObj.lat, latLngObj.lng);
}
