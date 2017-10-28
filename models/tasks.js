let bodyParser = require('body-parser');
let axios = require('axios');
let bcrypt = require('bcrypt');

let User = require('./user.js');
let Favorite = require('./favorite.js');

module.exports = {

    // Receives and authenticates login information from existing users    
    existingUser: function (req, res) {
        User.findOne({ 'username': req.body.existingUsername }, function (err, user) {
            if (err) {
                console.log(err);
                res.send(false);
            } else if (user == null) {
                res.send(false);
            } else {
                var savedHash = user.password;
                bcrypt.compare(req.body.existingPassword, savedHash, function (err, status) {
                    status === true ? res.json(true) : res.json(false);
                });
            }
        })
    },

    // POST request for login attempt by new users
    newUser: function (req, res) {
        // Search if new username matches existing names and, if so, return false (failure) to browser to trigger "existing user" error
        User.findOne({ 'username': req.body.newUsername }, function (err, user) {
            if (err) {
                console.log(err);
                res.send(false);
            // If username does not exist, encrypt and add new user account to database
            } else if (user == null) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.newPassword1, salt, function (err, hash) {
                        let newUser = {
                            username: req.body.newUsername,
                            password: hash,
                            zip: [req.body.newZip]
                        }
                        User.create(newUser).then(data => {
                            Favorite.create({ user: data.username }).then(data => {
                                res.send(true);
                            }).catch(err => {
                                console.log(err);
                            })
                        }).catch(err => {
                            console.log(err);
                        })
                    });
                });
            } else {
                res.send(false);
            }
        });
    },

    // POST request to add or remove a favorite shipwreck
    favorite: function (req, res) {
        let user = req.body.user;
        let id = req.body.wreck._id;
        // Search for user and shipwreck in user's favorites
        Favorite.find({
            user: user,
            favorites: { $elemMatch: { _id: id } }
        }).then(data => {
            if (data.length == 0) {
                // If shipwreck is not already favorited, add/push the wreck to the user's favorites collection
                Favorite.update({ user: user }, { $push: { favorites: req.body.wreck } }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        // After adding, return updated favorites to browser
                        Favorite.find({ user: user }).then(data => {
                            res.json(data);
                        })
                    }
                })
            } else {
                // If shipwreck is already favorited, remove/pull the wreck from the user's favorites collection
                Favorite.update({ user: user }, { $pull: { favorites: { _id: id } } }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        // After removing, return updated favorites to browser
                        Favorite.find({ user: user }).then(data => {
                            res.json(data);
                        })
                    }
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },

    // POST request to retrieve user favorites after login
    findFavorites: function (req, res) {
        let user = req.body.user;
        Favorite.find({ user: user }).then(data => {
            res.json(data);
        })
    },

    saveFavorite: function (req, res) {
        let url = req.body.url;
        arr = url.split('www2.');
        arr = arr.length < 2 ? arr[0].split('www.') : arr[1].split('www.');
        arr = arr.length < 2 ? arr[0].split('https://') : arr[1].split('https://');
        arr = arr.length < 2 ? arr[0].split('http://') : arr[1].split('http://');
        arr = arr.length < 2 ? arr[0].split('/') : arr[1].split('/');
        url = arr[0];
        console.log(url);     
        

    }

}