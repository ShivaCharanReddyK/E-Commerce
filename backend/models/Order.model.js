import mongoose from 'mongoose';

/**
 * Order Schema - Stores customer orders
 */
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', OrderSchema);
