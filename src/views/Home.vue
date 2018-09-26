<template>
  <div>
    <navBar />
    <div class='home'>
      <googleMap class='map'/>
      <controller />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import GoogleMap from '@/components/GoogleMap.vue'; // @ is an alias to /src
import Controller from '@/components/Controller.vue';
import NavBar from '@/components/NavBar.vue';
import firebase from 'firebase';

@Component({
  components: {
    NavBar,
    GoogleMap,
    Controller,
  },
})
export default class Home extends Vue {
  // Data properties
  // Lifecycle hooks
  // Computed value
  // Component methods

}
</script>

<style lang='scss' scoped >
.home {
  display: flex;
  margin: 60px;
}

.map {
  margin-right: 60px;
}
</style>
