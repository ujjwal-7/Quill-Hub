const express = require("express");
const multer = require('multer');
const Blog = require("../models/blog");
const checkForAthentication = require("../middlewares/checkForAuthentication");
const User = require("../models/user");
const router = express.Router();

router.post('/create', checkForAthentication, async (req, res) => {

    const {title, content, coverImg} = req.body;


    const blog = new Blog({
        title,
        content,
        author: req.user.id,
        coverImg
    });


    try {

        const data = await blog.save();
        res.status(200).json(data);

    } catch(error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/allBlogs', async (req, res) => {

    const page = parseInt(req.query.page) || 1;

    try {

        const totalItems = await Blog.countDocuments();
        const totalPages = Math.ceil(totalItems/10);
        const blogs = await Blog.find().populate({path: 'author', select: ['name', 'profileImg']}).sort({createdAt: -1}).skip((page - 1)*10).limit(10).exec();

        res.status(200).json({blogs, totalPages});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


router.get('/search', async (req, res) => {

    const searchQuery = req.query.searchQuery;
    const page = parseInt(req.query.page) || 1;

    try {

        if(!searchQuery) {
            return res.status(400).json({ error: 'Query parameter is required for search.' });
        }

        const searchConditions = {};
        searchConditions.$or = [

            { title: { $regex: searchQuery, $options: 'i' } },
            { content: { $regex: searchQuery, $options: 'i' } },
        ];

        const totalItems = await Blog.countDocuments(searchConditions);
        const totalPages = Math.ceil(totalItems / 10);
        const blogs = await Blog.find(searchConditions).populate({path: 'author', select: ['name', 'profileImg']}).sort({createdAt: -1}).skip((page - 1) * 10).limit(10).exec();

        res.status(200).json({blogs, totalPages});

      } catch (error) {
        
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const blog = await Blog.findById(id).populate({path: 'author', select: ['name', 'profileImg']});
        if(!blog) {
            return res.status(404).json({message: "No such blog exists"});
        }
        blog.views += 1;
        const data = await blog.save();
        res.status(200).json(data);

    } catch(error) {
        
        res.status(400).json({message: error.message});
    }
});

router.get('/myBlogs/:id', checkForAthentication, async (req, res) => {

    const id = req.params.id;
    const userId = req.user.id;

    if(id !== userId) {
        return res.status(404).json({message: "Unauthorized user"});
    }

    try {

        const blogs = await Blog.find({author: id}).exec();
        res.status(200).json(blogs);

    } catch(e) {
        console.log(e);
    }
});

router.put('/update/:id', checkForAthentication, async (req, res) => {

    const id = req.params.id;
    const userId = req.user.id;

    try {

        const {title, content, coverImg} = req.body;
        const blog = await Blog.findById(id);

        if(!blog) {
            return res.status(404).json({message: "No such blog exists"});
        }

        if(userId !== blog.author.toString()) {
            return res.status(404).json({message: "Unauthorized: You are not the author of this post"});
        }

        blog.title = title;
        blog.content = content;
        if(coverImg) {
            blog.coverImg = coverImg;
        }
       
        blog.save();
        res.status(200).json(blog);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/delete/:id', checkForAthentication, async (req, res) => {

    const id = req.params.id;
    const userId = req.user.id;
    
    try {
        
        const blog = await Blog.findById(id);

        if(!blog) {
            return res.status(404).json({message: "No such blog exists"});
        }

        if(userId !== blog.author.toString()) {
            return res.status(404).json({message: "Unauthorized: You are not the author of this post"});
        }

        await Blog.findByIdAndDelete(id);

        res.status(200).json({message: "Blog has been deleted!"});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
   
});



module.exports = router;