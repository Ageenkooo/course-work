let express = require('express');
let router = express.Router();
let filmApi = require('../api/filmApi');
let cinemaApi = require('../api/cinemaApi');
let sessionApi = require('../api/sessionApi');

router.get('/cinemas', (req, res, next) => {
    cinemaApi
        .getAllCinemas()
        .then((result) => {
            return result.map((one) => {
                return {name: one.name}
            })
        })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

router.get('/films', (req, res, next) => {
    filmApi
        .getAllFilms()
        .then((result) => {
            return result.map((one) => {
                return {name: one.name}
            })
        })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

router.post('/sessions', (req, res, next) => {
    sessionApi
        .getAllSessions(req.body)
        .then((result) => {
            console.log(result);
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

module.exports = router;
