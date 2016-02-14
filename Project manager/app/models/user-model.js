'use strict';
let mongoose = require('mongoose'),
  encryption = require('../utilities/encryption');

var requiredMessage = '{PATH} is required';
var defaultAvatar = 'https://ninjageisha.files.wordpress.com/2012/08/ninja-tadaa.jpg';
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: requiredMessage,
    unique: true
  },
  firstName: {
    type: String,
    required: requiredMessage
  },
  lastName: {
    type: String,
    required: requiredMessage
  },
  email: {
    type: String,
    required: requiredMessage
  },
  salt: String,
  hashPass: String,
  projects: [String],
  avatar: { type: String, default: defaultAvatar }
});

userSchema.method({
  authenticate: function(password) {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
      return true;
    } else {
      return false;
    }
  }
});
mongoose.model('User', userSchema);
