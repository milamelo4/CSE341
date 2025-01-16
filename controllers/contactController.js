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

module.exports = { getAllContacts, getContactById };
