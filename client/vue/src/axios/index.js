import Vue from 'vue'
import axios from 'axios'

var instance = axios.create({
	baseURL: 'http://127.0.0.1:3000/api/'
});

Vue.prototype.axios = instance;
