/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.get('/', function(request, response, next) {
  User.find({}).then(users => response.send(users));
});

router.get('/:id', function(request, response, next) {
  User.findById({ _id: request.params.id }).then(user => response.send(user));
});

router.post('/', function(request, response, next) {
  User.create(request.body)
    .then(user => response.send(user))
    .catch(next);
});

router.put('/:id', function(request, response, next) {
  User.findByIdAndUpdate({ _id: request.params.id }, request.body)
    .then(() => User.findOne({ _id: request.params.id }))
    .then(user => response.send(user));
});

router.delete('/:id', function(request, response, next) {
  User.findByIdAndRemove({ _id: request.params.id }).then(user => response.send(user));
});

module.exports = router;
