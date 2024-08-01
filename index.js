require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport'); 

const listingRouter = require('./routes/listingRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.DATABASE;

const connectDB = require('./config/db');
connectDB();


app.use(cors({
    origin: 'https://m-front-v2.pages.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/listings', listingRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})