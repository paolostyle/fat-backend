'use strict';

require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
require('./User/User');
require('./Course/Course');

const bodyParser = require('body-parser');
const cors = require('cors');
const UserController = require('./User/UserController');
const CourseController = require('./Course/CourseController');

mongoose.connect(process.env.MONGO_URI);
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/api', UserController);
app.use('/api', CourseController);

module.exports = app;
