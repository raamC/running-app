<template>
  <div>
    <navBar />
    <div class='savedRuns'>
        <h1>Saved Runs go here</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import firebase from 'firebase';

@Component({
  components: {
    NavBar,
  },
})
export default class SavedRuns extends Vue {
  // Data properties
  // Lifecycle hooks
  // Computed value
  // Component methods
}

</script>

<style lang='scss' scoped >
.savedRuns {
  display: flex;
  margin: 60px;
  background: white;
}
</style>
