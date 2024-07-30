const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Login successful' });
        });
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Logout successful' });
    });
};
