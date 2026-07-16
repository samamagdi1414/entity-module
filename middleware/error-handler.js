
function errorHandler(err, req, res, next) {
  console.error(err); // always log the real error server-side for debugging
 
  // Malformed JSON in the request body (express.json() throws this)
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      message: "Invalid JSON in request body"
    });
  }
 
  // Invalid MongoDB ObjectId format (e.g. /api/movies/not-a-real-id)
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: `Invalid ${err.path}: ${err.value}`
    });
  }
 
  // Mongoose schema validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: "error",
      message: messages.join(", ")
    });
  }
 
  // JWT errors that slipped through (shouldn't normally reach here, since
  // authentication-middleware already catches these, but just in case)
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token"
    });
  }
 
  // Anything else — generic 500, but never leak raw stack traces to the client
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Something went wrong on the server"
  });
}
 
// Catch-all for any URL that doesn't match a defined route
function notFoundHandler(req, res) {
  res.status(404).json({
    status: "error",
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}
 
module.exports = { errorHandler, notFoundHandler };