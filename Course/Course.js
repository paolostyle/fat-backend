'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	title: {type: String},
	category: {type: String},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	phone: {type: String},
	description: {type: String},
	price: {type: Number},
	date: {type: Date},
	days: mongoose.Schema.Types.Mixed
});
mongoose.model('Course', schema);

module.exports = mongoose.model('Course');