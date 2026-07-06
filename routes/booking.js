const bookingController = require("../controller/booking-controller");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route("/:id")
  .get(bookingController.getBookingById)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;