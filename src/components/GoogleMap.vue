<template>
  <div>
      <div class="map-container">
      <gmap-map
        :center="center"
        :zoom="zoom"
        style="width:60vw;  height: 60vh;"
      >
        <gmap-marker
          :position="{ lat: 51.555, lng: -0.155 }"
          @click="center={ lat: 51.555, lng: -0.155 }"
          >
        </gmap-marker>
        <!-- <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
          >
        </gmap-marker> -->
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
}
</script>

<style scoped lang="scss">
.map-container {
  display: flex;
  justify-content: center;
}
</style>
