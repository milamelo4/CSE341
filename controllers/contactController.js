const mongodb = require("../db/connect");
const { ObjectId } = require('mongodb'); // Import ObjectId to work with MongoDB IDs

// Get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const contacts = await db.collection("contacts").find().toArray();
     //console.log("Contacts from DB:", contacts); Log to debug
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

// Get contact by ID
const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) { 
      const error = new Error("Invalid ID format");
      error.status = 400;
      return next(error);
    }
    const db = mongodb.getDb();
    const contactId = new ObjectId(id); // Convert ID to ObjectId
    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      const error = new Error("Contact not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

// Create a new contact
const createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body; //validation

    if (!firstName || !lastName ||  !favoriteColor || !email || !birthday) {
      const error = new Error("All fields are required.");
      error.status = 400;
      return next(error);
    }

    const db = mongodb.getDb(); // connect to db
    const newContact = { firstName, lastName, email, favoriteColor, birthday }; // Only insert validated fields
    const result = await db.collection("contacts").insertOne(newContact);
    res
      .status(201) // 201 Created
      .json({
        message: "Contact created successfully",
        contactId: result.insertedId,
      });
  } catch (err) {
    next(err);
  }
};

// Update a contact by ID
const updateContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const { id } = req.params;
    if (
      !firstName ||
      !lastName ||
      !favoriteColor ||
      !email ||
      !birthday) {
      const error = new Error("All fields are required.");
      error.status = 400;
      return next(error);
    }
    if (!ObjectId.isValid(id)) { // Validate ID format
      const error = new Error("Invalid ID format");
      error.status = 400;
      return next(error);
    }
    const db = mongodb.getDb();
    const contactId = new ObjectId(id); 
    const updatedContact = { firstName, lastName, email, favoriteColor, birthday }; // Only update validated fields

    const result = await db
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: updatedContact }); // $set, to make sure fields are updated

    if (result.modifiedCount === 0) {
      const error = new Error("Contact not found");
      error.status = 404;
      return next(error);
    }
    res.status(204).send(); // 204 Updated but no content (rubric)
  } catch (err) {
    next(err);
  }
};

// Delete a contact by ID
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {   
      const error = new Error("Invalid ID format");
      error.status = 400;
      return next(error);
    }
    const db = mongodb.getDb();
    const contactId = new ObjectId(id); // Convert ID to ObjectId
    const result = await db.collection("contacts").deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      const error = new Error("Contact not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Export the functions
module.exports = { 
  createContact, 
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact 
 };
