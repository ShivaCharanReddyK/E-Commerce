import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

/**
 * Middleware to protect routes that require authentication
 * Checks if user has a valid JWT token
 */
export const protect = async (req, res, next) => {
    try {
        let token;

        // Check if Authorization header exists and starts with 'Bearer'
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Extract token from "Bearer TOKEN"
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database and attach to request
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized to access this route'
        });
    }
};
