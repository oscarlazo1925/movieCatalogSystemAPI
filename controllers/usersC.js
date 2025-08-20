//[SECTION] Dependencies and Modules
const bcrypt = require("bcrypt");
const User = require("../models/UsersM");
const auth = require("../auth");

const { errorHandler } = auth;

const checkEmailExists = (email) => {
  if (!email.includes("@")) {
    return Promise.reject({ status: 400, message: "Invalid email format" });
  }

  return User.findOne({ email }).then((user) => {
    if (user) {
      return Promise.reject({ status: 409, message: "Duplicate email found" });
    }
    return true; // no duplicate
  });
};

module.exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email.includes("@")) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .send({ message: "Password must be atleast 8 characters long" });
  }

  checkEmailExists(email)
    .then(() => {
      let newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10),
      });

      return newUser.save();
    })
    .then(() =>
      res.status(201).send({
        message: "Registered Successfully",
      })
    )
    .catch((err) => {
      res.status(err.status || 500).send({ message: err.message });
    });
};

module.exports.login = (req, res) => {
  if (req.body.email.includes("@")) {
    return User.findOne({ email: req.body.email })
      .then((result) => {
        if (result == null) {
          // if the email is not found, send a message 'No email found'.
          return res.status(404).send({ message: "No email found" });
        } else {
          const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            result.password
          );
          if (isPasswordCorrect) {
            // if all needed requirements are achieved, send a success message 'User logged in successfully' and return the access token.
            return res.status(200).send({
              access: auth.createAccessToken(result),
            });
          } else {
            // if the email and password is incorrect, send a message 'Incorrect email or password'.
            return res
              .status(401)
              .send({ message: "Incorrect email or password" });
          }
        }
      })
      .catch((error) => errorHandler(error, req, res));
  } else {
    // if the email used in not in the right format, send a message 'Invalid email format'.
    return res.status(400).send({ message: "Invalid email format" });
  }
};

module.exports.getProfile = (req, res) => {
  return User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        // if the user has invalid token, send a message 'invalid signature'.
        return res.status(404).send({ message: "invalid signature" });
      } else {
        // if the user is found, return the user.
        user.password = "";
        return res.status(200).send(user);
      }
    })
    .catch((error) => errorHandler(error, req, res));
};
