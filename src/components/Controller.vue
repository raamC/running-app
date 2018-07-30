<template>
  <div class="controller">
    <div class="distance">
      {{ distanceString }}
    </div>
    <div class="buttonPanel">
      <b-button @click="changeUnits">Change units</b-button>
      <b-button @click="removeLastMarker">Remove point</b-button>
      <b-button @click="resetPath">Clear</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { gmapApi } from 'vue2-google-maps'
declare const google: any

@Component
export default class Controller extends Vue {
  // Data properties
  private isInKilometers: boolean = true

  // Lifecycle hooks

  // Computed value
  get path() {
    return this.$store.state.path
  }

  get distanceString() {
      if (this.isInKilometers) {
        return `${this.distance} km`
      }
      return `${(0.621371 * parseFloat(this.distance)).toFixed(2)} m`
  }

  get distance() {
    const distance = this.calculateDistance()
    return (distance / 1000).toFixed(2)
  }

  // Component methods
  private calculateDistance() {
    let total = 0
    if (this.path.length > 1) {
      for (let i = 0; i < this.path.length - 1; i++) {
        total += google.maps.geometry.spherical.computeDistanceBetween(this.path[i], this.path[i + 1])
      }
    }
    return total
  }

  private changeUnits() {
    this.isInKilometers = !this.isInKilometers
  }

  private removeLastMarker() {
    this.path.pop()
    this.$store.commit('updatePath', this.path)
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
  flex-direction: column;
  align-items:center;
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
