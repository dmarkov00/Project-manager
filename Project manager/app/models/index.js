'use strict';

let fs = require('fs'),
  path = require('path');

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('-model') >= 0)
  .forEach(file => require(path.join(__dirname, file)));
  //we are using path(module) because i takes the default
  //seperator of the folders(it can be slash or backslash..)
