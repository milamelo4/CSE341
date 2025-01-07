
// Routes
// create a function for the test route
const testRoute = (req, res) => {
    res.send("This is a test route!");
};

const testRoute2 = (req, res) => {
    res.send("Hello, world!");
}

// Export the routes
module.exports = { testRoute, testRoute2 };  
