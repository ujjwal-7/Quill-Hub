const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true

    },
    password: {
        required: true,
        type: String
    },
    profileImg: {
        type: String,
        default: '360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
    }
    
},  { timestamps: true });


userSchema.pre('save', async function (next) {

    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email: email});

    if(!user) {
        throw new Error("Wrong email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Wrong email or password");
    }

    return user;
}



const User = mongoose.model('User', userSchema)
module.exports = User;

