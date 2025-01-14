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
    // Ensure all entries have a user field
    // const completeProgresses = progresses.map((progress) => ({
    //   ...progress,
    //   user: progress.user || "Unknown", // Fallback for missing user field
    // }));
    res.status(200).json(progresses);
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
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    res.status(500).send("Internal Server Error");
  }
};
