import Vue from 'vue'
import Router from 'vue-router'

const Not_found = resolve => require(['components/Not_found'], resolve)
const Login = resolve => require(['components/Login'], resolve)
const Game = resolve => require(['components/Game'], resolve)
const GluttonousSnake = resolve => require(['components/Game/Snake/GluttonousSnake'], resolve)

Vue.use(Router)

export default new Router({
	routes: [
		{
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
		},
		{
			path: '/game/snake',
			component: GluttonousSnake
		},

//		{
//			path: '/Main_page',
//			component: Main_page,
//			children: [{
//				path: '',
//				component: Home
//			}, {
//				path: 'Addresslist',
//				component: Addresslist
//			}]
//		}, 
		{
			path: '*',
			component: Not_found
		}, ],
})
