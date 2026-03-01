import { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/my-orders');
                setOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <LoadingSpinner fullScreen />;

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center animate-fade-in">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">No orders yet</h2>
                    <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
                    <a href="/shop" className="btn btn-primary">
                        Start Shopping
                    </a>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-yellow-100 text-yellow-800',
            Processing: 'bg-blue-100 text-blue-800',
            Shipped: 'bg-purple-100 text-purple-800',
            Delivered: 'bg-green-100 text-green-800',
            Cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <h1 className="text-4xl font-bold mb-8 animate-slide-up">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="card p-6 animate-fade-in">
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm text-gray-600">Order ID</p>
                                    <p className="font-mono font-semibold">{order._id}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <p className="text-sm text-gray-600">Placed on</p>
                                    <p className="font-semibold">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <span className={`badge ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3 mb-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <img
                                            src={item.product?.image || 'https://via.placeholder.com/100'}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">₹{item.price.toLocaleString('en-IN')}</p>
                                            <p className="text-sm text-gray-600">per item</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t">
                                <div>
                                    <p className="text-sm text-gray-600">Shipping Address</p>
                                    <p className="font-medium">
                                        {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-sm text-gray-600">Total Amount</p>
                                    <p className="text-2xl font-bold">
                                        ₹{order.totalPrice.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
