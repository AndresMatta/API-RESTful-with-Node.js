'use strict'

const mongoose = require('mongoose')

const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (error, res) => {
	if (error) throw error
	
	console.log('Connection to the established database')
	app.listen(config.port, ()=> {
		console.log(`api-rest is now running in https://locahost:${config.port}`)
	})
})

