const { Mongoose } = require("mongoose");
const Blog = require("../models/blog");

// blog_index - get all blogs and inject it into index views
const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All blogs", blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

// blog_details
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("blogs/details", {
                blog: result,
                title: "Blog Details",
            });
        })
        .catch((err) => {
            res.status(404).render("404", { title: "Blog not found" });
        });
};

// blog_create_get - send back the actual form
const blog_create_get = (req, res) => {
    res.render("blogs/create", { title: "Create New Blog" });
};

// blog_create_post - add the new blog - DESTRUCTURED
const blog_create_post = (req, res) => {
    // const blog = new Blog(req.body);
    const blog = new Blog({ title: req.body.title, body: req.body.body });
    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err);
        });
};

// blog_delete
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
};
