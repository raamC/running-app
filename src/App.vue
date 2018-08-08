<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Run tracker</router-link>
      <a @click='logOut'>Log Out</a>
    </div>
    <router-view/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class App extends Vue {
  // Data properties
  // Lifecycle hooks
  // Computed value
  // Component methods

  private logOut() {
    firebase.auth().signOut().then(() => {
      this.$router.replace('login')
    })
  }
}

</script>

<style lang="scss">
@import "./global.scss";

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
