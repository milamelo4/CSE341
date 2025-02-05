// Requirements
const router = require("express").Router();

//Root - Welcome route
router.get("/", (req, res) => {
  res.send("<h1>Welcome to my Contacts API!</h1>");
});

// Use the routes defined in contactRoute.js for `/contact`
router.use("/contacts", require("./contactRoute"));

// Use the routes defined in swagger.js for `/api-docs`
router.use('/', require('./swagger')); // Swagger route added

// Export the routes
module.exports = router;
