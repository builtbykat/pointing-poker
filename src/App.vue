<template>
  <div id="app">
    <div class="logo">
      <h1><a href="/">Pointing Poker</a></h1>
    </div>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'app'
}
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Montserrat);
  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
  a, a:hover {
    color: #000;
    text-decoration: none;
  }
  #app {
    background-color: #f5f5f5;
    /*background-image: linear-gradient(#B0DAB9, #DAD299);*/
    font-family: 'Open Sans', sans-serif;
  }
  .btn {
    color: #f5f5f5;
    font-family: 'Montserrat', sans-serif;
  }
  .btns .btn-half:first-of-type {
    margin-right: 5px;
  }
  .btns .btn-half:last-of-type {
    margin-left: 5px;
  }
  .btn-half {
    margin-top: 5px;
    width: 47%;
  }
  .btn-primary,
  .btn-primary:not(:disabled):not(.disabled):active,
  .btn-primary:hover {
    background-color: #1d5171;
    border-color: #1d5171;
  }
  .btn-secondary,
  .btn-secondary:not(:disabled):not(.disabled):active,
  .btn-secondary:hover {
    background-color: #236e95;
    border-color: #236e95;
  }
  .form-control {
    background-color: #f5f5f5;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }
  html {
    background-color: #f5f5f5;
  }
  .logo {
    padding: 15px 20px 10px;
  }
</style>
