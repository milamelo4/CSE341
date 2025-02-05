const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./db/connect");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server and initialize the database
(async () => {
  try {
    await mongodb.initDb(); // Ensure DB initializes first
    app.use("/", require("./routes")); // Load routes AFTER database is ready

    app.listen(port, () => {
      console.log(`Server running at http://127.0.0.1:${port}/`);
    });
  } catch (err) {
    console.error("Failed to initialize the database:", err);
    process.exit(1); // Exit if database connection fails
  }
})();
