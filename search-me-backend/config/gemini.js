import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the model (Gemini Pro Vision for image analysis)
const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

// Get the text model (Gemini Pro for text processing)
const getGeminiTextModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
};

export { getGeminiModel, getGeminiTextModel }; 