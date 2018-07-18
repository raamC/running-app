<template>
  <div>
      <div class="map-container">
      <gmap-map
        :center="center"
        :zoom="zoom"
        style="width:60vw;  height: 60vh;"
      >
      </gmap-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Position } from '../models/position'

@Component
    export default class GoogleMap extends Vue {
    center: Position = { lat: 51.555, lng: -0.155 };
    zoom: number = 15;
  }



// export default {
//   name: 'GoogleMap',
//   data() {
//     return {
//       center: { lat: 51.555, lng: -0.155 },
//       zoom: 15,
//     };
//   },
// }
</script>

<style scoped lang="scss">
.map-container {
  display: flex;
  justify-content: center;
}
</style>
