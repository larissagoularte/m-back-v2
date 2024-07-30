const Listing = require('../models/Listing');
const { appPassword } = require('../config/config');

exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Listing not found.' });

        if (listing.basicInfo.status === 'unavailable') {
            const password = req.headers['x-app-password'];
            if (!password || password !== appPassword) {
                return res.status(401).json({ message: 'Unauthorized - Listing Unavailable'});
            }
        }

        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addListing = async (req, res) => {
    let listingData = {
        basicInfo: {},
        contractualInfo: {},
    };

    if (req.body.basicInfo) {
        listingData.basicInfo = {
        reference: req.body.basicInfo.reference,
        title: req.body.basicInfo.title,
        description: req.body.basicInfo.description,
        location: req.body.basicInfo.location,
        mapsLink: req.body.basicInfo.mapsLink,
        availability: req.body.basicInfo.availability,
        rooms: req.body.basicInfo.rooms,
        status: req.body.basicInfo.status,
        };
    }

    if (req.body.contractualInfo) {
        listingData.contractualInfo = {
        warrantor: req.body.contractualInfo.warrantor,
        price: req.body.contractualInfo.price,
        guarantee: req.body.contractualInfo.guarantee,
        observations: req.body.contractualInfo.observations,
        };
    }

    if (req.files && Array.isArray(req.files)) {
        listingData.basicInfo.images = req.files.map(file => file.path);
      }

    const listing = new Listing(listingData);
    try {
        const newListing = await listing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.json(listing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.json({ message: 'Listing deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};