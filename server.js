// Requirements:
// 1. Create a simple web server using Node.js.
// 2. The server should respond to requests with test and my name as message.
// 3. The server should listen on port 3000.

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

app.use(cors());

app
  .use(bodyParser.json())  
  .use("/", require("./routes")) // Ensure routes are correctly set up
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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