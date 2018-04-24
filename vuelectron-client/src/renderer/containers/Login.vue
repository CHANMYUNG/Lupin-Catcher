<template>
  <div id="login">
    <TitleHeader/>
    <div id="login-area">
      <div id='login-title'>
        LOGIN
      </div>
      <div id="inputs">
        <div class="input-area">
            <label for="email-input">EMAIL</label>
            <input type="email" id="email-input" placeholder="EMAIL">
        </div>
        <div class = "input-area">
          <label for="password-input">PASSWORD</label>
          <input type="password" id="password-input" placeholder="PASSWORD">
        </div>
      </div>
      <div id="login-btn" @click="$router.push('/main')">
        LOGIN
      </div>

      <div id="register-btn" @click="$router.push('/register')">
        Register
      </div>
    </div>
  </div>
</template>
<script>
import TitleHeader from '../components/Header'
export default {
  components: {
    TitleHeader
  }
}
</script>
<style scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

#login-area {
  position: absolute;
  width: 35%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
}

#login-title {
  margin-top: 10%;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  color: rgb(100,187,187);
  font-weight: bold;
}

#inputs {
  margin-top: 7%;
}
.input-area label {
  margin-left: 15%;
  font-size: 0.6rem;
  display: block;
  margin-bottom: 1%;
  margin-top: 3%;
  color: rgb(114,114,114)
}
.input-area input {
  margin-left: 15%;
  padding-left: 10px;
  width: 70%;
  height: 30px;
  border: 1px solid rgb(218, 218, 218)
}

.input-area input::placeholder {
  color: rgb(218, 218, 218)
}

#login-btn {
  width: 70%;
  height: 40px;
  margin-top: 5%;
  margin-left: 15%;
  background-color: rgb(103,188,188);
  text-align: center;
  line-height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

#register-btn {
  margin-top: 13%;
  width: 20%;
  margin-left: 40%;
  text-align: center;
  color: rgb(119,196,195);
  cursor: pointer;
}
</style>
