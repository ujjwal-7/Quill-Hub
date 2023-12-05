const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },  
    content: {
        required: true,
        type: String
    },
    coverImg: {
        type: String,
        default: 'blog-icon.jpg'
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    views : {
        type: Number,
        default: 0
    }
    
},  { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;