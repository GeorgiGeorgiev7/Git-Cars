const mongoose = require('mongoose');

const Car = require('./Car');
const Accessory = require('./Accessory');

const connectionString = 'mongodb://localhost:27017/carsforsale';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('>>> Database connected');

    } catch (err) {
        console.log('>>> Error connecting to database');
        process.exit(1);
    }
}

module.exports = init;