const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Routes
router.get(
  "/all",
  authenticate,
  authorize(["Admin", "User"]),

  progressController.getAllProgress
);
router.post(
  "/all",
  authenticate,
  authorize(["Admin", "User"]),

  progressController.getAllProgress
);

router.get(
  "/add",
  authenticate,
  authorize(["Admin", "User"]),

  progressController.getUserProgress
);

router.post(
  "/add",
  authenticate,
  authorize(["Admin", "User"]),

  progressController.addProgress
);

// Delete Route
router.post(
  "/delete/:id",
  authenticate,
  authorize(["Admin", "User"]),

  progressController.deleteProgress
);

module.exports = router;
