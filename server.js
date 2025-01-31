const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app   
  .use("/", require("./routes")) // Ensure routes are correctly set up
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server and initialize the database
(async () => {
  try {
    await mongodb.initDb();
    app.listen(port, () => {
      console.log(`Server running at http://127.0.0.1:${port}/`);
    });
  } catch (err) {
    console.error("Failed to initialize the database:", err);
  }
})();