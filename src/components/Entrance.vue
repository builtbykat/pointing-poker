<template>
  <div class="home content">
    <h1>Pointing Poker</h1>
    <div>
      <a :href="this.randomRoom" class="btn btn-primary">Create a room</a>
      <div class="input-group">
        <input type="text" id="room" class="form-control" name="room" placeholder="Join a room">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="joinRoom">Go</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      randomRoom: '/' + (Math.floor(Math.random() * 90000) + 100000)
    }
  },
  mounted () {
    if (localStorage.session) {
      localStorage.removeItem('session')
    }
  },
  methods: {
    joinRoom: function () {
      let room = Number(document.getElementById('room').value)
      if (Number.isInteger(room)) {
        window.location.href = '/' + room
      }
    }
  }
}
</script>

<style scoped>
  .btn-primary {
    margin-bottom: 20px;
  }
  .content {
    padding: 20px;
    max-width: 320px;
  }
  input[type=text] {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  h1 {
    margin-bottom: 20px;
  }
</style>
