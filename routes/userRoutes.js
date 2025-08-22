//[SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/usersC");
const auth = require("../auth");
//Google Login

const { verify, isLoggedIn } = auth;

//[SECTION] Routing Component
const router = express.Router();


//[SECTION] Route for user registration
router.post("/register", userController.register);

//[SECTION] Route for user authentication
router.post("/login", userController.login);

//[Section] Activity: Route for retrieving user details
router.get("/details", verify, userController.getProfile);

//[SECTION] Route for logging out of the application
// The logout route does only logs the user out of the application and destroys the session, but upon trying to access the "/google" route again, the user is no longer prompted to choose an email to login if the "prompt : "select_account" option is not added to the "/google" route. This is expected behaviour because the Google OAuth 2, already allows the user access to the "Course Booking API" because the user has been authorized to access the app.
// Navigate to the Google App Permissions to delete all connections with the app (https://myaccount.google.com/connections)
router.get("/logout", (req, res) => {
  // Destroys the session that stores the Google OAuth Client credentials
  // Allows for release of resources when the account information is no longer needed in the browser
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");
        // Redirects the page to "http://localhost:4000" route to visual redirection in frontend.
        // Can be replaced in the future with the "home" page route for the frontend.
        res.redirect("/");
      });
    }
  });
});

//[SECTION] Export Route System
module.exports = router;
