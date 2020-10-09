<template>
  <div class="poker content" v-if="canUserJoinRoom">
    <h2>Room: {{ $route.params.session }}</h2>
    <form>
      <input type="hidden" name="session" v-model="selected.session">
      <input type="hidden" name="name" v-model="selected.name">
      <ul>
        <li v-for="pt in pointsAllowed" :key="pt.id">
          <input :id="pt" type="radio" name="point" v-model="selected.points" :value="pt">
          <label :for="pt" class="btn btn-primary" @click="updatePoints(pt)">{{ pt }}</label>
        </li>
      </ul>
    </form>
    <p class="userPts">Selected Points: {{ selected.points }}</p>
    <div class="actions">
      <hr>
      <button class="btn btn-secondary" @click="clearPoints">Clear Points</button>
    </div>
    <div class="results">
      <h3>Players:</h3>
      <table class="table table-striped">
        <tbody>
          <tr v-for="player in uniqPlayers" :key="player.key">
            <td>
              {{ player.name }}
            </td>
            <td class="selected-point" :class="[allPointsIn ? showClass : hideClass]">
              {{ player.points }}
            </td>
          </tr>
        </tbody>
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
      <input type="text" id="name" class="form-control" name="room" v-model="selected.name" placeholder="Enter name">
    <div class="btns">
      <button class="btn btn-primary btn-half" @click="insertPlayer(false)">Play</button>
      <button class="btn btn-secondary btn-half" @click="insertPlayer(true)">Observe</button>
    </div>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
let config = {
  // @TODO .env
}
let app = Firebase.initializeApp(config)
let db = app.database()
let selectedPoints = db.ref('poker')
let pokerObservers = []
let pokerPlayers = []
let points = []
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
      pokerPlayers.forEach((player) => {
        player.ref.update({
          points: '',
        })
      })
    },
    computePoints: function () {
      points = []
      selectedPoints.once('value', (players) => {
        players.forEach((player) => {
          if (player.child('session').val() === this.selected.session &&
                  !player.child('observer').val() &&
                  player.child('points').val() !== '') {
            points.push(player.child('points').val())
          }
        })
      })
      console.log(points);
      return points
    },
    insertPlayer: function (observer) {
      this.setLocalStorage()
      this.index = localStorage.session + '_' + localStorage.name
      selectedPoints.child(this.index).set({
        session: this.selected.session,
        name: this.selected.name,
        points: this.selected.points,
        observer: observer
      })
      this.submit = true
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
      this.computePoints()
    },
  },
  computed: {
    allPointsIn () {
      let points = this.computePoints()
      if (points.length === pokerPlayers.length) {
        return true
      }
      return false
    },
    canUserJoinRoom () {
      if (localStorage.session) {
        return this.$route.params.session === localStorage.session && localStorage.name && this.submit
      }
      return false
    },
    observers () {
      pokerObservers = []
      selectedPoints.once('value', (observers) => {
        observers.forEach((observer) => {
          if (observer.child('session').val() === this.selected.session &&
                  observer.child('observer').val()) {
            pokerObservers.push({
              name: observer.child('name').val()
            })
          }
        })
      })
      return pokerObservers
    },
    uniqPlayers () {
      pokerPlayers = []
      selectedPoints.once('value', (players) => {
        players.forEach((player) => {
          if (player.child('session').val() === this.selected.session &&
                  !player.child('observer').val()) {
            pokerPlayers.push({
              ref: player.ref,
              key: player.key,
              name: player.child('name').val(),
              points: player.child('points').val()
            })
          }
        })
      })
      return pokerPlayers
    },
    winningPoint () {
      let points = this.computePoints()
      let filtered = points.filter(el => el !== '?')
      if (filtered.length > 0) {
        return Math.max.apply(null, filtered)
      }
      return false
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
  input[type=radio] {
    display: none;
  }
  li {
    display: inline-block;
    list-style: none;
    margin-right: 10px;
  }
  .selected-point {
    background-color: #236e95;
    color: #236e95;
    width: 20%;
  }
  .selected-point.show-points {
    background-color: #f5f5f5;
  }
  .selected-point.hide-points {
    background-color: #236e95;
  }
  .stats {
    border: 1px solid #ccc;
    border-radius: 5px;
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
