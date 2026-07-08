const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
   name: {
    type: String,
    required: true,
    trim: true,
    match: [/^[A-Za-z\s]+$/, "Name must contain only letters"]
},

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    phone: {
    type: String,
    required: true,
    match: [/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"]
},

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);