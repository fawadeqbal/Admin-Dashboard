const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'], // Only support 'Point' type for geospatial data
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    sensorId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'inactive',
    },
    // Add other sensor properties here
});


const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
