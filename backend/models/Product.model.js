import mongoose from 'mongoose';

/**
 * Product Schema - Defines the structure of product data
 */
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Other']
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300'
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5']
    },
    numReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create text index for efficient searching
ProductSchema.index({ name: 'text', description: 'text' });

// Create compound index for category and price filtering
ProductSchema.index({ category: 1, price: 1, rating: -1 });

export default mongoose.model('Product', ProductSchema);
