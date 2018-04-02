let mongoose = require('mongoose');
let Film = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    producer : {
        type: String,
    },
    country : {
        type: String,
    },
    description:{
        type: String,
    },
    poster:{
        type: String,
    },
    trailer:{
        type: String,
    },
    date:{
        type: String,
    },
    actors:{
        type: String,
    }
});

module.exports = mongoose.model('Film', Film);