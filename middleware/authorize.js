// When a user logs in, their role (e.g., "Admin" or "User") is fetched
// from the database along with their other details.
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).send("Access Denied: You do not have permission!");
    }
    console.log("User Role in Authorization Middleware:", req.userRole); // Debugging
    next();
  };
};

module.exports = authorize;
