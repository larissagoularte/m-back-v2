const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { appPassword } = require('./config');

passport.use(new LocalStrategy(
    { usernameField: 'password', passwordField: 'password', session: true },
    (username, password, done) => {
        if (password !== appPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, { username: 'admin' }); 
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    if (username === 'admin') {
        done(null, { username: 'admin' });
    } else {
        done(new Error('User not found'));
    }
});

module.exports = passport;