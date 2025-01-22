const mongodb = require("../db/connect");
const { ObjectId } = require('mongodb'); // Import ObjectId to work with MongoDB IDs

const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contacts = await db.collection("contacts").find().toArray();
     //console.log("Contacts from DB:", contacts); Log to debug
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

// route to get a contact by id 
const getContactById = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id); // Convert ID to ObjectId
    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error("Error fetching contact by ID:", err);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

// createContact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthDate } = req.body; //validation

    if (!firstName || !lastName ||  !favoriteColor || !email || !birthDate) {
      return res
        .status(400)
        .json({ error: "All fields are required." });
    }

    const db = mongodb.getDb(); // connect to db
    const newContact = { firstName, lastName, email, favoriteColor, birthDate }; // Only insert validated fields
    const result = await db.collection("contacts").insertOne(newContact);

    res
      .status(201) // 201 Created
      .json({
        message: "Contact created successfully",
        contactId: result.insertedId,
      });
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

// updateContact
const updateContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthDate } = req.body;

    if (
      !firstName ||
      !lastName ||
      !favoriteColor ||
      !email ||
      !birthDate) {
      return res
        .status(400)
        .json({ error: "All fields are required." }); // Validation
    }

    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id); 
    const updatedContact = { firstName, lastName, email, favoriteColor, birthDate }; // Only update validated fields

    const result = await db
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: updatedContact }); // $set, to make sure fields are updated

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(204).send(); // 204 No Content updated, rubric
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ error: "Failed to update contact" }); // error server
  }
};

// deleteContact
const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id); // Convert ID to ObjectId
    const result = await db.collection("contacts").deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

module.exports = { 
  createContact, 
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact 
 };
