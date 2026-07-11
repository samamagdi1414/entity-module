const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
      minlength: [1, "Movie title must be at least 1 character"],
      maxlength: [150, "Movie title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    rating: {
      type: String,
      required: [true, "Rating is required"],
      trim: true,
    },

    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },

    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },

    image_url: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["now_showing", "upcoming"],
        message: "Status must be now_showing or upcoming",
      },
      default: "now_showing",
    },

    is_featured: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;