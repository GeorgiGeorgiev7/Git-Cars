const mongoose = require('mongoose');

const Car = require('./Car');


const connectionString = 'mongodb://localhost:27017/carsforsale';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('>>> Database connected');

        mongoose.connection.on('error', (err) => {
            console.log('>>> Database error');
            console.log(err);
        });

    } catch (err) {
        console.log('>>> Error connecting to database');
        process.exit(1);
    }
}

module.exports = init;