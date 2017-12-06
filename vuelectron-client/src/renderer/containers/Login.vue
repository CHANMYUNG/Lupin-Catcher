<template>
  <div id='app'>
    <h1>WELCOME!</h1>
    <div id='form'>
        <div id='inputPart'>
            <label for='email'>이메일 입력</label>
            <input type='email' id='email' placeholder='이메일을 입력해주세요'>
            <label for='password'>비밀번호 입력</label>
            <input type='password' id='password' placeholder='비밀번호를 입력해주세요'>
        </div>
        <div id='buttonPart'>
            <div id='button' v-on:click='login()'>
                <div id='buttonText'>
                    Login
                </div>
            </div>
        </div>
    </div>
    <div id='registerPart'>
        <div id='register' v-on:click='openRegister()'>회원가입</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login: function () {
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const dialog = this.$electron.remote.dialog
      this.$http({
        method: 'POST',
        url: this.API_BASE_URL + '/api/auth/local',
        data: {
          email,
          password
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': ['POST']
        }
      })
        .then(response => {
          console.log(response)
          const refreshToken = response.data.refreshToken
          const token = response.data.token
          console.log(refreshToken)
          console.log(token)
          console.log(new Date(Date.now + 10 * 60 * 1000))
          this.$electron.remote.session.defaultSession.cookies.set({
            url: this.API_BASE_URL,
            path: '/',
            name: 'lupin-catcher-session-id',
            value: token,
            httpOnly: true,
            expirationDate: new Date(new Date().getTime() + 10 * 60 * 1000).getTime()
          }, (err) => {
            if (err) console.log(err)
            else {
              location.href = '/#/main'
            }
          })
        })
        .catch(err => {
          if (!err.response) {
            dialog.showErrorBox('네트워크 오류!', '뭔가 문제가 발생헀어요!')
          } else if (err.response.status === 401) {
            dialog.showMessageBox({
              type: 'error',
              title: '로그인 실패',
              message: '아이디 혹은 비밀번호를 틀렸습니다.'
            })
          } else {
            console.log(err.response)
          }
        })
    },
    openRegister: function () {
      let remote = this.$electron.remote
      const top = remote.getCurrentWindow()

      let child = new remote.BrowserWindow({
        parent: top,
        show: false,
        modal: true,
        backgroundColor: '#ffffff'
      })
      const registerURL = process.env.NODE_ENV === 'development'
        ? `http://localhost:9080/#/register`
        : `file://${__dirname}/../main/index.html#register`

      const mainURL = process.env.NODE_ENV === 'development'
        ? `http://localhost:9080/`
        : `file://${__dirname}/../main/index.html`
      child.loadURL(registerURL)
      child.once('ready-to-show', () => {
        child.show()
      })
      child.on('registered', () => {
        top.loadURL(mainURL)
      })
    }
  }
}
</script>

<style scoped>
#app {
    font-size: 100%;
    width: 40%;
    height: 100%;
    margin: 0 auto;
}

#app h1 {
    font-size: 4rem;
    margin-top: 35%;
    font-family: Helvetica, sans-serif;
    font-weight: normal;
    color: darkgray;
    cursor: default;
}

#app>#form {
    width: 100%;
    height: 30%;
}

#app>#form>#inputPart {
    display: inline-block;
    width: 70%;
    height: 100%;
    /* border-right: 1px solid darkgray; */
    vertical-align: top;
}

#app>#form>#inputPart>label {
    font-size: 1rem;
    font-family: Helvetica, sans-serif;
    font-weight: lighter;
    color: darkgray;
    display: block;
}

#app>#form>#inputPart>input {
    border: 0.8px solid darkgray;
    padding-left: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    height: 13%;
}

#app>#form>#inputPart>label:nth-of-type(2) {
    margin-top: 0.5rem;
}

#app>#form>#buttonPart {
    width: 30%;
    height: 100%;
    vertical-align: top;
    display: inline-block;
}

#app>#form>#buttonPart>#button {
    width: 60%;
    height: 38%;
    border: 1px solid darkgray;
    margin-top: 1.2rem;
    margin-left: 1.1rem;
    display: table;
    cursor: pointer;
}

#app>#form>#buttonPart>#button>#buttonText {
    font-size: 1.5rem;
    font-family: Helvetica, sans-serif;
    font-weight: lighter;
    color: darkgray;
    text-align-last: center;
    vertical-align: middle;
    display: table-cell;
}

#app>#registerPart {
    position: relative;
    top: -15%;
}

#app>#registerPart>#register {
    width: 20%;
    text-align: left;
    vertical-align: middle;
    font-family: Helvetica, sans-serif;
    font-weight: normal;
    color: darkgray;
    font-size: 1rem;
    cursor: pointer;
}
</style>

