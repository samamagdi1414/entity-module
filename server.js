require("dotenv").config();

const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authentication");
const { errorHandler, notFoundHandler } = require("./middleware/error-handler");

const connectDB = require("./config/db");
const bookingRoutes = require("./routes/booking");
const movieRoutes = require("./routes/movie-route");
const userRoutes = require("./routes/user-route");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

connectDB();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:4200", // your Angular dev server
  credentials: true
}));


app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

app.post("/api/book", (req, res, next) => {
  req.url = "/";
  bookingRoutes.handle(req, res, next);
});


app.use(notFoundHandler); // catches any URL that doesn't match a route
app.use(errorHandler);    // catches any error thrown/passed to next() anywhere above

app.listen(PORT, () => {
  console.log(`Cinema server running at http://localhost:${PORT}`);
});