const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passport');
const authenticate = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
