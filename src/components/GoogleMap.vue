<template>
  <div class='map-container'>
    <gmap-map
      :center='center'
      :zoom='zoom'
      style='width:60vw;  height: 60vh;'
      @click='addMarker'
    >
    <gmap-polyline 
      v-bind:path.sync="completedPath" 
      v-bind:options="{ strokeColor:'#424242'}">
    </gmap-polyline>
      <gmap-marker
        :key='index'
        v-for='(m, index) in clickedPath'
        :position='m'
        >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Position } from '../models/position';
import { gmapApi } from 'vue2-google-maps';
import { constants } from 'http2';
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

  get clickedPath() {
    return this.$store.state.clickedPath;
  }

  get completedPath() {
    return this.$store.state.completedPath;
  }

  get isSnapped() {
    return this.$store.state.isSnapped;
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
    this.$store.commit('updateClickedPath', event.latLng);
    if (this.clickedPath.length > 1) {
      const stepObject = {
        start: this.clickedPath[this.clickedPath.length - 2],
        end: this.clickedPath[this.clickedPath.length - 1],
        isSnapped: this.isSnapped,
      };
      this.$store.dispatch('updateSteps', stepObject);
    }
  }
}
</script>

<style scoped lang='scss'>
.map-container {
  display: flex;
  justify-content: center;
}
</style>
