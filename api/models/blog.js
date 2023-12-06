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
        default: 'https://firebasestorage.googleapis.com/v0/b/quillhub-88f01.appspot.com/o/blog-icon.jpg?alt=media&token=17bd47e4-3b36-48b5-b09c-59e08480b030'
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