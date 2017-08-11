import express from 'express'
import {
	Nuxt,
	Builder
} from 'nuxt'

import api from './api'

const app = express()
//const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	if (req.method == 'OPTIONS') {
		res.send(200);
		/让options请求快速返回/
	} else {
		next();
	}
});
// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
	const builder = new Builder(nuxt)
	builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port)
console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console
