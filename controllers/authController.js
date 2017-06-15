'use strict'

const User = require('../models/user');
const service = require('../services/service')

function signUp(req, res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) =>{
    if(err) return res.status(500).send({ message: `An error ocourred: ${err}`});

    return res.status(201).send({ token: service.createToken(user) });
  })
}

function signIn(req, res){
  User.find({email: req.body.email}, (err, user) =>{
    if(err) return res.status(500).send({message: `Can't sign in : ${err}`});
    if(!user) return res.status(404).send({message: `Given user doesn't exist`});

    req.user = user
    res.status(200).send({
      message: 'You have loggued in!',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}