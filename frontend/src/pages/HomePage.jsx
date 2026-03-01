import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const { data } = await api.get('/products?sort=rating');
                setFeaturedProducts(data.products.slice(0, 4)); // Top 4 products
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white">
                <div className="container-custom py-20 md:py-32">
                    <div className="max-w-3xl animate-slide-up">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Discover Amazing Products
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-primary-100">
                            Shop the latest trends with lightning-fast search and seamless checkout
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/shop" className="btn bg-white text-primary-700 hover:bg-gray-100">
                                Start Shopping
                            </Link>
                            <Link to="/shop" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
                                Explore Categories
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow animate-fade-in">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold mb-2">Fast Search</h3>
                            <p className="text-gray-600">
                                Find exactly what you need with our intelligent search
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <div className="text-5xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                            <p className="text-gray-600">
                                Your data is safe with industry-standard encryption
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="text-5xl mb-4">📦</div>
                            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">
                                Get your orders delivered quickly to your doorstep
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
                        <p className="text-gray-600 text-lg">Check out our top-rated items</p>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/shop" className="btn btn-primary">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
                    <p className="text-xl mb-8 text-primary-100">
                        Join thousands of happy customers today
                    </p>
                    <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100">
                        Create Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
