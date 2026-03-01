import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../context/ToastContext';
import { useDebounce } from '../hooks/useDebounce';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const { error: showError } = useToast();

    // Debounce search query to avoid API calls on every keystroke
    const debouncedSearch = useDebounce(searchQuery, 500);

    const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Other'];

    useEffect(() => {
        fetchProducts();
    }, [category, sortBy, currentPage]);

    // Trigger search when debounced value changes
    useEffect(() => {
        if (debouncedSearch.trim()) {
            handleSearch(debouncedSearch);
        } else {
            fetchProducts();
        }
    }, [debouncedSearch]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let url = `/products?page=${currentPage}&`;
            if (category && category !== 'All') url += `category=${category}&`;
            if (sortBy) url += `sort=${sortBy}`;

            const { data } = await api.get(url);
            setProducts(data.products);
            setPagination(data.pagination || {});
        } catch (err) {
            showError(err.response?.data?.error || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const { data } = await api.get(`/search?q=${query}`);
            setProducts(data.products);
            setPagination({}); // Reset pagination for search results
        } catch (err) {
            showError(err.response?.data?.error || 'Search failed');
            fetchProducts();
        } finally {
            setLoading(false);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value.trim()) {
            fetchProducts();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Page Header */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="text-4xl font-bold mb-2">Shop</h1>
                    <p className="text-gray-600">Discover amazing products</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search products... (results appear as you type)"
                            className="input flex-1"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    fetchProducts();
                                }}
                                className="btn btn-outline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    {searchQuery && debouncedSearch !== searchQuery && (
                        <p className="text-sm text-gray-500 mt-1">Typing...</p>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Category Filter */}
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat === 'All' ? '' : cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="input"
                        >
                            <option value="">Newest First</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😕</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-4">{products.length} products found</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {(pagination.next || pagination.prev) && (
                            <div className="flex justify-center items-center gap-4 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    disabled={!pagination.prev}
                                    className="btn btn-outline disabled:opacity-50"
                                >
                                    ← Previous
                                </button>
                                <span className="text-gray-600 font-medium">
                                    Page {currentPage}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    disabled={!pagination.next}
                                    className="btn btn-outline disabled:opacity-50"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
