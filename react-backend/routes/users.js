let express = require('express');
let router = express.Router();
let filmApi = require('../api/filmApi');
let cinemaApi = require('../api/cinemaApi');
let sessionApi = require('../api/sessionApi')

router.post('/addfilm', (req, res, next) => {
    console.log(req.body);
    filmApi
        .createFilm(req.body)
        .then(function (result) {
            console.log("Film created")
            res.json("ok")
        })
        .catch(function (err) {
            if (err.toJSON().code === 11000) {
                console.log("film wasn't created because of smth");
            }
        })
    });

router.get('/getallfilms', (req, res, next) => {
    filmApi
        .getAllFilms()
        .then((result) => {
            return result.map((one) => {
                return {val: one.name}
            })
        })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

router.post('/changefilm', (req, res, next) => {
    filmApi
        .changeFilm(req.body)
        .then(function (result) {
            console.log("Film changed");
            res.json("ok")
        })
        .catch(function (err) {
            console.log(err);
            if (err.toJSON().code === 11000) {
                console.log("film was not changed ");
            }
        })
    });

router.post('/deletefilm', (req, res, next) => {
    filmApi
        .deleteFilm(req.body)
        .then(function (result) {
            console.log("Film deleted");
            res.json("ok")
        })
        .catch(function (err) {
            console.log(err);
            if (err.toJSON().code === 11000) {
                console.log("film was not deleted ");

            }
        })
    });

router.post('/addcinema', (req, res, next) => {
    cinemaApi
        .createCinema(req.body)
        .then(function (result) {
            console.log("Cinema created")
            res.json("ok")
        })
        .catch(function (err) {
            if (err.toJSON().code === 11000) {
                console.log("cinema wasn't created because of smth");

            }
        })
    });

router.get('/getallcinemas', (req, res, next) => {
    cinemaApi
        .getAllCinemas()
        .then((result) => {
            return result.map((one) => {
                return {val: one.name}
            })
        })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

router.post('/deletecinema', (req, res, next) => {
    cinemaApi
        .deleteCinema(req.body)
        .then(function (result) {
            console.log("Cinema deleted");
            res.json("ok")
        })
        .catch(function (err) {
            console.log(err);
            if (err.toJSON().code === 11000) {
                console.log("cinema was not deleted ");

            }
        })
    });

router.post('/changecinema', (req, res, next) => {
    cinemaApi
        .changeCinema(req.body)
        .then(function (result) {
            console.log("Cinema changed");
            res.json("ok")
        })
        .catch(function (err) {
            console.log(err);
        })
    });

router.post('/addsession', (req, res, next) => {
    sessionApi
        .createSession(req.body)
        .then(function (result) {
            console.log("Session created")
            res.json("ok")
        })
        .catch(function (err) {
            if (err.toJSON().code === 11000) {
                console.log("session wasn't created because of smth");

            }
        })
    });

router.post('/getsessionsbycinema', (req, res, next) => {
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

router.post('/getsessionsbyfilm', (req, res, next) => {
    sessionApi
        .getAllSessionsByFilm(req.body)
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

router.post('/getsessionsbydate', (req, res, next) => {
    sessionApi
        .getAllSessionsByDate(req.body)
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    });

router.post('/changesession', (req, res, next) => {
    console.log(req.body);
    sessionApi
        .changeSession(req.body)
        .then(function (result) {
            console.log("Session changed");
            res.json("ok")
        })
        .catch(function (err) {
            console.log(err);
        })
    });

router.post('/deletesession', (req, res, next) => {
    sessionApi
        .deleteSession(req.body)
        .then(function (result) {
            console.log("Session deleted");
            res.json("ok")
        })
        .catch(function (err) {
            console.log(err);
            if (err.toJSON().code === 11000) {
                console.log("session was not deleted ");

            }
        })
    });

module.exports = router;
