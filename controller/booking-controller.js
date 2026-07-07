const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    console.log("req.query =", req.query);
    console.log("filter =", filter);

    const bookings = await Booking.find(filter)
    .sort(req.query.sort || "-createdAt")
    .skip(skip)
    .limit(limit);

    const totalItems = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    res.json({
    currentPage: page,
    itemsPerPage: limit,
    totalItems,
    totalPages,
    bookings
});

  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message
    });
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

function buildFilter(query) {
    const filtered = {};

    for (let key in query) {
        if (key === "page" || key === "limit" || key === "sort") {
    continue;
}
        const value = query[key];

        const match = key.match(/^(.+)\[(gte|gt|lte|lt)]$/);

        if (match) {
            const field = match[1];
            const operator = `$${match[2]}`;

            if (!filtered[field]) {
                filtered[field] = {};
            }

            filtered[field][operator] = Number(value);

        } else {
            filtered[key] = {
                $regex: value,
                $options: "i"
            };
        }
    }

    return filtered;
};


module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};