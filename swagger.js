const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for the Contacts project",
  },
  host:
    process.env.NODE_ENV === "production"
      ? "cse341-4zv7.onrender.com"
      : "localhost:3000", // Dynamic host based on environment
  schemes: [process.env.NODE_ENV === "production" ? "https" : "http"], // Dynamic schemes based on environment
  paths: {}, // Add your paths here
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Pass doc to swaggerAutogen to generate the swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
