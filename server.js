require("dotenv").config();

const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authentication");

const connectDB = require("./config/db");
const bookingRoutes = require("./routes/booking");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.post("/api/book", (req, res, next) => {
  req.url = "/";
  bookingRoutes.handle(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Cinema server running at http://localhost:${PORT}`);
});