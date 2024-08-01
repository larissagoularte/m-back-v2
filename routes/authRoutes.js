const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

router.post('/login', authController.login);
router.post('/logout', ensureAuthenticated,authController.logout);

module.exports = router;
