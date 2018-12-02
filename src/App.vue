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
  a, a:hover {
    color: #000;
    text-decoration: none;
  }
  #app {
    background-color: #f5f5f5;
    /*background-image: linear-gradient(#B0DAB9, #DAD299);*/
  }
  .btn {
    color: #f5f5f5;
  }
  .btn-primary, .btn-primary:hover {
    background-color: #1d5171;
    border-color: #1d5171;
  }
  .btn-secondary, .btn-secondary:hover {
    background-color: #236e95;
    border-color: #236e95;
  }
  .form-control {
    background-color: #f5f5f5;
  }
  html {
    background-color: #f5f5f5;
  }
  .logo {
    padding: 15px 20px 10px;
  }
</style>
