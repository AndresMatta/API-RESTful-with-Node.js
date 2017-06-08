'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const mongooseUniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	displayName: { type: String, required: true },
	password: { type: String, required: true , select: false},
	email: { type: String, required: true, unique: true, lowercase: true },
	signUp: { type: Date, default: Date.now() },
	lastLogin: Date 
});

UserSchema.plugin(mongooseUniqueValidator)

UserSchema.pre('save', (next) => {
	let user = this
	if(!user.usModified('password')) return next()

	bcrypt.genSalt(10, (error, salt) => {
		if(error) return next(error)

		bcrypt.hash(user.password, salt, null, (error, hash) => {
			if (error) next(error)

			user.password = hash
		})
	})
})

UserSchema.methods.gravatar = function() {
	if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema);
