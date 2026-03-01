import { validationResult } from 'express-validator';
import Product from '../models/Product.model.js';

/**
 * @desc    Get all products with optional filtering and searching
 * @route   GET /api/products?search=query&category=Electronics&minPrice=100&maxPrice=1000&sort=price-asc
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;

        let products = [];
        let useTextSearch = false;

        // Build base filter
        let baseFilter = {};

        // Category filter
        if (category && category !== 'All') {
            baseFilter.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            baseFilter.price = {};
            if (minPrice) baseFilter.price.$gte = Number(minPrice);
            if (maxPrice) baseFilter.price.$lte = Number(maxPrice);
        }

        // Search logic
        if (search && search.trim()) {
            const searchTerm = search.trim();

            // Try text search first
            try {
                const textQuery = {
                    ...baseFilter,
                    $text: { $search: searchTerm }
                };

                const textResults = await Product.find(textQuery)
                    .select({ score: { $meta: 'textScore' } })
                    .sort({ score: { $meta: 'textScore' }, rating: -1 })
                    .lean();

                if (textResults.length > 0) {
                    products = textResults;
                    useTextSearch = true;
                }
            } catch (error) {
                // Text search failed, will use regex
            }

            // Fallback to partial matching if text search returns nothing
            if (products.length === 0) {
                const regexQuery = {
                    ...baseFilter,
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { description: { $regex: searchTerm, $options: 'i' } }
                    ]
                };

                products = await Product.find(regexQuery)
                    .sort({ rating: -1 })
                    .select('-__v')
                    .lean();
            }
        } else {
            // No search, just filters
            products = await Product.find(baseFilter)
                .sort({ rating: -1 })
                .select('-__v')
                .lean();
        }

        // Apply sorting
        if (sort && sort !== 'relevance') {
            let sortOption = {};
            switch (sort) {
                case 'price-asc':
                    sortOption = { price: 1 };
                    break;
                case 'price-desc':
                    sortOption = { price: -1 };
                    break;
                case 'rating':
                    sortOption = { rating: -1, numReviews: -1 };
                    break;
                case 'newest':
                    sortOption = { createdAt: -1 };
                    break;
            }

            if (Object.keys(sortOption).length > 0) {
                products.sort((a, b) => {
                    for (const [key, order] of Object.entries(sortOption)) {
                        if (a[key] !== b[key]) {
                            return order === 1 ? a[key] - b[key] : b[key] - a[key];
                        }
                    }
                    return 0;
                });
            }
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = products.length;

        // Slice products for pagination
        const paginatedProducts = products.slice(startIndex, endIndex);

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: paginatedProducts.length,
            total,
            pagination,
            products: paginatedProducts
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private
 */
export const createProduct = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private
 */
export const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Product deleted'
        });
    } catch (error) {
        next(error);
    }
};
