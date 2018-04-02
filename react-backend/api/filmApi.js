let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let db = mongoose.connect("mongodb://localhost:27017/coursework");
let Film = require('../db/film.js');

exports.createFilm = (userData)=>{
    let film = {
        name: userData.name,
        producer: userData.producer,
        country: userData.country,
        description: userData.description,
        poster: userData.poster,
        trailer: userData.trailer,
        data: userData.data,
        actors: userData.actors,
    };
    return new Film(film).save()
};

exports.getAllFilms =()=>{
    return Film
        .find({})
};

exports.changeFilm = (userData)=>{
    let opt = userData.option;
    return Film.update({name: userData.name},{$set:{ [opt]:userData.value}})
};

exports.deleteFilm = (userData)=>{
    return Film.remove({name: userData.name},
        function(err, user) {if (err) throw err})
};
