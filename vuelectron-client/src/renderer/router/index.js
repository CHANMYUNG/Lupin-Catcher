import Vue from 'vue'
import Router from 'vue-router'
import Main from '../containers/Main'
import Login from '../containers/Login'
import Register from '../containers/Register'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: 'Main',
    component: Main
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }]
})
