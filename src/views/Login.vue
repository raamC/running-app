<template>
  <div class='auth'>
    <div class="loginBox">
      <h1>Log In</h1>
      <h3>Email</h3>
      <input type="text" v-model="email" placeholder="Email">
      <h3>Password</h3>
      <input type="password" v-model="password" placeholder="Password">
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
        alert('Login successful!');
      },
      function (err) {
        alert ('Oops. ' + err.message)
      }
    )
  }
}
</script>

<style scoped lang='scss'>
.auth {
  display: flex;
  justify-content: center;

  .loginBox {
    display: flex;
    flex-direction: column;
    margin: 100px;
    padding: 40px;
    width: 600px;
    background-color: white;

    h3 {
      margin: 40px 0 20px 0;
    }

    button {
      margin: 30px 0;
    }
  }
}
</style>
