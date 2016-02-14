'use strict';
var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        let auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false}); // TODO:
            }
            console.log(user);
            req.logIn(user, function(err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
        }
        else {
            next();
        }
    }
};
