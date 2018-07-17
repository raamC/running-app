<template>
  <div class="home">
    <googleMap class="map"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import GoogleMap from '@/components/GoogleMap.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    GoogleMap,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped >
@import "../global.scss";

.home {
margin: 0 -10px;
background-color: $red;
height: 90vh;
}

.map {
  padding: 100px;
}

</style>
