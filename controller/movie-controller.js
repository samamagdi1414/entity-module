const Movie = require("../models/Movie");
const deleteUploadedFile = require("../utils/deleteUploadedFile");

function getUploadedFilename(image_url){
    if(!image_url || !image_url.startsWith("/uploads/movies/")) return null;
    return image_url.split("/uploads/movies/")[1];
}

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, description, rating, genre, duration, status, is_featured } = req.body;

    const image_url = req.file ? `/uploads/movies/${req.file.filename}` : req.body.image_url;

    if (!title || !description || !rating || !genre || !duration || !image_url) {
      if (req.file) {
        deleteUploadedFile("movies", req.file.filename);
      }
      return res.json({ status: "error", message: "Please fill in all fields." });
    }

    const newMovie = await Movie.create({
      title,
      description,
      rating,
      genre,
      duration,
      image_url,
      status: status || "now_showing",
      is_featured: is_featured === 'true' || is_featured === true
    });

    res.json({ status: "success", id: newMovie.id });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(404).json({ status: "error", message: "Not found" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { title, description, rating, genre, duration, status, is_featured } = req.body;
    const existingMovie = await Movie.findById(req.params.id);
    if(!existingMovie){
        return res.status(404).json({
            status: "error",
            message: "Not found"
        });
    }
    let image_url = existingMovie.image_url;
    if(req.file){
        const oldFilename = getUploadedFilename(existingMovie.image_url);
        if(oldFilename){
            deleteUploadedFile("movies", oldFilename);
        }
        image_url = `/uploads/movies/${req.file.filename}`;
    }

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, description, rating, genre, duration, image_url, status, is_featured: is_featured === 'true' || is_featured === true },
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }
    res.json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }
    
    const filename = getUploadedFilename(movie.image_url);
    if(filename){
        deleteUploadedFile("movies", filename);
    }

    res.json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie
};