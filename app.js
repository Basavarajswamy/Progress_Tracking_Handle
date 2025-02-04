var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var progressRouter = require("./routes/progress");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//mongodb conn
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected successfully- app.js"))
  .catch((err) => console.error("MongoDB connection error(app.js):", err));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/progress", progressRouter);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);


// mention the type of request - GET , POST etc..
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
