// create functions for the test route
const testRoute = (req, res) => {
    res.send("This is a test route!");
};

const myName = (req, res) => {
    res.send("Camila Melo!");
}

// Export the routes
module.exports = { testRoute, myName };  
