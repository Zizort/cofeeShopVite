import express from 'express';
// import products from '../data/products.js' // dummy data
import { getProducts, getProductsById } from '../controllers/productController.js';


const router = express.Router();

// /api/products
//instead of router.get('/', getProducts);
router.route('/').get(getProducts);


// /api/products/:id
router.route('/:id').get(getProductsById);

export default router;