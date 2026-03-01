import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const CheckoutPage = () => {
    const { cartItems, getTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                shippingAddress: formData,
                totalPrice: getTotal()
            };

            await api.post('/orders', orderData);
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to place order');
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 animate-slide-up">Checkout</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping Form */}
                    <div className="lg:col-span-2">
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="123 Main St"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="Mumbai"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="Maharashtra"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="400001"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn btn-primary disabled:opacity-50 mt-6"
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.product._id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.product.name} x {item.quantity}
                                        </span>
                                        <span className="font-semibold">
                                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>₹{getTotal().toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600 font-semibold">FREE</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>₹{getTotal().toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
