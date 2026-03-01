import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import searchRoutes from './routes/search.routes.js';

// Import error handler
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 auth requests per windowMs
    message: 'Too many authentication attempts, please try again later'
});
app.use('/api/auth', authLimiter);

// CORS - restrict to frontend origin in production
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || 'http://localhost:3000'
        : 'http://localhost:3000',
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev')); // Log HTTP requests to console

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'E-Commerce API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      orders: '/api/orders',
      search: '/api/search'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/search', searchRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});
