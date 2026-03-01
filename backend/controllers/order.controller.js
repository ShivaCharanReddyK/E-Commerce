import { validationResult } from 'express-validator';
import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
    const session = await Order.startSession();
    session.startTransaction();

    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { orderItems, shippingAddress, totalPrice } = req.body;

        // Validate stock availability for each item
        for (const item of orderItems) {
            const product = await Product.findById(item.product).session(session);

            if (!product) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    error: `Product not found: ${item.name}`
                });
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    success: false,
                    error: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }
        }

        // Decrement stock for each item
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: -item.quantity } },
                { session }
            );
        }

        // Create the order
        const order = await Order.create([{
            user: req.user.id,
            orderItems,
            shippingAddress,
            totalPrice,
            status: 'Pending'
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            order: order[0]
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('orderItems.product', 'name image')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'orderItems.product',
            'name image price'
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        // Make sure user owns this order
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to view this order'
            });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Cancel an order and restore stock
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
export const cancelOrder = async (req, res, next) => {
    const session = await Order.startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(req.params.id).session(session);

        if (!order) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        // Make sure user owns this order
        if (order.user.toString() !== req.user.id) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                success: false,
                error: 'Not authorized to cancel this order'
            });
        }

        // Check if order can be cancelled
        if (order.status === 'Shipped' || order.status === 'Delivered' || order.status === 'Cancelled') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                error: `Order cannot be cancelled. Current status: ${order.status}`
            });
        }

        // Restore stock for each item
        for (const item of order.orderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: item.quantity } },
                { session }
            );
        }

        // Update order status
        order.status = 'Cancelled';
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            order
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};