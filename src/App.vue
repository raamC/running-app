<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Run tracker</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./global.scss";

#nav {
  margin: -8px;
  padding: 2vh;
  background-color: $grey;
  display: flex;
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
