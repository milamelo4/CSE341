// Requirements
const router = require('express').Router();

const testRoute = require("../controllers/lesson1");

// Test routes
router.get('/', testRoute.testRoute);
router.get('/welcome', testRoute.testRoute2);

module.exports = router;

