import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data.product);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    if (loading) return <LoadingSpinner fullScreen />;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
                    <button onClick={() => navigate('/shop')} className="btn btn-primary mt-4">
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Product Image */}
                        <div className="animate-fade-in">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="animate-slide-up">
                            {/* Category Badge */}
                            <span className="badge bg-primary-100 text-primary-700">
                                {product.category}
                            </span>

                            {/* Product Name */}
                            <h1 className="text-4xl font-bold mt-4 mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400 text-2xl">
                                    {'★'.repeat(Math.round(product.rating))}
                                    {'☆'.repeat(5 - Math.round(product.rating))}
                                </div>
                                <span className="ml-2 text-gray-600">
                                    {product.rating} ({product.numReviews || 0} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Stock */}
                            <div className="mb-6">
                                <p className="text-sm font-semibold">
                                    Stock: {' '}
                                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                                    </span>
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            {product.stock > 0 && (
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-600 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-600 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                                <button
                                    onClick={() => navigate('/shop')}
                                    className="flex-1 btn btn-outline"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
