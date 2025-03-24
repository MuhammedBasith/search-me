import express from 'express';
import { uploadMiddleware, processImage } from '../controllers/imageController.js';

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload and process an image
 * @access  Public
 */
router.post('/upload', uploadMiddleware, processImage);

export default router; 