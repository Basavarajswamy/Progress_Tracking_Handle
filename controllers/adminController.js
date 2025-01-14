const Progress = require("../models/Progress");
const User = require("../models/User");
// Fetch and display all progress data.
exports.getDashboard = async (req, res) => {
  try {
    const progresses = await Progress.find();
    res.render("admin-dashboard", { progresses });
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    res.status(500).render("error", { message: "Failed to load dashboard" });
  }
};

// Fetch and display all userrrs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin-users", { users });
  } catch (error) {
    console.error("Error fetching uuserssers:", error);
    res.status(500).render("error", { message: "Failed to load users" });
  }
};
//Promote user to admin
exports.promoteUser = async (req, res) => {
  try {
    const { email } = req.body; // Email of the user to promote
    const updatedUser = await User.updateOne(
      { email },
      { $set: { role: "Admin" } }
    );

    if (updatedUser.modifiedCount === 0) {
      return res.status(404).render("error", { message: "User not found" });
    }

    res.redirect("/admin/users"); // Redirect to user management page
  } catch (error) {
    console.error("Error promoting user:", error);
    res.status(500).render("error", { message: "Failed to promote user" });
  }
};

// Remove admin
exports.demoteAdmin = async (req, res) => {
  try {
    const { email } = req.body; // Email of the user to promote
    const updatedUser = await User.updateOne(
      { email },
      { $set: { role: "User" } }
    );

    if (updatedUser.modifiedCount === 0) {
      return res.status(404).render("error", { message: "User not found" });
    }   

    res.redirect("/admin/users"); // Redirect to user management page
  } catch (error) {
    console.error("Error demoting  admin:", error);
    res.status(500).render("error", { message: "Failed to demote admin" });
  }
};