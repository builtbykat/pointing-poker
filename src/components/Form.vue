<template>
  <div class="poker content" v-if="canUserJoinRoom">
    <h1>Pointing Poker</h1>
    <h2>Room: {{ $route.params.session }}</h2>
    <form>
      <input type="hidden" name="session" v-model="selected.session">
      <input type="hidden" name="name" v-model="selected.name">
      <ul>
        <li v-for="pt in pointsAllowed" :key="pt.id">
          <input :id="pt" type="radio" name="point" v-model="selected.points" :value="pt">
          <label :for="pt" class="btn btn-secondary" @click="updatePoints(pt)">{{ pt }}</label>
        </li>
      </ul>
    </form>
    <p class="userPts">Selected Points: {{ selected.points }}</p>
    <div class="actions">
      <hr>
      <button @click="clearPoints">Clear Points</button>
    </div>
    <div class="results">
      <h3>Players:</h3>
      <table>
        <tr v-for="player in uniqPlayers" :key="player['.key']">
          <td>
            {{ player.name }}
          </td>
          <td class="selected-point" :class="[allPointsIn ? showClass : hideClass]">
            {{ player.points }}
          </td>
        </tr>
      </table>
      <div class="stats">
        <h4>Stats</h4>
        <p>
          Max:
          <span id="winner" v-if="allPointsIn">{{ winningPoint }}</span>
        </p>
      </div>
      <div class="observers" v-if="observers.length > 0">
        <hr>
        <h5>Observers:</h5>
        <ul>
          <li v-for="observer in observers" :key="observer.name">{{ observer.name }}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="name content" v-else>
    <div class="input-group">
      <input type="text" id="name" class="form-control" name="room" v-model="selected.name" placeholder="Enter name">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" @click="insertPlayer(false)">Play</button>
        <button class="btn btn-outline-secondary" @click="insertPlayer(true)">Observe</button>
      </div>
    </div>
  </div>
</template>

<script>
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
let observers = []
let players = []
export default {
  name: 'app',
  firebase: {
    poker: selectedPoints
  },
  data () {
    return {
      index: this.$route.params.session + '_' + localStorage.name,
      hideClass: 'hide-points',
      showClass: 'show-points',
      session: localStorage.session,
      submit: false,
      pointsAllowed: [
        1,
        2,
        4,
        8,
        16,
        '?'
      ],
      selected: {
        session: this.$route.params.session,
        name: localStorage.name,
        points: '',
        observer: false
      }
    }
  },
  mounted () {
    if (localStorage.name) {
      this.selected.name = localStorage.name
      this.submit = true
    }
  },
  methods: {
    clearPoints: function () {
      players.forEach(function (player) {
        selectedPoints.child(player.key).update({
          points: ''
        })
      })
    },
    computePoints: function () {
      let points = []
      this.uniqPlayers.forEach(function (player) {
        points.push(player.points)
      })
      let filtered = points.filter(function (point) {
        return point !== ''
      })
      return filtered
    },
    insertPlayer: function (observer) {
      selectedPoints.child(this.index).set({
        session: this.selected.session,
        name: this.selected.name,
        points: this.selected.points,
        observer: observer
      })
      this.submit = true
      this.setLocalStorage()
    },
    setLocalStorage: function () {
      localStorage.setItem('session', String(this.$route.params.session))
      localStorage.setItem('name', String(document.getElementById('name').value))
      location.reload()
    },
    updatePoints: function (pt) {
      selectedPoints.child(this.index).update({
        session: this.selected.session,
        name: this.selected.name,
        points: pt
      })
    }
  },
  computed: {
    allPointsIn () {
      let points = this.computePoints()
      if (points.length === this.uniqPlayers.length) {
        return true
      } else {
      }
    },
    canUserJoinRoom () {
      if (localStorage.session) {
        return this.$route.params.session === localStorage.session && localStorage.name && this.submit
      }
    },
    observers () {
      observers = []
      for (let item of this.poker) {
        if (item.session === this.selected.session &&
            item.observer) {
          observers.push({
            name: item.name
          })
        }
      }
      return observers
    },
    uniqPlayers () {
      players = []
      for (let item of this.poker) {
        if (item.session === this.selected.session &&
            !item['.key'].includes('undefined') &&
            !item.observer) {
          players.push({
            key: item['.key'],
            name: item.name,
            points: item.points
          })
        }
      }
      return players
    },
    winningPoint () {
      let points = this.computePoints()
      let filtered = points.filter(el => el !== '?')
      if (filtered.length > 0) {
        return Math.max.apply(null, filtered)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .actions {
    margin-bottom: 20px;
  }
  .content {
    padding: 20px;
    max-width: 320px;
  }
  h1, h2, h3, hr, .userPts {
    margin-bottom: 20px;
  }
  li {
    display: inline-block;
    list-style: none;
    margin-right: 10px;
  }
  input[type=radio] {
    display: none;
  }
  .selected-point {
    background-color: #000;
    color: #000;
    width: 20%;
  }
  .selected-point.show-points {
    background-color: #FFF;
  }
  .selected-point.hide-points {
    background-color: #000;
  }
  .stats {
    border: 1px solid #000;
    margin: 20px 0 30px;
    padding: 10px 10px 0;
  }
  table {
    width: 100%;
  }
  ul {
    padding-left: 0;
  }
</style>
