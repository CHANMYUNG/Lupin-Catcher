<template>
    <div id='register'>
      <div id='exit'>
        <div id='exit-X' v-on:click='exit();'>X</div>
      </div>
      <div id='app'>
        <h1>회원가입</h1>
        <div id='left'>
            <label for='email'>이메일 입력</label>
            <input type='email' id='email' placeholder='이메일을 입력해주세요' v-on:input='emailValidation();'>
            <span v-if="emailValidated == 'available'" class='emailNotice-available'>이메일 형식은 맞네요! 오른쪽 버튼을 눌러 사용 가능한지 알아보세요!</span>
            <span v-else-if="emailValidated == true" class='emailNotice-available'>사용가능한 이메일이에요!</span>
            <span v-else-if="emailValidated == 'out of format'" class='emailNotice-unavailable'>이메일 형식이 아니네요!</span>
            <span v-else-if="emailValidated == false" class='emailNotice-unavailable'>사용 불가능한 이메일이에요!</span>
            <label for='password'>비밀번호 입력</label>
            <input type='password' class='passwordFields' id='password' placeholder='비밀번호를 입력해주세요' v-on:input='passwordValidation();'>
            <span v-if="passwordValidated == false" id='passwordNotice-unavailable'>비밀번호는 영문, 숫자, 특수문자가 모두 쓰인 10~30 글자여야 합니다.</span>
            <span v-if="passwordValidated == true" id='passwordNotice-available'>사용 가능한 비밀번호입니다.</span>
            <label for='re_password'>비밀번호 재입력</label>
            <input type='password' class='passwordFields' id='re_password' placeholder='비밀번호를 재입력해주세요' v-on:input='passwordMatch();'>
            <span v-if="passwordMatches == true" id='rePasswordNotice-available'>비밀번호가 일치하네요!</span>
            <span v-if="passwordMatches == false" id='rePasswordNotice-unavailable'>비밀번호가 일치하지 않아요</span>
            <label for='nickname'>닉네임 입력</label>
            <input type='text' id='nickname' placeholder='닉네임을 입력해주세요' v-on:input='nickname()'>
        </div>
        <div id='right'>
            <div id='emailCheckBtn' v-on:click='emailValidationFromServer();'>
                <div id='btnText'>이메일 검사</div>
            </div>
        </div>
        <div id='buttons'>
            <div id='registerBtn' v-on:click='register();'>
                <div id='registerBtnText'>
                    회원가입
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'Register',
  data: function () {
    return {
      emailValidated: 'none',
      passwordValidated: 'none',
      passwordMatches: 'none',
      nicknameInputed: false
    }
  },
  methods: {
    exit: function () {
      this.$electron.remote.getCurrentWindow().close()
    },
    emailValidation: function () {
      const email = document.getElementById('email').value
      document.getElementById('email').style.border = '0.5px solid darkgray'
      if (email === '') {
        this.emailValidated = 'none'
        return
      }
      if (/^(([^<>()[\]\\.,:\s@']+(\.[^<>()[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        this.emailValidated = 'available'
      } else this.emailValidated = 'out of format'
    },
    emailValidationFromServer: function () {
      const email = document.getElementById('email').value
      const dialog = this.$electron.remote.dialog
      let Vue = this
      if (/^(([^<>()[\]\\.,:\s@']+(\.[^<>()[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        this.$http({
          method: 'GET',
          url: this.API_BASE_URL + '/api/email/validation/' + email,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(response => {
            Vue.emailValidated = true
            document.getElementById('email').style.border = '2px solid green'
          })
          .catch(error => {
            console.log(error)
            if (!error.response) {
              dialog.showErrorBox('네트워크 오류', 'adasd')
            } else if (error.response.status === 409) {
              document.getElementById('email').style.border = '2px solid red'
            }
            Vue.emailValidated = false
          })
      }
    },
    nickname: function () {
      const _nickname = document.getElementById('nickname').value
      if (_nickname.trim().length === 0) this.nicknameInputed = false
      else this.nicknameInputed = true
    },
    passwordValidation: function () {
      const password = document.getElementById('password').value
      document.getElementById('re_password').value = ''
      this.passwordMatches = 'none'
      if (password === '') {
        this.passwordValidated = 'none'
        return
      }
      const numberExist = password.search(/[0-9]/g) !== -1
      const engExist = password.search(/[a-zA-Z]/g) !== -1
      const specialExist = password.search(/\W/g) !== -1
      if (numberExist && engExist && specialExist && /^[a-zA-Z0-9\W]{10,30}$/.test(password)) {
        this.passwordValidated = true
      } else this.passwordValidated = false
    },
    passwordMatch: function () {
      if (!this.passwordValidated) return
      let password = document.getElementById('password')
      let rePassword = document.getElementById('re_password')
      if (password.value === rePassword.value) {
        console.log('match')
        password.style.border = '2px solid green'
        rePassword.style.border = '2px solid green'
        this.passwordMatches = true
      } else {
        password.style.border = '2px solid darkgray'
        rePassword.style.border = '2px solid darkgray'
        this.passwordMatches = false
      }
    },
    register: function () {
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const nickname = document.getElementById('nickname').value
      if (this.passwordValidated === true && this.emailValidated === true && this.passwordMatches === true && this.nicknameInputed) {
        this.$http({
          url: this.API_BASE_URL + '/api/auth/signup',
          method: 'POST',
          data: {
            email,
            password,
            nickname
          }
        }).then(response => {
          this.$electron.remote.dialog.showMessageBox({
            'type': 'info',
            'title': '회원가입 성공!',
            'message': '회원가입에 성공했어요 로그인해보세용ㅋ'
          })
          this.$electron.remote.getCurrentWindow().close()
        }).catch(err => {
          console.log(err)
          this.$electron.remote.dialog.showErrorBox('회원가입 실패!', '왜일까?')
        })
      }
    }
  }
}
</script>

<style scoped>
#register{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-size: 0px;
  width: 70%;
  height: 60%;
  margin: 0 auto;
  margin-top: 10%;
}

#app > h1 {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  font-size: 2rem;
  color: darkgray;
}

#app > #left {
  width: 70%;
  height: 70%;
  vertical-align: top;
  display: inline-block;
}

#left > input {
  padding-left: 0.5rem;
  width: 90%;
  height: 2rem;
  border: 0.5px solid darkgray;
}

#left > label {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: darkgray;
  display: block;
  font-size: 1rem;
}

#left > label:nth-of-type(2) {
  margin-top: 0.5rem;
}

#left > label:nth-of-type(3) {
  margin-top: 0.5rem;
}

#left > label:nth-of-type(4) {
  margin-top: 0.5rem;
}

.emailNotice-available {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: green;
  display: block;
  font-size: 0.8rem;
}

.emailNotice-unavailable {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: red;
  display: block;
  font-size: 0.8rem;
}

#passwordNotice-unavailable {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: red;
  display: block;
  font-size: 0.8rem;
}

#passwordNotice-available {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: green;
  display: block;
  font-size: 0.8rem;
}

#rePasswordNotice-available {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: green;
  display: block;
  font-size: 0.8rem;
}

#rePasswordNotice-unavailable {
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: red;
  display: block;
  font-size: 0.8rem;
}

#right {
  width: 30%;
  height: 70%;
  vertical-align: top;
  display: inline-block;
}

#right > #emailCheckBtn {
  margin-top: 1.1rem;
  border: 1px solid darkgray;
  width: 50%;
  height: 2rem;
  display: table;
  cursor: pointer;
}

#emailCheckBtn > #btnText {
  font-size: 0.8rem;
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: darkgray;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
}

#buttons {
  width: 100%;
  height: 20%;
}

#buttons > #registerBtn {
  margin-top: 5%;
  margin-left: 35%;
  width: 30%;
  height: 50%;
  border: 1px solid darkgray;
  display: table;
  cursor: pointer;
}

#registerBtn > #registerBtnText {
  font-size: 1.1rem;
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: darkgray;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
}

#exit {
  margin: 1px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: table;
  border: 1px solid darkgray;
}

#exit-X {
  font-size: 1.1rem;
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: darkgray;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
}
</style>


