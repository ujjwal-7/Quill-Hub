const express = require('express');
const mongoose = require('mongoose');
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

