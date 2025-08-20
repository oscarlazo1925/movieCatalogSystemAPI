const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_STRING, {
  useNewUrlParser: true, //both can be omitted since this will be deprecated in the next version
  useUnifiedTopology: true,
});


const userRoutes = require("./routes/usersRoutes");
const movieRoutes = require("./routes/moviesRoutes");

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);


app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`API is now online on port ${process.env.PORT || 3000}`);
});
