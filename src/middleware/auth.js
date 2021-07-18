require('dotenv').config();
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const { getUser } = require('../models/User');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}; 

// lets create our strategy for web token
passport.use('auth', new JwtStrategy(opts, async function (jwt_payload, done) {
	const { type, id } = jwt_payload;
	console.log('jwt_payload', jwt_payload);

	if (!type && !id) return done(70, false);

	let user = await getUser(jwt_payload.id);
	user['type'] = type;
    
	if (user) {
		return done(null, user);
	} else {
		return done(null, false);
	}
}));

module.exports = passport;
