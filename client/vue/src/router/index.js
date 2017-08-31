import Vue from 'vue'
import Router from 'vue-router'

const Not_found = resolve => require(['components/Not_found'], resolve)
const Login = resolve => require(['components/Login'], resolve)
const Main = resolve => require(['components/Main'], resolve)
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Login
		},
		{
			path: '/Login',
			component: Login
		},
		{
			path: '/Main',
			component: Main
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
