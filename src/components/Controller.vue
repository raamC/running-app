<template>
  <div class='controller'>
    <div class='distance'>
      {{ distanceString }}
    </div>
    <div class='toggle'>
      {{ toggleString }}
    </div>
    <div class='buttonPanel'>
      <b-button @click='changeUnits'>Change units</b-button>
      <b-button @click='toggleIsSnapped'>Toggle lines</b-button>
      <b-button @click='removeLastMarker'>Remove point</b-button>
      <b-button @click='resetPath'>Clear</b-button>
    </div>
    <form
      @submit="checkForm"
    >
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li :key='i' v-for='(error, i) in errors'>{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Date</label>
        <b-form-input
          id="date"
          v-model="date"
          type="text"
          name="date"
          placeholder="DD/MM/YY"
        ></b-form-input>
      </p>
      <p>
        <label for="age">Time</label>
        <b-form-input
          id="time"
          v-model="time"
          type="text"
          name="time"
          placeholder="00:00:00"
          ></b-form-input>
      </p>
      <p>
        <b-button
          type="submit"
        >Submit</b-button>
      </p>
    </form>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import 'firebase/firestore';
declare const google: any;

@Component
export default class Controller extends Vue {
  // Data properties
  private db: any = firebase.firestore();
  private isInKilometers: boolean = true;
  private date: string = '';
  private time: string = '';
  private errors: any[] = [];

  // Lifecycle hooks

  // Computed value
  get completedPath() {
    return this.$store.state.completedPath;
  }

  get isSnapped() {
    return this.$store.state.isSnapped;
  }

  get distance() {
    const distance = this.$store.state.distance;
    return (distance / 1000).toFixed(2);
  }

  get elevation() {
    return this.$store.state.elevation;
  }

  get distanceString() {
    if (this.isInKilometers) {
      return `${this.distance} km`;
    }
    return `${(0.621371 * parseFloat(this.distance)).toFixed(2)} m`;
  }

  get toggleString() {
    if (this.isSnapped) {
      return `Autosnap`;
    } else {
      return 'Manual';
    }
  }

  // Component Methods

  private checkForm(e) {
      if (this.date) {
        this.submitDataToFirebase();
        return true;
      }

      this.errors = [];

      if (!this.date) {
        this.errors.push('Date required.');
      }

      e.preventDefault();
    }

  private submitDataToFirebase() {
  this.db.collection('runs').add({
      date: this.formatDate(this.date),
      distance: this.distance,
      elevation: this.elevation,
      path: this.completedPath,
      time: this.time,
    });
  }

  // This will need changing to use timestamps instead

  private formatDate(dateString) {
    // DD/MM/YY
    const values = dateString.split('/');
    const year = parseInt(values[2], 10);
    const month = parseInt(values[1], 10) - 1;
    const day = parseInt(values[0], 10);
    return new Date(year, month, day);
  }

  private toggleIsSnapped() {
    this.$store.commit('toggleIsSnapped');
  }

  private changeUnits() {
    this.isInKilometers = !this.isInKilometers;
  }

  private removeLastMarker() {
    this.$store.dispatch('removeLastStep');
  }

  private resetPath() {
    this.$store.commit('clearSteps');
  }
}
</script>

<style scoped lang='scss'>
.controller {
  background-color: white;
  height: 550px;
  width: 20vw;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.distance {
  margin: 30px 0;
  font-size: 35px;
}

.buttonPanel {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 20px;
}

.buttonPanel > * {
  margin: 5px;
}
</style>
