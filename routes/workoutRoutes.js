// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutC");

const auth = require("../auth");

const { verify, verifyAdmin } = auth;

router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);
router.patch("/completeWorkoutStatus/:id", verify, workoutController.completeWorkoutStatus);

module.exports = router;
