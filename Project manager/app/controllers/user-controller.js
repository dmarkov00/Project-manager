'use strict';
let encryption = require('../utilities/encryption');
let passport = require('passport');
module.exports = function(User) {
  let controller = {
      getRegister: function(req, res, next) {
          res.render('user-register.jade');
      },
      postRegister: function(req, res, next) {
          var newUserData = req.body;

          if (newUserData.password != newUserData.confirmPassword) {
              req.session.error = 'Passwords do not match!';
              res.redirect('/user/register');
          }
          else {
              newUserData.salt = encryption.generateSalt();
              newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
              User.create(newUserData, function(err, user) {
                  if (err) {
                      console.log('Failed to register new user: ' + err);
                      return;
                  }
                  console.log(user);
                  req.logIn(user, function(err) {
                      if (err) {
                          res.status(400);
                          return res.send({reason: err.toString()}); // TODO:
                      }
                      else {
                          res.redirect('/');
                      }
                  });
              });
          }
      },
      getLogin: function(req, res, next) {
          res.render('user-login');
      }
  };
  return controller;
};
