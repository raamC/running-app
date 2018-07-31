<template>
  <div class='home'>
    <googleMap class='map'/>
    <controller />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import GoogleMap from '@/components/GoogleMap.vue'; // @ is an alias to /src
import Controller from '@/components/Controller.vue';

@Component({
  components: {
    GoogleMap,
    Controller,
  },
})
export default class Home extends Vue {}

</script>

<style lang='scss' scoped >
@import '../global.scss';

.home {
  display: flex;
  margin: 100px;
}

.map {
  margin-right: 100px;
}
</style>
