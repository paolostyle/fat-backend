'use strict';

const User = require('./User');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Token = require('./FBAuthConfig/Token');
const PassportConfig = require('./FBAuthConfig/PassportConfig');
const expressJwt = require('express-jwt');

PassportConfig();

router.route('/auth/facebook')
	.post(passport.authenticate('facebook-token', {session: false}), (req, res, next) => {
		if (!req.user) {
			return res.send(401, 'User Not Authenticated');
		}

		req.auth = {
			id: req.user.id
		};

		next();
	}, Token.generate, Token.send);

router.route('/auth/me')
	.get(expressJwt({
		secret: process.env.TOKEN_SECRET,
		requestProperty: 'auth',
		getToken: function(req) {
			if (req.headers['x-auth-token']) {
				return req.headers['x-auth-token'];
			}
			return null;
		}
	}), getCurrentUser, getOne);

function getCurrentUser(req, res, next) {
	User.findById(req.auth.id, (err, user) => {
		if (err) {
			next(err);
		} else {
			req.user = user;
			next();
		}
	});
}

function getOne(req, res) {
	let user = req.user.toObject();

	delete user['facebookProvider'];
	delete user['__v'];

	res.json(user);
}

module.exports = router;
