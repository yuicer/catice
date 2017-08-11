import Vue from 'vue'
import Vuex from 'vuex'
import Chat from './chat.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		chat: Chat
	},
	state: {}
})
