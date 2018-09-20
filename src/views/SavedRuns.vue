<template>
  <div>
    <div id="nav">
      <router-link to="/">Run tracker</router-link>
      <router-link to="/savedRuns">Saved Runs</router-link>
      <a @click='logOut'>Log Out</a>
      </div>
    <div class='savedRuns'>
        <div>
            <article v-for="(run, i) in runs" :key="i">
                <h1>{{ run.duration }}</h1>
            </article>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import GoogleMap from '@/components/GoogleMap.vue'; // @ is an alias to /src
import firebase from 'firebase';
import { db } from '../main'


@Component({
  components: {
    GoogleMap,
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

    get data() {
        return {
            runs: []
        }
    }

    get firestore() {
    return {
      runs: db.collection('runs')
    }
  }
}

</script>

<style lang='scss' scoped >
@import '../global.scss';

.home {
  display: flex;
  margin: 60px;
}

.map {
  margin-right: 60px;
}

.savedRuns {
    background: white;
    height: 80vh;
    width: 80vw;
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
