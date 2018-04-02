let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let db = mongoose.connect("mongodb://localhost:27017/coursework");
let Session = require('../db/session.js');

exports.createSession = (userData)=>{
    let session = {
        film: userData.film,
        cinema: userData.cinema,
        date: userData.date,
        time: userData.time,
        price: userData.price,
        seats: [],
    };
    return new Session(session).save()
};
exports.getAllSessions =(userData)=>{
    return Session.find({cinema: userData.cinema}).distinct("film")
};
exports.getAllSessionsByFilm =(userData)=>{
    return Session.find({cinema: userData.cinema, film: userData.film})
};
exports.getAllSessionsByDate =(userData)=>{
    return Session.find({cinema: userData.cinema, film: userData.film, date: userData.date})
};
exports.deleteSession = (userData)=>{
    return Session.remove({cinema: userData.cinema, film: userData.film, date: userData.date, time: userData.time },
        function(err) {if (err) throw err})
};
exports.changeSession = (userData)=>{
    let opt = userData.option;
    return Session.update({cinema: userData.cinema, film: userData.film, date: userData.date, time: userData.time },
                            {$set:{ [opt]:userData.value}})
};