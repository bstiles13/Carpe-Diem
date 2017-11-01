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

    // POST request to retrieve user favorites after login or change
    findFavorites: function (req, res) {
        let user = req.body.user;
        Favorite.find({ user: user }).then(data => {
            res.json(data);
        })
    },

    // POST request to update user favorites after addition, removal, or re-order
    updateFavorites: function (req, res) {
        Favorite.update(
            { user: req.body.user },
            { favorites: req.body.favorites }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    // After update, return true (success) to browser
                    res.send(true);
                }
            });
    },

    // POST request to retrieve user zip codes after login or change
    findLocations: function (req, res) {
        let user = req.body.user;
        User.find({ username: user }).then(data => {
            res.json(data);
        })
    },

    // POST request to update user zip codes after addition, removal, or re-order
    updateLocations: function (req, res) {
        console.log(req.body.locations);
        console.log('received update');
        User.update(
            { username: req.body.user },
            { zip: req.body.locations }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    // After update, return true (success) to browser
                    res.send(true);
                }
            });
    },

    // POST request to retrieve local events from Eventful API based on location and category; a separate API call is made for each category
    activities: function (req, res) {
        console.log('received');
        let zip = req.body.zip;
        let activities = req.body.activities;
        let response = {};
        axios.get('http://api.eventful.com/json/events/search?...&location=' + zip + '&within=100&date=Future&t=This+Week&sort_order=popularity&category=' + activities[0].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
            response[activities[0].category] = data.data.events.event;
            axios.get('http://api.eventful.com/json/events/search?...&location=' + zip + '&within=100&date=Future&t=This+Week&sort_order=popularity&category=' + activities[1].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                response[activities[1].category] = data.data.events.event;
                axios.get('http://api.eventful.com/json/events/search?...&location=' + zip + '&within=100&date=Future&t=This+Week&sort_order=popularity&category=' + activities[2].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                    response[activities[2].category] = data.data.events.event;
                    axios.get('http://api.eventful.com/json/events/search?...&location=' + zip + '&within=100&date=Future&t=This+Week&sort_order=popularity&category=' + activities[3].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                        response[activities[3].category] = data.data.events.event;
                        axios.get('http://api.eventful.com/json/events/search?...&location=' + zip + '&within=100&date=Future&t=This+Week&sort_order=popularity&category=' + activities[4].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                            response[activities[4].category] = data.data.events.event;
                            axios.get('http://api.eventful.com/json/events/search?...&location=' + zip + '&within=100&date=Future&t=This+Week&sort_order=popularity&category=' + activities[5].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                                response[activities[5].category] = data.data.events.event;
                                res.send(response);
                            })
                        })
                    })
                })
            })
        })
    }

}