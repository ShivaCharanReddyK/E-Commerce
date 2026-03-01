import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Validation helpers
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const { success, error: showError } = useToast();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            success('Welcome back! Login successful.');
            navigate('/');
        } else {
            showError(result.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 py-12 px-4">
            <div className="max-w-md w-full">
                <div className="card p-8 animate-scale-in">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                        <p className="text-gray-600">Login to your account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={`input ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({ ...errors, password: '' });
                                }}
                                className={`input ${errors.password ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
