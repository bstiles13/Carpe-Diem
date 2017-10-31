let express = require('express');
let router = new express.Router();
let path = require('path');
let tasks = require('../models/tasks.js');

// Receives and authenticates login information from existing users
router.post('/existinguser', tasks.existingUser);

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', tasks.newUser);

// POST request to add or remove a favorite url
router.post('/favorite', tasks.favorite);

// POST request to retrieve user favorites after successful login
router.post('/findfavorites', tasks.findFavorites);

router.post('/updatefavorites', tasks.updateFavorites);

router.post('/findlocations', tasks.findLocations);

router.post('/updatelocations', tasks.updateLocations);

// Default route that sends HTML file to browser
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

module.exports = router;