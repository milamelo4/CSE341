const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const {
  validateContactRules,
  validateContact,
} = require("../middleware/contactValidator");

// route to get all contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts.
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65b1a7e21f4f5e001c8a3e88"
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   favoriteColor:
 *                     type: string
 *                     example: "Blue"
 *                   birthday:
 *                     type: string
 *                     format: date
 *                     example: "1990-05-20"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.get("/", contactController.getAllContacts);

// route to get a contact by id
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a single contact using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The MongoDB ObjectId of the contact.
 *         schema:
 *           type: string
 *           example: "65b1a7e21f4f5e001c8a3e88"
 *     responses:
 *       200:
 *         description: Successfully retrieved the contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65b1a7e21f4f5e001c8a3e88"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 favoriteColor:
 *                   type: string
 *                   example: "Blue"
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-20"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Contact not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Contact not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.get("/:id",  [...validateContactRules, validateContact],
    contactController.getContactById);

// route to create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Add a new contact to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Jane"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               favoriteColor:
 *                 type: string
 *                 example: "Green"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1992-08-15"
 *     responses:
 *       201:
 *         description: Contact created successfully.
 *       400:
 *         description: Validation failed (missing required fields).
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/",
  [...validateContactRules, validateContact],
  contactController.createContact
);


// route to update a contact by id
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Update an existing contact's details.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The MongoDB ObjectId of the contact.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Jane"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               favoriteColor:
 *                 type: string
 *                 example: "Green"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1992-08-15"
 *     responses:
 *       204:
 *         description: Contact updated successfully (no content returned).
 *       400:
 *         description: Invalid ID format or missing fields.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  [...validateContactRules, validateContact],
  contactController.updateContact
);

// route to delete a contact by id
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Remove a contact from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The MongoDB ObjectId of the contact.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       400:
 *         description: Invalid ID format.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id",  [...validateContactRules, validateContact],
    contactController.deleteContact);


module.exports = router;