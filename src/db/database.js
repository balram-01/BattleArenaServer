const mongoose = require('mongoose');

async function connectToDatabase(MONGODB_URI) {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB database connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit with failure
    }
}

module.exports = connectToDatabase;
