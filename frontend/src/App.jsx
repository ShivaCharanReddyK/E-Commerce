import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Routes */}
                        <Route path="/checkout" element={
                            <PrivateRoute>
                                <CheckoutPage />
                            </PrivateRoute>
                        } />
                        <Route path="/orders" element={
                            <PrivateRoute>
                                <OrdersPage />
                            </PrivateRoute>
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
