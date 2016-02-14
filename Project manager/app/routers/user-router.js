'use strict';
let express = require('express');
let router = new express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let auth = require('../config/auth');

let controller = require('../controllers/user-controller')(User);
router.get('/register', controller.getRegister)
  .post('/register',controller.postRegister)
  .get('/login',controller.getLogin)
  .post('/login',auth.login)
  .get('/logout', auth.logout);



module.exports = function(app) {
  app.use('/user', router);
};
