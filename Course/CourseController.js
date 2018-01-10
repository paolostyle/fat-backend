'use strict';

const Course = require('./Course');
const express = require('express');
const router = express.Router();
const Helpers = require('../helpers');

router.post('/courses/', (req, res) => {
	let {body} = req;
	Course.create(body, (err, response) => {
		if (err) return res.status(500).send(Helpers.jsonifyMessage('Podczas dodawania kursu wystąpił błąd.'));
		res.status(200).send(response);
	});
});

router.get('/courses/', (req, res) => {
	Course.find({}).populate('user').exec((err, courses) => {
		if (err) return res.status(500).send(Helpers.jsonifyMessage('Podczas pobierania kursów wystąpił błąd.'));
		res.status(200).send(courses);
	});
});

router.get('/courses/:id', (req, res) => {
	Course.findById(req.params.id).populate('user').exec((err, course) => {
		if (err) return res.status(500).send(Helpers.jsonifyMessage('Podczas pobierania danych kursu wystąpił błąd.'));
		if (!course) return res.status(404).send(Helpers.jsonifyMessage('Nie znaleziono kursu o danym ID.'));
		res.status(200).send(course);
	});
});

router.delete('/courses/:id', (req, res) => {
	Course.findByIdAndRemove(req.params.id, (err, course) => {
		if (err) return res.status(500).send(Helpers.jsonifyMessage('Podczas usuwania kursu wystąpił błąd'));
		res.status(200).send(Helpers.jsonifyMessage('Kurs ' + course.title + ' został usunięty.'));
	});
});

router.put('/courses/:id', (req, res) => {
	Course.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, course) => {
		if (err) return res.status(500).send(Helpers.jsonifyMessage('Podczas aktualizacji kursu wystąpił błąd.'));
		res.status(200).send(course);
	});
});

module.exports = router;
