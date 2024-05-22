import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/userModel.js';
// import jwt from 'jsonwebtoken';
import generatToken from "../utils/generateToken.js";
import validator from "validator";



//  Auth user and get token
// POST /api/users/login
// access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email});// or just email,
    if (user && (await user.matchPassword(password))) {
        generatToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//  register user
// POST /api/users
// access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    if (!validator.isEmail(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }
    const userExists = await User.findOne({ email }); //email: email

    if (userExists) {
        res.status(400);//client error
        throw new Error('User already exists');
    }
    
    const user = await User.create({
        name,
        email,
        password
    });
// if user was created succesfully
    if (user) {
        generatToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//  logout user / clear coockie
// POST /api/users/logout
// access private
const logoutUser = asyncHandler(async (req, res) => {
    //to clear cookie we set it to empty string
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) //we want this to expire now
    });

    res.status(200).json({ message: 'Logged out successfully'});

});

//  get user profile
// GET /api/users/profile
// access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//  update user profile
// PUT /api/users/profile //no id needed because it in the token
// access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        // user.email = req.body.email || user.email;
        const newEmail = req.body.email;
        if (newEmail) {
            if (!validator.isEmail(newEmail)) {
                res.status(400);
                throw new Error('Invalid email format');
            }

            const emailExists = await User.findOne({ email: newEmail });

            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                res.status(400);
                throw new Error('Email is already registered');
            }

            user.email = newEmail;
        }
        user.name = req.body.name || user.name;


        if (req.body.password) {
            user.password = req.body.password;
        }
        // save it to databse and return it in this variable
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//  get all users
// GET /api/users
// access private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

//  get user by id
// GET /api/users/:id
// access private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

//  delete user
// DELETE /api/users/:id
// access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

//  update user
// Put /api/users/:id
// access private/Admin
const UpdateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    UpdateUser,
}


