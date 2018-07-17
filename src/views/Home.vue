<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <googleMap/>
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
