<template>
  <div class="map-container">
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:60vw;  height: 60vh;"
      @click="addMarker"
    >
    <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#424242'}">
        </gmap-polyline>
      <gmap-marker
        :key="index"
        v-for="(m, index) in path"
        :position="m"
        >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Position } from '../models/position';
import { gmapApi } from 'vue2-google-maps';
declare const google: any;

@Component
export default class GoogleMap extends Vue {
  // Data properties
  private center: Position = { lat: 51.555, lng: -0.155 };
  private zoom: number = 12;
  private path: Position[] = [];

  // Lifecycle hooks
  private mounted() {
    this.geolocate();
  }

  // Computed value

  // Component methods
  private geolocate() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  private addMarker(event: any) {
    this.path.push(event.latLng);
    this.$store.commit('updateDistance', this.calculateDistance())
  }

  private calculateDistance() {
    let total = 0;
    if (this.path.length > 1) {
      for (let i = 0; i < this.path.length - 1; i++) {
        total += google.maps.geometry.spherical.computeDistanceBetween(this.path[i], this.path[i + 1]);
      }
    }
    return total;
  }
}
</script>

<style scoped lang="scss">
.map-container {
  display: flex;
  justify-content: center;
}
</style>
