import express from 'express';
import { searchProducts } from '../controllers/searchController.js';

const router = express.Router();

/**
 * @route   GET /api/search
 * @desc    Search for products across e-commerce sites
 * @access  Public
 */
router.get('/search', searchProducts);

export default router; 