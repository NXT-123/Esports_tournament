require('dotenv').config();

const connectDB = async () => {
    try {
        // Skip MongoDB connection and use JSON files directly
        console.log('Skipping MongoDB connection, using JSON files');
        console.log('Server will run with JSON file data responses.');
        
        // Set a flag to indicate we're running with JSON files
        global.mockMode = false;
        console.log('Using JSON files for data storage');
        return false;
    } catch (error) {
        console.warn('Database setup error:', error.message);
        console.log('Server will run with JSON file data responses.');
        
        global.mockMode = false;
        console.log('Using JSON files for data storage');
        return false;
    }
};

module.exports = connectDB;