let mongoose = require('mongoose');
let Session = new mongoose.Schema({
    cinema : {
        type: String,
        required: true,
    },
    film : {
        type: String,
        required: true,
    },
    date : {
        type: String,
    },
    time:{
        type: String,
    },
    price:{
        type: String,
    },
    seats:{
        type: Array,
    }
});

module.exports = mongoose.model('Session', Session);