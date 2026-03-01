import Product from '../models/Product.model.js';

/**
 * @desc    Search products using hybrid search (text search + partial matching)
 * @route   GET /api/search?q=query&category=Electronics&minPrice=100&maxPrice=1000&sort=price
 * @access  Public
 */
export const searchProducts = async (req, res, next) => {
    try {
        const { q, category, minPrice, maxPrice, sort = 'relevance' } = req.query;

        let products = [];
        let useTextSearch = false;

        // Build base filters (category, price)
        const baseFilter = {};

        if (category && category !== 'All') {
            baseFilter.category = category;
        }

        if (minPrice || maxPrice) {
            baseFilter.price = {};
            if (minPrice) baseFilter.price.$gte = Number(minPrice);
            if (maxPrice) baseFilter.price.$lte = Number(maxPrice);
        }

        // If search query exists, use hybrid search
        if (q && q.trim()) {
            const searchTerm = q.trim();

            // Try text search first (for complete words)
            try {
                const textSearchQuery = {
                    ...baseFilter,
                    $text: { $search: searchTerm }
                };

                const textResults = await Product.find(textSearchQuery)
                    .select({ score: { $meta: 'textScore' } })
                    .sort({ score: { $meta: 'textScore' }, rating: -1 })
                    .limit(50)
                    .lean();

                if (textResults.length > 0) {
                    products = textResults;
                    useTextSearch = true;
                }
            } catch (textError) {
                console.log('Text search not applicable, using regex');
            }

            // If text search returns no results or fails, use partial matching (regex)
            if (products.length === 0) {
                const regexQuery = {
                    ...baseFilter,
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { description: { $regex: searchTerm, $options: 'i' } }
                    ]
                };

                products = await Product.find(regexQuery)
                    .sort({ rating: -1, numReviews: -1 })
                    .limit(50)
                    .select('-__v')
                    .lean();
            }
        } else {
            // No search query, just apply filters
            products = await Product.find(baseFilter)
                .sort({ rating: -1, numReviews: -1 })
                .limit(50)
                .select('-__v')
                .lean();
        }

        // Apply additional sorting if requested
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

        // Add search metadata
        const response = {
            success: true,
            count: products.length,
            products,
            searchInfo: {
                query: q || 'all',
                category: category || 'all',
                priceRange: {
                    min: minPrice ? Number(minPrice) : null,
                    max: maxPrice ? Number(maxPrice) : null
                },
                sort: sort || 'relevance',
                searchMethod: useTextSearch ? 'text-search' : (q ? 'partial-match' : 'filter-only')
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Search failed',
            message: error.message
        });
    }
};
