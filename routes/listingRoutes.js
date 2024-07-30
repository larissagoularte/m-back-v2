const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const passport = require('passport');
const { upload } = require('../middlewares/uploadMiddleware');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};


router.get('/', ensureAuthenticated, listingController.getAllListings);
router.get('/:id', listingController.getListingById);
router.post('/', ensureAuthenticated, upload.array('media', 20), listingController.addListing);
router.put('/:id', ensureAuthenticated, listingController.updateListing);
router.delete('/:id', ensureAuthenticated, listingController.deleteListing);

module.exports = router;