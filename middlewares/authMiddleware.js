const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');


module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecret, (err) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    });
};