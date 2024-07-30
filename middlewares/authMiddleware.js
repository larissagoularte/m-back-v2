const { appPassword } = require('../config/config');

module.exports = (req, res, next) => {
    const password = req.headers['x-app-password'];

    if (!password || password !== appPassword) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}