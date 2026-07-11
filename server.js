require("dotenv").config();

const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authentication");

const connectDB = require("./config/db");
const bookingRoutes = require("./routes/booking");
const movieRoutes = require("./routes/movie-route");
const userRoutes = require("./routes/user-route");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());


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

app.listen(PORT, () => {
  console.log(`Cinema server running at http://localhost:${PORT}`);
});