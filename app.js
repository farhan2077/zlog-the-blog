const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3000;

const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const { findByIdAndDelete } = require("./models/blog");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true })); // accept form data
// app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// mongodb
    const dbURI = process.env.MONGODB_URI;
    mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// login logout route
app.get('*', checkUser);
app.use(authRoutes);

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "Error! Page not found" });
});
