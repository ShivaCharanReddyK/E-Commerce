import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center animate-fade-in">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to get started!</p>
                    <Link to="/shop" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <h1 className="text-4xl font-bold mb-8 animate-slide-up">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product._id} className="card p-6 flex gap-6 animate-fade-in">
                                {/* Product Image */}
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />

                                {/* Product Info */}
                                <div className="flex-1">
                                    <Link to={`/product/${item.product._id}`}>
                                        <h3 className="text-xl font-semibold hover:text-primary-600 transition-colors">
                                            {item.product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 mt-1">{item.product.category}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        ₹{item.product.price.toLocaleString('en-IN')}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-4 mt-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-primary-600 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-primary-600 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product._id)}
                                            className="text-red-600 hover:text-red-700 font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Subtotal</p>
                                    <p className="text-2xl font-bold">
                                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24 animate-scale-in">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{getTotal().toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-semibold">FREE</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>₹{getTotal().toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn btn-primary mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <Link to="/shop" className="block text-center text-primary-600 hover:text-primary-700 font-semibold">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
