import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //read the jwt from the cookie
    token = req.cookies.jwt; //becayse cookie is called jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get the payload from decoded(userid)
            //look in the database for the user with the same id
            //put them inside req.user except for their password
            //put in inside the request
            req.user= await User.findById(decoded.userId).select('-password');
            next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});

// Admin middelware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) { //if isAdmin === true
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin')
    }
};

export { protect, admin };