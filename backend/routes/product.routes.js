import express from 'express';
import { body } from 'express-validator';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product (Admin only for now, but we'll keep it simple)
 * @access  Private
 */
router.post(
    '/',
    protect,
    [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('stock').isNumeric().withMessage('Stock must be a number')
    ],
    createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private
 */
router.put('/:id', protect, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private
 */
router.delete('/:id', protect, deleteProduct);

export default router;
