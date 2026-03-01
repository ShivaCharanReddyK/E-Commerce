import express from 'express';
import { body } from 'express-validator';
import {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
} from '../controllers/order.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post(
    '/',
    protect,
    [
        body('orderItems').isArray({ min: 1 }).withMessage('Order must have at least one item'),
        body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
        body('totalPrice').isNumeric().withMessage('Total price must be a number')
    ],
    createOrder
);

/**
 * @route   GET /api/orders/my-orders
 * @desc    Get logged-in user's orders
 * @access  Private
 */
router.get('/my-orders', protect, getMyOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', protect, getOrderById);

/**
 * @route   PUT /api/orders/:id/cancel
 * @desc    Cancel an order
 * @access  Private
 */
router.put('/:id/cancel', protect, cancelOrder);

export default router;
