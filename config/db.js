const mongoose = require('mongoose');

const url = process.env.DATABASE;

async function connectDB() {
    try {
        await mongoose.connect(url);
        console.log('DB Connect - OK');
    } catch (err) {
        console.error('DB Connect - FAIL');
        console.error(err);
    }
}

module.exports = connectDB;