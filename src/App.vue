<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./global.scss";

#nav {
  margin: -10px -10px 0 -10px;
  padding: 50px;
  background-color: $yellow;
  a {
    font-weight: bold;
    color: darken($blue, 20%);
    &.router-link-exact-active {
      color: $blue;
    }
  }
}
</style>
