import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productModel.js';

// fetch all product
// GET /api/products
// access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // throw new Error('some Error');
    res.json(products);
});

// fetch a product
// GET /api/products/:id
// access public
const getProductsById = asyncHandler(async (req, res) => {
    //check if id is valid to throw our own custon error in case it is invalid
    const product = await Product.findById(req.params.id);

    if (product) {

        return res.json(product);
    } else {
        // this part never runs we need to check before if id os invalid then throw our own custom error
        //because if we use an invalid id, mongoose will throw its own error before our custom one
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getProducts, getProductsById };