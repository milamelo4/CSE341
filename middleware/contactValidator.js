const { body, validationResult } = require("express-validator");

// Validation rules for creating and updating contacts
const validateContactRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("favoriteColor").notEmpty().withMessage("Favorite color is required"),
  body("birthday")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format (YYYY-MM-DD expected)"),
];

// Middleware to handle validation errors
const validateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Export both the validation rules and error handler
module.exports = { validateContactRules, validateContact };
