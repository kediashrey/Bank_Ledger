const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function connectToDB() {
    try {
        console.log("Starting local virtual database...");
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        await mongoose.connect(mongoUri);
        console.log("Server connected to virtual DB successfully!");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}

module.exports = connectToDB;