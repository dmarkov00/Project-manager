'use strict';
let mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  deadline: Number,
  description : String,
  pinpoints: [{
    username:String,
    content: String
  }]
});
mongoose.model('Project', projectSchema);
