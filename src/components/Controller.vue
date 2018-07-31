<template>
  <div class="controller">
    <div class="distance">
      {{ distanceString }}
    </div>
    <div class="buttonPanel">
      <b-button @click="changeUnits">Change units</b-button>
      <b-button @click="removeLastMarker">Remove point</b-button>
      <b-button @click="resetPath">Clear</b-button>
      <b-button @click="testApiCall">Test API call</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { gmapApi } from "vue2-google-maps";
import axios from "axios";
declare const google: any;
import * as env from "../../env";

@Component
export default class Controller extends Vue {
  // Data properties
  private isInKilometers: boolean = true;

  // Lifecycle hooks

  // Computed value
  get path() {
    return this.$store.state.path;
  }

  get distanceString() {
    if (this.isInKilometers) {
      return `${this.distance} km`;
    }
    return `${(0.621371 * parseFloat(this.distance)).toFixed(2)} m`;
  }

  get distance() {
    const distance = this.calculateDistance();
    console.log(this.$store.state.path[0]);
    return (distance / 1000).toFixed(2);
  }

  // Component methods
  private calculateDistance() {
    let total = 0;
    if (this.path.length > 1) {
      for (let i = 0; i < this.path.length - 1; i++) {
        total += google.maps.geometry.spherical.computeDistanceBetween(
          this.path[i],
          this.path[i + 1]
        );
      }
    }
    return total;
  }

  private changeUnits() {
    this.isInKilometers = !this.isInKilometers;
  }

  private removeLastMarker() {
    this.path.pop();
    this.$store.commit("updatePath", this.path);
  }

  private resetPath() {
    this.$store.commit("updatePath", []);
  }

  private testApiCall() {
    axios
      .get("https://roads.googleapis.com/v1/snapToRoads", {
        params: {
          path:
            "-35.27801,149.12958|-35.28032,149.12907|-35.28099,149.12929|-35.28144,149.12984|-35.28194,149.13003|-35.28282,149.12956|-35.28302,149.12881|-35.28473,149.12836",
          interpolate: true,
          key: env.API_KEY
        }
      })
      .then(function(response) {
        console.log(response.data);
      });
  }
}
</script>

<style scoped lang="scss">
.controller {
  background-color: white;
  height: 400px;
  width: 20vw;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.distance {
  margin: 30px 0 50px;
  font-size: 35px;
}

.buttonPanel {
  display: flex;
  flex-direction: column;
  width: 250px;
}

.buttonPanel > * {
  margin: 10px;
}
</style>
