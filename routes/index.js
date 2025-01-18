var express = require("express");
var router = express.Router();
var authenticate = require("../middleware/authenticate");
var progressController = require("../controllers/progressController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Progress Tracker", userRole: req.userRole });
});
// I waste so many hours here, It doesn't check the condition , irrespective of the condition it renders the page.

// router.get("/progress/add", authenticate, function (req, res, next) {
//   res.redirect("/auth/login");
// });

/* Redirect to login if not authenticated, else render progress page */
router.get("/progress/add", authenticate, progressController.getUserProgress);

module.exports = router;
