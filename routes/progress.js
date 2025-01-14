//Only Authentication 👇 and logic is also written here(this is route file)🤢

// // routes/progress.js
// const express = require("express");
// const router = express.Router();
// const progressController = require("../controllers/progressController");
// const Progress = require("../models/Progress");

// const authenticate = require("../middleware/authenticate");

// // Render the progress form (authenticated)
// router.get("/add", authenticate, async (req, res) => {
//   try {
//     // Fetch all tasks for the logged-in user
//     const progresses = await Progress.find({ user: req.userId });

//     // Categorize tasks
//     const completedTasks = progresses.filter(task => task.completed);
//     const notCompletedTasks = progresses.filter(task => !task.completed);

//     // Calculate percentage
//     const totalTasks = progresses.length;
//     const completedPercentage = totalTasks > 0
//       ? Math.round((completedTasks.length / totalTasks) * 100)
//       : 0;

//     // Render the progress page with categorized data and percentage
//     res.render("progress", {
//       completedTasks,
//       notCompletedTasks,
//       completedPercentage,
//     });
//   } catch (error) {
//     console.error("Error fetching progress:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // POST route to add progress and // Handle form submission (authenticated)
// router.post("/add", authenticate, progressController.addProgress);

// module.exports = router;

//Only Authentication
const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Routes
router.get(
  "/all",
  authenticate,
  authorize(["Admin", "User"]), //
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

module.exports = router;
