var mongoose = require('mongoose');
var User = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        unique: false,
    },
    email : {
      type: String,
      unique: true,
      required: true,
  }
})

module.exports = mongoose.model('User', User)
