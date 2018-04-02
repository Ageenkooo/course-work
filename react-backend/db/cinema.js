let mongoose = require('mongoose');
let Cinema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    address : {
        type: String,
    }
});

module.exports = mongoose.model('Cinema', Cinema);