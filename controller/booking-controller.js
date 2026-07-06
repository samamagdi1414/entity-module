const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ booked_at: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { name, email, movie, seats, adults, kids, total } = req.body;

    await Booking.create({
      name,
      email,
      movie,
      seats,
      adults: adults || 0,
      kids: kids || 0,
      total: total || 0
    });

    res.json({ 
        status: "success" });
  } catch (err) {
    res.status(400).json({ 
        status: "error", 
        message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }
    res.json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found"
      });
    }

    res.json(booking);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found"
      });
    }

    res.json({
      status: "success",
      booking
    });

  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message
    });
  }
};



module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};