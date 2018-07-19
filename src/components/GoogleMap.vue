<template>
  <div>
      <div class="map-container">
      <gmap-map
        :center="center"
        :zoom="zoom"
        style="width:60vw;  height: 60vh;"
        @click="addMarker"
      >
      <gmap-polyline v-bind:path.sync="markers" v-bind:options="{ strokeColor:'#424242'}">
         </gmap-polyline>
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m"
          >
        </gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Position } from '../models/position';

@Component
export default class GoogleMap extends Vue {
  // Data properties
  private center: Position = { lat: 51.555, lng: -0.155 };
  private zoom: number = 12;
  private markers: Position[] = [{ lat: 51.555, lng: -0.155 }];

  // Lifecycle hooks
  private mounted() {
    this.geolocate();
  }

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
    this.markers.push(event.latLng);
  }
}
</script>

<style scoped lang="scss">
.map-container {
  display: flex;
  justify-content: center;
}
</style>
