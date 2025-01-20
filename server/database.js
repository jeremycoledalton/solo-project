const mongoose = require('mongoose');

const connectDB = async (URI) => {
    try{
        await mongoose.connect(URI);
        mongoose.connection.once('open', () => {
          console.log('Connected to MongoDB');
        });
    } catch (err) {
        onsole.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;