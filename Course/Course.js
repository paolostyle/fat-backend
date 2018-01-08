'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	title: {type: String},
	category: {type: String},
	userId: {type: Number},
	description: {type: String},
	price: {type: Number},
	date: {type: Date},
});
mongoose.model('Course', schema);

module.exports = mongoose.model('Course');