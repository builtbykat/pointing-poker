<template>
  <div class="poker" v-if="this.submit && this.name">
    <h1>Pointing Poker</h1>
    <h2>Room: {{ $route.params.session }}</h2>
    <form>
      <input type="hidden" name="session" :value="$route.params.session">
      <input type="hidden" name="name" :value="this.name">
      <ul>
        <li v-for="pt in pointsAllowed" :key="pt.id"><input type="radio" name="point">{{ pt }}</li>
      </ul>
    </form>
  </div>
  <div class="name" v-else>
    <form>
      <label>Enter Name:</label>
      <input v-model="name">
      <button v-on:click="this.submit=true">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      pointsAllowed: [
        1,
        2,
        4,
        8,
        16
      ],
      name: '',
      submit: false
    }
  },
  mounted () {
    if (localStorage.name) {
      this.name = localStorage.name
      this.submit = true
    }
  },
  watch: {
    name (newName) {
      localStorage.name = newName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
