require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const listingRouter = require('./routes/listingRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.DATABASE;

const connectDB = require('./config/db');
connectDB();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUrl }),
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/listings', listingRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})