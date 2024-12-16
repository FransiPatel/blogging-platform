const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String, // Full content for the detailed page
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tags: [String], // Optional: Tags for categorization
    author: {
        type: String, // Optional: Blog author's name
        default: "Anonymous",
    },
});

module.exports = mongoose.model('Blog', blogSchema);
