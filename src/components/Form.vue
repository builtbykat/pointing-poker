<template>
  <div class="poker" v-if="this.submit && this.name">
    <h1>Pointing Poker</h1>
    <h2>Room: {{ $route.params.session }}</h2>
    <form>
      <input type="text" name="session" v-model="selected.session">
      <input type="text" name="name" v-model="selected.name">
      <ul>
        <li v-for="pt in pointsAllowed" :key="pt.id">
          <input type="radio" name="point" v-model="selected.point" :value="pt" @change="addPoints">{{ pt }}
        </li>
      </ul>
    </form>
    <p>Selected Points: {{ selected.point }}</p>
    <div>
      <h2>Players:</h2>
      <ul>
        <li v-for="name in uniqPlayers" :key="name.id">{{ name }}</li>
      </ul>
    </div>
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
import uniq from 'lodash/uniq'
import Firebase from 'firebase'
let config = {
  apiKey: process.env.VUE_APP_DB_API_KEY,
  authDomain: process.env.VUE_APP_DB_AUTH_DOMAIN,
  databaseURL: 'https://vuejs-28038.firebaseio.com',
  storageBucket: process.env.VUE_APP_DB_BUCKET,
  messagingSenderId: process.env.VUE_APP_DB_SENDER_ID
}
let app = Firebase.initializeApp(config)
let db = app.database()
let selectedPoints = db.ref('poker')
export default {
  name: 'app',
  firebase: {
    poker: selectedPoints
  },
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
      submit: false,
      selected: {
        session: this.$route.params.session,
        name: localStorage.name,
        point: ''
      }
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
  },
  methods: {
    addPoints: function () {
      selectedPoints.push(this.selected)
    }
  },
  computed: {
    uniqPlayers () {
      return uniq(this.poker.map(p => p.name))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style: none;
  }
</style>
