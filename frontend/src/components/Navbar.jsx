import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text">E-Shop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/shop" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Shop
                        </Link>

                        {user ? (
                            <>
                                <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Orders
                                </Link>
                                <Link to="/cart" className="relative">
                                    <div className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center">
                                        🛒 Cart
                                        {getTotalItems() > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                                                {getTotalItems()}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-700 font-medium">Hi, {user.name.split(' ')[0]}</span>
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary text-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 animate-fade-in">
                        <div className="flex flex-col space-y-2">
                            <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Home
                            </Link>
                            <Link to="/shop" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Shop
                            </Link>
                            {user ? (
                                <>
                                    <Link to="/orders" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Orders
                                    </Link>
                                    <Link to="/cart" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        🛒 Cart ({getTotalItems()})
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
