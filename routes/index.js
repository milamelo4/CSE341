// Requirements
const router = require("express").Router();
const testRoute = require("../controllers/lesson1");

// Test routes. Call imports functions from controllers/lesson1.js
router.get("/", testRoute.testRoute);
router.get("/welcome", testRoute.myName);

// Use the routes defined in contactRoute.js for `/contact`
router.use("/contact", require("./contactRoute"));

// Export the routes
module.exports = router;
