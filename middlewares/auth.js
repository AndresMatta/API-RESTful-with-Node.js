'use strict'

const service = require('../services/service')

function isAuth(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({ message: `You don't have authorization`})
	}

	const token = req.headers.authorization.split(" ")[1]
	
	service.decodeToken(token)
		.then(response => {
			req.user = response
			next()
		})
		.catch(response => {
			res.status(response.status)
		})
}

module.exports = isAuth