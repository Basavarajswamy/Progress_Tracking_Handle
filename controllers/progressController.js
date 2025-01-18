  const Progress = require("../models/Progress");

exports.addProgress = async (req, res) => {
  try {
    const { task } = req.body; // Extract task from the form submission
    const completed = req.body.completed === "on"; // Convert checkbox value to boolean

    // Use the user ID from the authenticate middleware
    const newProgress = new Progress({
      user: req.userId,
      task,
      completed,
    });

    await newProgress.save();

    // Redirect back to the form with a success message (optional)
    res.redirect("/progress/add");
  } catch (error) {
    console.error("Error adding progress:", error);
    res.status(500).send("Failed to add progress");
  }
};

exports.getAllProgress = async (req, res) => {
  try {
    const progresses =
      req.userRole === "Admin"
        ? await Progress.find() // Admins can view all progress
        : await Progress.find({ user: req.userId }); // Users see only their data

    res.render("history", { progresses, userRole: req.userRole });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).send("Failed to fetch progress");
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const progresses = await Progress.find({ user: req.userId });

    const completedTasks = progresses.filter((task) => task.completed);
    const notCompletedTasks = progresses.filter((task) => !task.completed);

    const totalTasks = progresses.length;
    const completedPercentage =
      totalTasks > 0
        ? Math.round((completedTasks.length / totalTasks) * 100)
        : 0;

    res.render("progress", {
      completedTasks,
      notCompletedTasks,
      completedPercentage,
      userRole: req.userRole, // Pass userRole to the view
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete user's progress
exports.deleteProgress = async (req, res) => {
  try {
    const { id } = req.params; // Get progress ID from URL parameters

    // Find the progress record
    const progress = await Progress.findById(id);

    // Check if the progress record exists and if the user is authorized to delete it
    if (
      !progress ||
      (req.userRole !== "Admin" && progress.user.toString() !== req.userId)
    ) {
      return res.status(404).send("Progress record not found or unauthorized");
    }

    // Delete the progress record
    await Progress.findByIdAndDelete(id);

    // Fetch updated progress records for the user
    const progresses = await Progress.find({ user: req.userId });

    // Separate completed and not completed tasks
    const completedTasks = progresses.filter((task) => task.completed);
    const notCompletedTasks = progresses.filter((task) => !task.completed);

    // Calculate completion percentage
    const totalTasks = progresses.length;
    const completedPercentage =
      totalTasks > 0
        ? Math.round((completedTasks.length / totalTasks) * 100)
        : 0;

    // Render the progress page with updated data
    res.render("progress", {
      completedTasks,
      notCompletedTasks,
      completedPercentage,
      userRole: req.userRole, // Pass userRole to the view
    });
  } catch (error) {
    console.error("Error deleting progress:", error);
    res.status(500).send("Failed to delete progress");
  }
};
