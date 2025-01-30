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
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles);
