import Vue from 'vue'
import Router from 'vue-router'

const Not_found = resolve => require(['components/Not_found'], resolve)
const Login = resolve => require(['components/Login'], resolve)
const Game = resolve => require(['components/Game'], resolve)
const Snake = resolve => require(['components/Game/Snake'], resolve)
const Slime = resolve => require(['components/Game/Slime'], resolve)

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Game
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/game',
      component: Game,
    },
    {
      path: '/game/snake',
      component: Snake
    },
    {
      path: '/game/slime',
      component: Slime
    },
    {
      path: '*',
      component: Not_found
    },
  ],
})
