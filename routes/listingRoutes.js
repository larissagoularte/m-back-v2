const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const passport = require('../config/passport');
const { upload } = require('../middlewares/uploadMiddleware');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, listingController.getAllListings);
router.get('/:id', listingController.getListingById);
router.post('/', authenticate, upload.array('media', 20), listingController.addListing);
router.put('/:id', authenticate, listingController.updateListing);
router.delete('/:id', authenticate, listingController.deleteListing);

module.exports = router;