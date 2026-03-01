import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

/**
 * ProductCard - Reusable component for displaying product
 */
const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { success } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        success(`Added ${product.name} to cart!`);
    };

    // Fallback image for broken images
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
    };

    return (
        <div className="card group animate-fade-in">
            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
                <div className="relative overflow-hidden h-64 bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                {/* Category Badge */}
                <span className="badge bg-primary-100 text-primary-700">
                    {product.category}
                </span>

                {/* Product Name */}
                <Link to={`/product/${product._id}`}>
                    <h3 className="mt-2 font-semibold text-lg text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                        {'★'.repeat(Math.round(product.rating))}
                        {'☆'.repeat(5 - Math.round(product.rating))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        ({product.numReviews || 0})
                    </span>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="btn btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                    </button>
                </div>

                {/* Stock Info */}
                {product.stock > 0 && product.stock <= 5 && (
                    <p className="mt-2 text-sm text-orange-600 font-semibold">
                        Only {product.stock} left!
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
