const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const User = require('../models/User');

const jwtOptions = {
    jwtFromRequest: (req) => {
        return req.cookies.token;
      },
      secretOrKey: process.env.JWT_SECRET
};

passport.use(new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => done(err, false));
}));

module.exports = passport;
