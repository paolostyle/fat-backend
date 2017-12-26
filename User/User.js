'use strict';

const mongoose = require('mongoose');

let schemaConfig = {
	fullName: {type: String},
	picture: {type: String},
	email: {
		type: String, required: true,
		trim: true, unique: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
	},
	facebookProvider: {
		type: {
			id: String,
			token: String
		},
		select: false
	}
};

const userSchema = new mongoose.Schema(schemaConfig);

class UserClass extends mongoose.Model {
	static getCurrentUser(req, res, next) {
		this.findById(req.auth.id, (err, user) => {
			if (err) {
				next(err);
			} else {
				req.user = user;
				next();
			}
		});
	}

	static getOne(req, res) {
		let user = req.user.toObject();

		delete user['facebookProvider'];
		delete user['__v'];

		res.json(user);
	}

	static upsertFbUser(accessToken, refreshToken, profile, cb) {
		let identifier = {
			'facebookProvider.id': profile.id
		};

		let callback = (err, user) => {
			if (!user) {
				let newUser = new this({
					fullName: profile.displayName,
					picture: profile.picture,
					email: profile.emails[0].value,
					facebookProvider: {
						id: profile.id,
						token: accessToken
					}
				});

				newUser.save((error, savedUser) => {
					error && console.log(error);
					return cb(error, savedUser);
				});
			} else {
				return cb(err, user);
			}
		};

		return this.findOne(identifier, callback);
	}
}

userSchema.set('toJSON', {getters: true, virtuals: true});

module.exports = mongoose.model(UserClass, userSchema);
