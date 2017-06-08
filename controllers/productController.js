'use strict'

const Product = require('../models/product')

function getProduct(req, res) {

	let productId = req.params.productId

	Product.findById(productId, (error, product) => {
		if(error) return res.status(500).send( { message: `An error occurred while fetching in the database: ${error}` } )
		if(!product) return res.status(404).send( { message: `Couldn't find what you're looking for ;(`})
		
		res.status(200).send( { product } )
	})

}

function getProducts(req, res) {

	Product.find({}, (error, products) => {
		if(error) return res.status(500).send( { message: `An error occurred while fetching in the database: ${error}` } )
		if(!products) return res.status(404).send( { message: `Couldn't find products in the database` } )
		
		res.status(200).send( { products } )	
	})
}

function storeProduct(req, res){

	console.log('POST api/product')
	console.log(req.body)

	let product = new Product()

	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((error, productStored) => {
		if (error) res.status(500).send( { message: `An error occurred while storing in the database: ${error}` } )
		res.status(200).send( { product: productStored } )
	})
}

function updateProduct(req, res) {

	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update, (error, productUpdated) => {
		if(error) res.status(500).send( { message: `An error occurred while fetching in the database: ${error}` } )

		res.status(200).send( { product: productUpdated } )	
	})
}

function deleteProduct(req, res) {

	let productId = req.params.productId

	Product.findById(productId, (error, product) => {
		if(error) res.status(500).send( { message: `An error occurred while fetching in the database: ${error}` } )
		if(!product) res.status(404).send( { message: `Couldn't find what you're looking for ;(`})
		
		product.remove(error => {
			if(error) res.status(500).send( { message: `An error occurred while fetching in the database: ${error}` } )			
			res.status(200).send( { message: 'The product has been removed' } )
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	storeProduct,
	updateProduct,
	deleteProduct
}