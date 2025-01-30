// Requirements
const router = require("express").Router();
const testRoute = require("../controllers/lesson1");

//Welcome route
router.get("/", (req, res) => {
  res.send("Welcome to the Contacts API!");
});

// Use the routes defined in contactRoute.js for `/contact`
router.use("/contacts", require("./contactRoute"));

// Export the routes
module.exports = router;
