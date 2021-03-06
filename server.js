// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

// Server congfiguration and middleware
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));
app.use('/', routes);

// MongoDB Settings
let db = process.env.MONGODB_URI || 'mongodb://localhost/carpediem_db';

// MongoDB Connection
mongoose.connect(db, (err) => {
    if (err) {
        console.error(error);
    } else {
        console.log('Connected to MongoDB');
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/build/index.html'));
});

// Start Express Server
app.listen(PORT, () => {
    console.log('Server connected on port ' + PORT);
})