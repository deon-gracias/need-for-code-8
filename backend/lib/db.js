const mongoose = require("mongoose");

require('dotenv').config()

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/e-commerce";

// Connect to database
function connectToDB() {
    mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
}

// Disconnect from database
function disconnectFromDB() {
    mongoose.disconnect();
}

module.exports = { connectToDB, disconnectFromDB };