'use strict';

const User = require('./User');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Token = require('./FBAuthConfig/Token');
const PassportConfig = require('./FBAuthConfig/PassportConfig');

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
	.get(Token.authenticate, User.getCurrentUser, User.getOne);

module.exports = router;
