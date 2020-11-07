const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema ==> describes the types of data structure
const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Model ==> wraps around the schema and provides us with a interface to work with
// inside model the name should be singular (reduces other tasks)
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
