import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Firecrawl SDK with API key
const firecrawlClient = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

export { firecrawlClient }; 