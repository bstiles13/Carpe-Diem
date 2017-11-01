let express = require('express');
let router = new express.Router();
let path = require('path');
let tasks = require('../models/tasks.js');

// Receives and authenticates login information from existing users
router.post('/existinguser', tasks.existingUser);

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', tasks.newUser);

// POST request to retrieve user favorites after successful login
router.post('/findfavorites', tasks.findFavorites);

// POST request to update user favorites after addition, removal, or re-order
router.post('/updatefavorites', tasks.updateFavorites);

// POST request to retrieve user zip codes after login or change
router.post('/findlocations', tasks.findLocations);

// POST request to update user zip codes after addition, removal, or re-order
router.post('/updatelocations', tasks.updateLocations);


// POST request to retrieve local events from Eventful API based on location and category; a separate API call is made for each category
router.post('/activities', tasks.activities);

// Default route that sends HTML file to browser
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

module.exports = router;