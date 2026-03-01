import express from 'express';
import { searchProducts } from '../controllers/search.controller.js';

const router = express.Router();

/**
 * @route   GET /api/search
 * @desc    Search products using hybrid search (text search + partial matching)
 * @access  Public
 */
router.get('/', searchProducts);

export default router;
