const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(err.stack); // Only logs errors in development mode
    }

  const statusCode = err.status || 500;

  // If it's a validation error, format it properly
  if (err.details) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.details.map((e) => e.msg), // Extract error messages
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};

module.exports = errorHandler;
