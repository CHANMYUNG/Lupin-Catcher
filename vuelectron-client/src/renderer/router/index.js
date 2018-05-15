import Vue from 'vue'
import Router from 'vue-router'
import Register from '../containers/Register'
import Login from '../containers/Login'
import Main from '../containers/Main'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/main',
    name: 'Main',
    component: Main
  }]
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
