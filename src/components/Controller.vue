<template>
  <div>
      {{ distance }}
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
    return this.$store.state.distance;
  }

  // Component methods


}
</script>

<style scoped lang="scss">

</style>
