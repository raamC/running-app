<template>
  <div class="controller">
    <div class="distance">
      {{ distance }}km
    </div>
    <div id="clearButton">
  <button @click="resetPath">Clear</button>
</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { gmapApi } from 'vue2-google-maps';
declare const google: any;

@Component
export default class Controller extends Vue {
  // Data properties


  // Lifecycle hooks
  

  // Computed value
  get path() {
    return this.$store.state.path;
  }

  get distance() {
    const distance = this.calculateDistance();
    return (distance / 1000).toFixed(2);
  }

  // Component methods
  private calculateDistance() {
    let total = 0;
    if (this.path.length > 1) {
      for (let i = 0; i < this.path.length - 1; i++) {
        total += google.maps.geometry.spherical.computeDistanceBetween(this.path[i], this.path[i + 1]);
      }
    }
    return total;
  }

  private resetPath() {
    this.$store.commit('updatePath', [])
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
  justify-content: left;
}

.distance {
  margin: 30px;
  font-size: 35px;
}
</style>
