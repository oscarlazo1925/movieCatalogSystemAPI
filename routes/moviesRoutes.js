// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviesC");

const auth = require("../auth");

const { verify, verifyAdmin } = auth;

// CRUD
router.post("/addMovie", verify, verifyAdmin, movieController.createMovie);
router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:id", movieController.getMovieById);
router.put(
  "/updateMovie/:id",
  verify,
  verifyAdmin,
  movieController.updateMovie
);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);

// Comments
router.patch("/addComment/:id",verify, movieController.addComment);
router.get("/getComments/:id",verify, movieController.getComments);

module.exports = router;
