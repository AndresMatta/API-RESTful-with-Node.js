'use strict'

const express = require('express')

const product = require('../controllers/productController')

const api = express.Router()

api.get('/product', product.getProducts)
api.get('/product/:productId', product.getProduct)
api.post('/product', product.storeProduct)
api.put('/product/:productId', product.updateProduct)
api.delete('/product/:productId', product.deleteProduct)

module.exports = api