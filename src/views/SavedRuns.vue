<template>
  <div>
    <navBar />
    <div class='savedRuns'>
        <h1>Saved Runs go here</h1>
    </div>
      <ul >
        <li :key='i' v-for='(run, i) in runData'>
          {{ run }}
        </li>
      </ul>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import firebase from 'firebase';
import 'firebase/firestore';

@Component({
  components: {
    NavBar,
  },
})
export default class SavedRuns extends Vue {
  private db: any = firebase.firestore();
  private runData: any[] = [];
  // Data properties
  // Lifecycle hooks
  private mounted() {
    this.db.collection('runs').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.runData.push(doc.data())
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  };
  
  // Computed value
  // Component methods
}

</script>

<style lang='scss' scoped >
.savedRuns {
  display: flex;
  margin: 60px;
  background: white;
}
</style>
