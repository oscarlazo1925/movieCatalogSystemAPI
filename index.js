const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGODB_STRING, {
//   useNewUrlParser: true, //both can be omitted since this will be deprecated in the next version
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Atlas.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);


app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`API is now online on port ${process.env.PORT || 3000}`);
});

module.exports = { app, mongoose };