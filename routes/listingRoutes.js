const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', authMiddleware, listingController.getAllListings);
router.get('/:id', listingController.getListingById);
router.post('/', authMiddleware, upload.array('images', 20), listingController.addListing);
router.put('/:id', authMiddleware, listingController.updateListing);
router.delete('/:id', authMiddleware, listingController.deleteListing);

module.exports = router;