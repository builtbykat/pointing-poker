<template>
  <div class="poker" v-if="this.submit && this.name">
    <h1>Pointing Poker</h1>
    <h2>Room: {{ $route.params.session }}</h2>
    <form>
      <input type="text" name="session" v-model="selected.session">
      <input type="text" name="name" v-model="selected.name">
      <ul>
        <li v-for="pt in pointsAllowed" :key="pt.id">
          <input :id="pt" type="radio" name="point" v-model="selected.points" :value="pt" @change="updatePoints">
          <label :for="pt">{{ pt }}</label>
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
      <input v-model="selected.name">
      <button @click="insertPlayer">Save</button>
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
      index: this.$route.params.session + '_' + localStorage.name,
      submit: false,
      selected: {
        session: this.$route.params.session,
        name: localStorage.name,
        points: ''
      }
    }
  },
  mounted () {
    if (localStorage.name) {
      this.selected.name = localStorage.name
      this.submit = true
    }
  },
  watch: {
    name (newName) {
      localStorage.name = newName
    }
  },
  methods: {
    insertPlayer: function () {
      selectedPoints.child(this.$route.params.session + '_' + localStorage.name).set({
        session: this.selected.session,
        name: this.selected.name,
        points: this.selected.points
      })
      this.submit = true
    },
    updatePoints: function () {
      selectedPoints.child(this.index).update({
        session: this.selected.session,
        name: this.selected.name,
        points: this.selected.points
      })
    }
  },
  computed: {
    uniqPlayers () {
      return uniq(this.poker.map(p => [p.name, p.points]))
    },
    name () {
      return this.selected.name
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
