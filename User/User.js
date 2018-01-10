'use strict';

const mongoose = require('mongoose');
const Course = require('../Course/Course');

let schemaConfig = {
	fbId: {type: Number},
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
userSchema.pre('remove', function(next) {
	Course.remove({user: this._id}).exec();
	next();
});

class User extends mongoose.Model {
	static upsertFbUser(accessToken, refreshToken, profile, cb) {
		let identifier = {
			'facebookProvider.id': profile.id
		};

		let callback = (err, user) => {
			if (!user) {
				let newUser = new this({
					fbId: profile.id,
					fullName: profile.displayName,
					picture: profile.photos[0].value,
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

module.exports = mongoose.model(User, userSchema);
