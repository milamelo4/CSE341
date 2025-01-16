const { MongoClient } = require("mongodb");
require("dotenv").config();

let _db;

const initDb = async () => {
  if (_db) {
    console.log("Database is already initialized!");
    return _db;
  }
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    _db = client.db(); // Use the database specified in the connection string
    console.log("Successfully connected to the database");
    //console.log("Connected Database Name:", _db.databaseName);

    return _db;
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    throw err; // Rethrow to handle the error in server.js
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized!");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
