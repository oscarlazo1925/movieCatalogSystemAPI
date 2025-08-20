// controllers/movieController.js
const Movie = require("../models/MoviesM");

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  console.log(req.params.id);
  try {
    const { id } = req.params; // extract param
    const movie = await Movie.findById(id).populate(
      "comments.userId",
      "name email"
    );
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params; // 👈 extract id param from URL

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // validate before update
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie updated successfully", updatedMovie });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params; // 👈 extract id from params

    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a comment to a movie
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params; // 👈 extract movie id from params

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // push new comment { user, text }
    movie.comments.push(req.body);
    await movie.save();

    res.status(201).json({"message":"comment addedd succesfully","updatedMovie":movie});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getComments = async (req, res) => {
  try {
    const { id } = req.params; // 👈 extract movie ID from params

    const movie = await Movie.findById(id).populate("comments.userId", "isAdmin email");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie.comments); // return only comments
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
