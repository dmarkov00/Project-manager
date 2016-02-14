'use strict';

let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport');
module.exports = function(app) {
  //db config
  let connectionString = "mongodb://localhost/project-manager";
  mongoose.connect(connectionString);


  app.use(express.static(path.join(__dirname, '/../../public')));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session({
    secret: 'magic unicorns',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.set('views', path.join(__dirname, '/../views'));
  app.set('view engine', 'jade');

  app.use(function(req, res, next) {
    if (req.session.error) {
      var msg = req.session.error;
      req.session.error = undefined;
      app.locals.errorMessage = msg;
    } else {
      app.locals.errorMessage = undefined;
    }

    next();
  });
  app.use(function(req, res, next) {
    if (req.user) {
      app.locals.currentUser = req.user;
    } else {
      app.locals.currentUser = undefined;
    }

    next();
  });

  app.get('/', function(req, res) {
    res.redirect('/home');
  });
};
