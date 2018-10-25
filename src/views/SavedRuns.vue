<template>
  <div>
    <navBar />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Distance</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr :key='i' v-for='(run, i) in runData'>
          <th scope="row">{{ i }}</th>
          <td>{{ run["date"].toString() }}</td>
          <td>{{ run["distance"].toString() }}</td>
          <td>{{ run["time"].toString() }}</td>
        </tr>
      </tbody>
    </table>
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

table {
  margin: 100px auto;
  width: 70vw;

  th, td {
    background: white;
  }
}
</style>
