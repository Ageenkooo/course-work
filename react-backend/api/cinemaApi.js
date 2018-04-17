let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://localhost:27017/coursework");
let Cinema = require('../db/cinema.js'); 

exports.createCinema = (userData)=>{
    let cinema = {
        name: userData.name,
        address: userData.address,
    };
    return new Cinema(cinema).save()
};

exports.getAllCinemas =()=>{
    return Cinema.find({})
};

exports.deleteCinema = (userData)=>{
    return Cinema.remove({name: userData.name},
        function(err, user) {if (err) throw err})
};

exports.changeCinema = (userData)=>{
    let opt = userData.option;
    return Cinema.update({name: userData.name},{$set:{ [opt]:userData.value}})
};
