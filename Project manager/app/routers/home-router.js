'use strict';
let express = require('express');
let router = new express.Router();

let controller = require('../controllers/home-controller');
router.get('/',controller.get);


module.exports = function (app) {
  app.use('/home',router);
};
