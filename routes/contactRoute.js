const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// route to get all contacts
router.get("/", contactController.getAllContacts);

// route to get a contact by id
router.get("/:id", contactController.getContactById);

// route to create a new contact
router.post("/", contactController.createContact);

// route to update a contact by id
router.put("/:id", contactController.updateContact);

// route to delete a contact by id
router.delete("/:id", contactController.deleteContact);


module.exports = router;