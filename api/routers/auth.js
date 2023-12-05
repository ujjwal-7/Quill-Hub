const express = require("express");
const multer = require('multer');
const User = require("../models/user");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post('/register', async (req, res) => {

    const {name, email, password, profileImg} = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const user = new User({
            name,
            email,
            password,
            profileImg
        });

        const data = await user.save();
        
        res.status(200).json({
            id: data._id,
            name: data.name,
            email: data.email
        });
        

    } catch(error) {
        
        res.status(400).json({message: error.message})
    }
   
})

router.post('/login', async (req, res) => {

    const {email, password} = req.body;
    
    try {

        const user = await User.findByCredentials(email, password);
        const token = generateAuthToken(user);
        res.status(200).json({
            id: user._id, 
            name: user.name, 
            profileImg: user.profileImg, 
            token
        });
        
    } catch(error) {
       
        res.status(400).json({message: error.message});
    }
})

module.exports = router;