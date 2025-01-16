const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// route to get all contacts
router.get("/", contactController.getAllContacts);

// route to get a contact by id
router.get("/:id", contactController.getContactById);


module.exports = router;