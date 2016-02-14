'use strict';


let express = require('express');
let router = new express.Router();

let mongoose = require('mongoose');
let Project = mongoose.model('Project');

let controller = require('../controllers/project-controller')(Project);

module.exports = function(app) {
  router.get('/', controller.get)
    .get('/add', controller.getForm)
    .get('/:id', controller.getById)
    .post('/', controller.post);

  app.use('/projects', router);
};
