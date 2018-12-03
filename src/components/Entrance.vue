<template>
  <div class="home content">
    <div class="actions">
      <a :href="this.randomRoom" class="create btn btn-primary">Create a room</a>
      <div class="input-group">
        <input type="text" id="room" class="form-control" name="room" placeholder="Join a room">
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="joinRoom">Go</button>
        </div>
      </div>
    </div>
    <div class="about">
      <p>Simply create a room or join an existing one.</p>
      <p>Designed on Vue.js + Firebase database.</p>
      <p>Features:</p>
      <ul>
        <li>Supports multiple sessions</li>
        <li>Supports players and observers</li>
        <!--
        click to copy session link
        -->
      </ul>
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
  .create {
    width: 100%;
  }
  input[type=text] {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  h1 {
    margin-bottom: 20px;
  }
</style>
