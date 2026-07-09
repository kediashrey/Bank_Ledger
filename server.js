require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
    // Wait for the virtual DB to boot up safely
    await connectToDB();

    // Start listening for Postman requests
    app.listen(PORT, () => {
        console.log(`Server is running beautifully on port ${PORT}`);
    });
}

startServer();