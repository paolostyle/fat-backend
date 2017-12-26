const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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

	static authenticate() {
		expressJwt({
			secret: process.env.TOKEN_SECRET,
			requestProperty: 'auth',
			getToken: function(req) {
				if (req.headers['x-auth-token']) {
					return req.headers['x-auth-token'];
				}
				return null;
			}
		});
	}
}

module.exports = Token;