'use strict';

const jwt = require('jsonwebtoken');

class Token {
	static create(auth) {
		return jwt.sign({id: auth.id}, process.env.TOKEN_SECRET, {expiresIn: 60 * 120});
	}

	static generate(req, res, next) {
		req.token = Token.create(req.auth);
		next();
	}

	static send(req, res) {
		res.setHeader('x-auth-token', req.token);
		res.status(200).send(req.auth);
	}
}

module.exports = Token;