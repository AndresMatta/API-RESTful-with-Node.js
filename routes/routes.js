'use strict'

const express = require('express')
const user = require('../controllers/authController')
const product = require('../controllers/productController')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', auth, product.getProducts)
api.get('/product/:productId', product.getProduct)
api.post('/product', auth, product.storeProduct)
api.put('/product/:productId', auth, product.updateProduct)
api.delete('/product/:productId', auth, product.deleteProduct)
api.post('/signup', user.signUp)
api.post('/signin', user.signIn)
api.get('/private', auth, function(req, res){
	res.status(200).send({ message: 'You have access'})
})

module.exports = api