const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tournament_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        global.mockMode = false;
        return true;
    } catch (error) {
        console.warn('MongoDB connection failed:', error.message);
        console.log('Server will run with JSON file data responses.');
        
        // Set a flag to indicate we're running in mock mode
        global.mockMode = true;
        console.log('Mock mode enabled, using JSON files');
        return false;
    }
};

module.exports = connectDB;