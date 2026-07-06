const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
         name:   { 
            type: String, 
            required: true 
        },
        email:  { 
            type: String, 
            required: true 
        },
        movie:  { 
            type: String, 
            required: true 
        },
        seats:  { 
            type: String, 
            required: true 
        },
        adults: { 
            type: Number, 
            default: 0 
        },
        kids:   { 
            type: Number, 
            default: 0 
        },
        total:  { 
            type: Number, 
            required: true 
        }
}, 
{
    timestamps: true,
  },);

module.exports = mongoose.model("Booking", bookingSchema);