<template>
  <div id="app">
    <ChannelNav :name="name"/>
    <MenuNav />
    <div id="contentSpace">1231231
      <button v-on:click="showCookie()">dadsad</button><br>
      <button v-on:click="addCookie()">addCookie</button>
    </div>
  </div>
</template>

<script>
import ChannelNav from '../components/ChannelNav'
import MenuNav from '../components/MenuNav'

export default {
  name: 'Main',
  components: {
    ChannelNav,
    MenuNav
  },
  data: function () {
    return {
      name: 'Terry Yun'
    }
  },
  methods: {
    showCookie: function () {
      const session = this.$electron.remote.session
      const webContents = this.$electron.remote.webContents
      console.log(webContents)
      session.defaultSession.cookies.flushStore(() => console.log('dasdas'))
      session.defaultSession.cookies.get({
        domain: 'localhost',
        name: 'lupin-catcher-session-id'
      }, (error, cookies) => {
        if (cookies.length === 0) location.href = '/login'
        console.log(error, cookies)
      })
    },
    addCookie: function () {
      this.$electron.remote.session.defaultSession.cookies.set({
        url: 'http://localhost:5000',
        path: '/',
        name: 'lupin-catcher-session-id',
        value: 'adasdasdasdasdasd',
        httpOnly: true,
        expirationDate: '2017-11-30 23:23:23'
      }, function (err) {
        console.log(err)
      })
      this.$http({
        url: 'http://localhost:5000/api/sss',
        method: 'GET',
        withCredentials: true
      }).then(response => {
        console.log(response)
      }).catch(response => {
        console.log(response)
      })
    }
  }
}
</script>
<style scoped>
#app {
    width: 100%;
    height: 100%;
    vertical-align: top
}

#contentSpace {
    width: 69.8%;
    height: 100%;
    display: inline-block;
    float: right;
}
</style>
