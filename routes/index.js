// Requirements
const router = require("express").Router();

//Root - Welcome route
router.get("/", (req, res) => {
  res.send("<h1>Welcome to my Contacts API!</h1>");
});

// Use the routes defined in contactRoute.js for `/contact`
router.use("/contacts", require("./contactRoute"));

// Export the routes
module.exports = router;
