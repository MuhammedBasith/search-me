import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { uploadToS3 } from '../config/s3.js';
import { identifyProduct } from '../services/geminiService.js';
import { searchAllSites } from '../services/firecrawlService.js';
import { refineProductData } from '../services/geminiService.js';
import { success } from '../utils/responseFormatter.js';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware to handle image upload
const uploadMiddleware = upload.single('image');

/**
 * Upload image to S3, process with Gemini API, and automatically search for products
 */
const processImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No image provided');
    }

    // Generate a unique filename
    const filename = `${uuidv4()}-${req.file.originalname}`;
    
    // Upload to S3
    const imageUrl = await uploadToS3(req.file.buffer, filename);
    
    // Process with Gemini API to identify product
    const productDetails = await identifyProduct(imageUrl);
    
    // Automatically search for the identified product
    const productName = productDetails.name;
    
    // Search for products using Firecrawl
    const rawResults = await searchAllSites(productName);
    
    // Refine results using Gemini API
    const refinedData = await refineProductData(rawResults, productName);
    
    // Return success response with both product details and search results
    res.status(200).json(success(200, 'Image processed and products retrieved', {
      s3_url: imageUrl,
      product_details: productDetails,
      search_results: refinedData
    }));
  } catch (error) {
    if (error.message === 'GEMINI_MODEL_OVERLOADED') {
      return res.status(503).json({
        success: false,
        message: "The AI model is currently overloaded. Please try again in a few moments."
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred."
    });
  }
});

export { uploadMiddleware, processImage };