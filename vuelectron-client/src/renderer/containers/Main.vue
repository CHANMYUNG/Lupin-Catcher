<template>
  <div id="app">
    <ChannelNav :data="a"/>
    <MenuNav />
    <div id="contentSpace">1231231
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
  mounted: async function () {
    try {
      const response = await this.$http({
        url: this.$API_BASE_URL + '/api/user/info',
        method: 'GET',
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': this.$API_BASE_URL,
          'Access-Control-Allow-Credentials': true
        }
      })
      console.log(response)
      this.a.name = response.data.nickname
    } catch (e) {
      console.log(e)
    }
  },
  data: function () {
    console.log('call data')
    console.log(this.$API_BASE_URL)
    return {
      a: {
        name: ''
      }
    }
  },
  methods: {
  },
  beforeCreate () {
    console.log('[beforeCreate] main')
    const dialog = this.$electron.remote.dialog
    this.$electron.remote.session.defaultSession.cookies.get({
      domain: this.$COOKIE_DOMAIN,
      name: 'lupin-catcher-session-id'
    }, (error, cookies) => {
      console.log(cookies.length)
      if (error) console.log(error)
      else if (cookies.length === 0) {
        this.$storage.get('refreshToken', (error, refToken) => {
          console.log(refToken)
          if (error) {
            console.log(error)
            dialog.showMessageBox({
              'type': 'info',
              'title': '띠용?',
              'message': '예기치 못한 오류입니다. 다시 한 번 로그인해주세요.'
            })
            location.href = '/#/login'
          } else if (refToken.value) {
            this.$http({
              url: this.$API_BASE_URL + `/api/token?refreshToken=${refToken.value}`,
              method: 'GET'
            }).then(response => {
              this.$electron.remote.session.defaultSession.cookies.set({
                url: this.$API_BASE_URL,
                path: '/',
                name: 'lupin-catcher-session-id',
                value: response.data.token,
                httpOnly: true,
                expirationDate: Math.floor(new Date(new Date().getTime() + (10 * 60 * 1000)).getTime() / 1000)
              }, (err) => {
                if (err) console.log(err)
              })
              console.log('세팅완료')
            }).catch(err => {
              if (!err.response) {
                console.log(err)
                dialog.showErrorBox('네트워크 오류!', '뭔가 문제가 발생헀어요!')
              } else if (err.response.status === 204) {
                dialog.showMessageBox({
                  type: 'error',
                  title: '로그인 실패',
                  message: '로그인이 만료되었습니다. 다시 로그인해주세요.'
                })
                location.href = '/#/login'
              }
            })
          } else {
            location.href = '/#/login'
          }
        })
      }
    })
    console.log('[beforeCreate END] Main')
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
