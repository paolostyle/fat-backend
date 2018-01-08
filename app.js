'use strict';

require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserController = require('./User/UserController');
const CourseController = require('./Course/CourseController');
const app = express();

db();

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/api', UserController);
app.use('/api', CourseController);

module.exports = app;
