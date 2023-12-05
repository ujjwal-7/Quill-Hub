const express = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const TokenBlacklist = require('../models/tokenBlacklist');
const checkForAthentication = require("../middlewares/checkForAuthentication");
const router = express.Router();


router.get('/:id', checkForAthentication, async (req, res) => {

    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if(!user) {
            res.status(404).json({message: "No user found"});
        }
        res.status(200).json(user);

    } catch(error) {
        res.status(400).json({message: error.message});
    }
    
});

router.patch('/update/:id', checkForAthentication, async (req, res) => {

    const id = req.params.id;
    const {name, profileImg} = req.body;
    
    try {

        if(id !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, {$set: {name, profileImg}}, {new: true});
        res.status(200).json(updatedUser);

    } catch(error) {
        res.status(400).json({message: error.message});
    }

});


router.delete('/delete/:id', checkForAthentication, async (req, res) => {

    const id = req.params.id;

    try {
        
        if(id !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        await Blog.deleteMany({author: id});
        await User.findByIdAndDelete(id);

        const bearerHeader = req.headers["authorization"];

        if(typeof bearerHeader === undefined) {
            throw new Error();
        }
        
        const bearer = bearerHeader.split(' ');
        const blackListedToken = new TokenBlacklist({token: bearer[1]});

        await blackListedToken.save();
        
        res.status(200).json({message: "User has been deleted!"});

    } catch(error) {
         res.status(400).json({message: error});
    }
});


router.post('/logout', checkForAthentication, async (req, res) => {
   
    try {
        const bearerHeader = req.headers["authorization"];

        if(typeof bearerHeader === undefined) {
            throw new Error();
        }
        
        const bearer = bearerHeader.split(' ');
        const blackListedToken = new TokenBlacklist({token: bearer[1]});

        await blackListedToken.save();
        res.status(200).json({message: "User has been loggeg out!"});

    } catch(e) {
        res.status(500).json({message: "Internal server error"})
    }

});

module.exports = router;