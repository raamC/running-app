<template>
  <div class="map-container">
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:60vw;  height: 60vh;"
      @click="addMarker"
    >
    <gmap-polyline v-bind:path.sync="clickedPath" v-bind:options="{ strokeColor:'#424242'}">
        </gmap-polyline>
      <gmap-marker
        :key="index"
        v-for="(m, index) in clickedPath"
        :position="m"
        >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Position } from "../models/position";
import { gmapApi } from "vue2-google-maps";
import { constants } from "http2";
declare const google: any;

@Component
export default class GoogleMap extends Vue {
  // Data properties
  private center: Position = { lat: 51.555, lng: -0.155 };
  private zoom: number = 14;

  // Lifecycle hooks
  private mounted() {
    this.geolocate();
  }

  // Computed value
  get clickedPath() {
    return this.$store.state.clickedPath;
  }

  // Component methods
  private geolocate() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  }

  private addMarker(event: any) {
    this.clickedPath.push(event.latLng);
    this.$store.dispatch("updatePaths", this.clickedPath);
  }

  private preparePathStringForRoadsApi() {
    const clickedPath = this.$store.state.clickedPath;
  }
}
</script>

<style scoped lang="scss">
.map-container {
  display: flex;
  justify-content: center;
}
</style>
