import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Main = resolve => require(['components/MainPage.vue'], resolve)
const Not_found = resolve => require(['components/Not_found'], resolve)
const Chat = resolve => require(['components/Chat'], resolve)
const Snake = resolve => require(['components/Game/Snake'], resolve)
const Slime = resolve => require(['components/Game/Slime'], resolve)


export default new Router({
  routes: [{
      path: '/',
      component: Main
    },
    {
      path: '/Chat',
      component: Chat
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
