var mongoose = require('mongoose')
var crypto = require('crypto')
mongoose.Promise = global.Promise
var db = mongoose.connect("mongodb://localhost:27017/userscw")
var User = require('./db/user.js')

exports.createUser = (userData) => {
    var user = {
        name: userData.name,
        password: hash(userData.password),
        email: userData.email,
        tickets: []
    }
    return new User(user).save()
}

exports.getUser = (userData) => {
    return User.findOne({_id: userData.id})
}

exports.checkUser = (userData) => {
    return User
        .findOne({email: userData.email})
        .then(function (doc) {
            if (doc.password == hash(userData.password)) {
                console.log("User password is ok")
                return Promise.resolve(doc)
            } else {
                console.log("Password is wrong!")
                return Promise.reject("Error wrong")
            }
        })
}

exports.userTickets = (userData) => {
    return User.update({
        name: userData.name
    }, {
        '$addToSet': {
            tickets: userData.ticketsData
        }
    })
};

function hash(text) {
    return crypto
        .createHash('sha1')
        .update(text)
        .digest('base64')
}
