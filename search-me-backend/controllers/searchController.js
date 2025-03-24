import asyncHandler from 'express-async-handler';
import { searchAllSites } from '../services/firecrawlService.js';
import { refineProductData } from '../services/geminiService.js';
import { success } from '../utils/responseFormatter.js';

/**
 * Search for products across all supported e-commerce sites
 */
const searchProducts = asyncHandler(async (req, res) => {
  const { product_name } = req.query;
  
  if (!product_name) {
    res.status(400);
    throw new Error('Product name is required');
  }
  
  // Search for products using Firecrawl
  const rawResults = await searchAllSites(product_name);
  
  // Refine results using Gemini API
  const refinedData = await refineProductData(rawResults);
  
  // Return success response
  res.status(200).json(success(200, 'Products retrieved successfully', refinedData));
});

export { searchProducts }; 