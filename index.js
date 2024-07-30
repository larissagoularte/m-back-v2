require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const listingRouter = require('./routes/listingRoutes');

const app = express();
const port = process.env.PORT || 3000;

const connectDB = require('./config/db');
connectDB();

app.use(bodyParser.json());

app.use('/api/listings', listingRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})