const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Check for token in cookies
  if (!token) {
    console.log("Token received:", token); // Log the token
    console.log("No token found, redirecting to login");
    return res.redirect("/auth/login"); // Redirect to login page if not logged in
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role; // Role must be extracted here
    console.log(
      "Token verified successfully. User ID:",
      decoded.id,
      "Role:",
      decoded.role
    );
    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(403).send("Invalid or expired token. Please log in again.");
    res.redirect("/auth/login"); // Redirect if token is invalid or expired
  }
};

module.exports = authenticate;
