import Vue from 'vue'
import Router from 'vue-router'

const Not_found = resolve => require(['components/Not_found'], resolve)
const Login = resolve => require(['components/Login'], resolve)
const Game = resolve => require(['components/Game'], resolve)
const Snake = resolve => require(['components/Game/Snake'], resolve)

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/game',
      component: Game,
      children: [{
        path: '',
        component: Game
      }, {
        path: 'snake',
        component: Snake
      }]
    },
    {
      path: '*',
      component: Not_found
    },
  ],
})
