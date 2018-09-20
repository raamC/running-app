<template>
  <div>
    <div id="nav">
      <router-link to="/">Run tracker</router-link>
      <router-link to="/savedRuns">Saved Runs</router-link>
      <a @click='logOut'>Log Out</a>
      </div>
    <div class='savedRuns'>
        <h1>Saved Runs go here</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component({
  components: {
    // GoogleMap,
  },
})
export default class SavedRuns extends Vue {
  // Data properties
  // Lifecycle hooks
  // Computed value
  // Component methods

    private logOut() {
        firebase.auth().signOut().then(() => {
            this.$router.replace('login');
        });
    }
//     get runs() {
//         console.log(runsCollection)
//     return runsCollection;
//   }
}

</script>

<style lang='scss' scoped >
@import '../global.scss';

.savedRuns {
  display: flex;
  margin: 60px;
  background: white;
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
    font-size: 2em;
    padding: 0 20px;
    color: $dark-orange;
    &.router-link-exact-active {
      color: $yellow;
    }
  }

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 2em;
    padding: 0 20px;
    color: $dark-orange;
    cursor: pointer;
    &.router-link-exact-active {
      color: $yellow;
    }
  }
}
</style>
