<template>
  <div class="controller">
    <div class="distance">
      {{ distance }}km

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Controller extends Vue {
  // Data properties


  // Lifecycle hooks
  

  // Computed value
  get distance() {
    const distance = this.$store.state.distance;
    return (distance / 1000).toFixed(2);
  }

  // Component methods


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
