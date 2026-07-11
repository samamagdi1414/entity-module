const bookingController = require("../controller/booking-controller");
const authenticate = require("../middleware/authentication-middleware");
const restrictTo = require("../middleware/authorization-middlleware");


const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(authenticate,restrictTo("admin"),bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route("/:id")
  .get(authenticate,restrictTo("admin"),bookingController.getBookingById)
  .patch(authenticate,restrictTo("admin"),bookingController.updateBooking)
  .delete(authenticate,restrictTo("admin"),bookingController.deleteBooking);

module.exports = router;