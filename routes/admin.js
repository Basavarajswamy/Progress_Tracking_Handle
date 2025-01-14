const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const adminController = require("../controllers/adminController");

// Admin Dashboard: View all progress data
router.get(
  "/dashboard",
  authenticate,
  authorize(["Admin"]),
  adminController.getDashboard
);

// Admin: Manage users (e.g., view, promote, delete)
router.get(
  "/users",
  authenticate,
  authorize(["Admin"]),
  adminController.getAllUsers
);

router.post(
  "/promote",
  authenticate,
  authorize(["Admin"]),
  adminController.promoteUser
);
router.post(
  "/demote",
  authenticate,
  authorize(["Admin"]),
  adminController.demoteAdmin
);

module.exports = router;
