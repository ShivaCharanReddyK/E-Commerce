const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <span className="text-2xl font-bold text-white">E-Shop</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Your one-stop destination for all your shopping needs. Quality products, great prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-primary-400 transition-colors">Home</a></li>
                            <li><a href="/shop" className="hover:text-primary-400 transition-colors">Shop</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/shop?category=Electronics" className="hover:text-primary-400 transition-colors">Electronics</a></li>
                            <li><a href="/shop?category=Clothing" className="hover:text-primary-400 transition-colors">Clothing</a></li>
                            <li><a href="/shop?category=Books" className="hover:text-primary-400 transition-colors">Books</a></li>
                            <li><a href="/shop?category=Sports" className="hover:text-primary-400 transition-colors">Sports</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>📧 support@eshop.com</li>
                            <li>📞 +91 1234567890</li>
                            <li>📍 Mumbai, India</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {currentYear} E-Shop. All rights reserved. Built with ❤️ using React, Node.js & MongoDB</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
