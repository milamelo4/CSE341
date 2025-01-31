const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for the Contacts project",
  },
  host:
    process.env.NODE_ENV === "production"
      ? "cse341-4zv7.onrender.com"
      : "localhost:3000", // Use Render host in production, localhost otherwise
  schemes: [
    process.env.NODE_ENV === "production" ? "https" : "http", // Use HTTPS in production
  ],
  paths: {}, 
};

const outputFile = "./swagger.json"; // Output file for the generated Swagger documentation
const endpointsFiles = ["./routes/index.js"]; // Entry point for your API routes

// Generate swagger.json using the defined doc and endpoint files
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});
