const mongoose = require('mongoose');

const db = () => mongoose.connect('mongodb://localhost/fat');

module.exports = db;
