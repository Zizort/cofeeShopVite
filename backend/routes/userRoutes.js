import express from 'express';
// import products from '../data/products.js' // dummy data
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    UpdateUser,
 } from '../controllers/userController.js';
 import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router();
// /api/users

router.route('/').post(registerUser).get(protect, admin, getUsers);


router.post('/logout', logoutUser);
router.post('/auth', authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, UpdateUser);

export default router;