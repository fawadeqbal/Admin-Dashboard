const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const MONGODB_URI = process.env.MONGO_DB_URL; // Replace with your MongoDB connection URI

const connection = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connection;
