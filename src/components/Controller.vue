<template>
  <div class='controller'>
    <div class='distance'>
      {{ distanceString }}
    </div>
    <div class='toggle'>
      {{ toggleString }}
    </div>
    <div class='buttonPanel'>
      <b-button @click='changeUnits'>Change units</b-button>
      <b-button @click='toggleIsSnapped'>Toggle lines</b-button>
      <b-button @click='removeLastMarker'>Remove point</b-button>
      <b-button @click='resetPath'>Clear</b-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
declare const google: any;

@Component
export default class Controller extends Vue {
  // Data properties
  private isInKilometers: boolean = true;

  // Lifecycle hooks

  // Computed value
  get completedPath() {
    return this.$store.state.completedPath;
  }

  get isSnapped() {
    return this.$store.state.isSnapped;
  }

  get distance() {
    const distance = this.$store.state.distance;
    return (distance / 1000).toFixed(2);
  }

  get distanceString() {
    if (this.isInKilometers) {
      return `${this.distance} km`;
    }
    return `${(0.621371 * parseFloat(this.distance)).toFixed(2)} m`;
  }

  get toggleString() {
    if(this.isSnapped) {
      return `Autosnap`;
    } else {
      return 'Manual';
    }
  }

  private toggleIsSnapped() {
    this.$store.commit('toggleIsSnapped')
  }

  private changeUnits() {
    this.isInKilometers = !this.isInKilometers;
  }

  private removeLastMarker() {
    this.completedPath.pop();
    this.$store.dispatch('updatePaths', this.completedPath);
  }

  private resetPath() {
    this.$store.commit('clearSteps');
  }
}
</script>

<style scoped lang='scss'>
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
