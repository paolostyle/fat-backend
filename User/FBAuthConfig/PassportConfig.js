'use strict';

const User = require('../User');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function () {
	passport.use(
		new FacebookTokenStrategy({
			clientID: process.env.FB_ID,
			clientSecret: process.env.FB_SECRET
		},
		function (accessToken, refreshToken, profile, done) {
			User.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
				return done(err, user);
			});
		})
	);
};
