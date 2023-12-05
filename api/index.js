const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {console.log("Connected")}).catch((e) => {
    console.log(e)
});

const app = express();
const port = process.env.PORT || 8000; 
const publicDirectoryPath = path.join(__dirname, 'public');

app.use(express.static(publicDirectoryPath));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);

const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"./public/uploads");
    },
    filename:(req,file,fn)=>{
        fn(null, req.body.img);
    }
});

const upload=multer(
    {storage:storage},
    {limits: { fileSize: 5 * 1024 * 1024 }}
);

app.post("/api/upload",upload.single("file"),(req,res)=>{

    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

