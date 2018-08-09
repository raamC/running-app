<template>
  <div>
    <div id="nav">
      <router-link to="/">Run tracker</router-link>
      <a @click='logOut'>Log Out</a>
      </div>
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
import firebase from 'firebase';

@Component({
  components: {
    GoogleMap,
    Controller,
  },
})
export default class Home extends Vue {
  // Data properties
  // Lifecycle hooks
  // Computed value
  // Component methods

    private logOut() {
    firebase.auth().signOut().then(() => {
      this.$router.replace('login');
    });
  }
}

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

#nav {
  margin: -8px;
  padding: 2vh;
  background-color: $grey;
  display: flex;
  justify-content: space-between;

  h2 {
    text-decoration: none;
    font-weight: bold;
    font-size: 4em;
    padding: 0 20px;
    color: $dark-orange;
    &.router-link-exact-active {
      color: $yellow;
    }
  }

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 4em;
    padding: 0 20px;
    color: $dark-orange;
    &.router-link-exact-active {
      color: $yellow;
    }
  }
}
</style>
