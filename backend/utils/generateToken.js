import jwt from 'jsonwebtoken';

const generatToken = (res, userId) => {
    const token = jwt.sign({ userId: userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    //set jwt as http only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', //only true in production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
}

export default generatToken;