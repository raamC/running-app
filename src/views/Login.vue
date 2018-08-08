<template>
  <div class='background'>
    <div class="loginBox">
      <h1>Log In</h1>
      <h3>Email</h3>
      <b-form-input type="text" v-model="email" placeholder="Email"></b-form-input>
      <h3>Password</h3>
      <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
      <b-button @click="login">Login</b-button>
    </div>
  </div>

</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import * as env from '../../env';
import firebase from 'firebase';

@Component
export default class Login extends Vue {
  // Data properties
  private email = ''
  private password = ''

  // Lifecycle hooks
  // Computed value
  // Component methods

  private login() {
    firebase.auth().signInWithEmailAndPassword(this.email.toString().trim(), this.password.toString().trim()).then(
      function (user) {
        // alert('Login successful!');
      },
      function (err) {
        alert ('Oops. ' + err.message)
      }
    )
  }
}
</script>

<style scoped lang='scss'>
@import "../global.scss";
.background {
  display: flex;
  justify-content: center;
  background-image: url("../assets/running.jpg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .loginBox {
    display: flex;
    flex-direction: column;
    margin: 100px;
    padding: 40px;
    width: 600px;
    height: 600px;
    background-color: white;
    border: 10px solid $grey;

    h3 {
      margin: 40px 0 20px 0;
    }

    h1 {
      color: $dark-orange;
    }

    button {
      margin: 70px 0;
      background-color: $dark-orange;
    }
  }
}
</style>
