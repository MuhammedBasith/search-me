import { firecrawlClient } from '../config/firecrawl.js';

/**
 * Search for a product on Amazon using Firecrawl
 * @param {string} productName - Name of the product to search
 * @returns {Promise<Object>} - Search results from Amazon
 */
const searchAmazon = async (productName) => {
  try {
    // Create Amazon search URL
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`;
    
    // Use Firecrawl to scrape the search results page
    const scrapeResult = await firecrawlClient.scrapeUrl(amazonUrl, { formats: ['markdown'] });

    
    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape Amazon: ${scrapeResult.error}`);
    }
    
    return {
      source: 'Amazon',
      results: scrapeResult.data || {},
      url: amazonUrl
    };
  } catch (error) {
    console.error('Error searching Amazon:', error);
    return {
      source: 'Amazon',
      results: {},
      error: error.message,
      url: `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`
    };
  }
};

/**
 * Search for a product on Flipkart using Firecrawl
 * @param {string} productName - Name of the product to search
 * @returns {Promise<Object>} - Search results from Flipkart
 */
const searchFlipkart = async (productName) => {
  try {
    // Create Flipkart search URL
    const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`;
    
    // Use Firecrawl to scrape the search results page
    const scrapeResult = await firecrawlClient.scrapeUrl(flipkartUrl, { formats: ['markdown'] });
    
    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape Flipkart: ${scrapeResult.error}`);
    }
    
    return {
      source: 'Flipkart',
      results: scrapeResult.data || {},
      url: flipkartUrl
    };
  } catch (error) {
    console.error('Error searching Flipkart:', error);
    return {
      source: 'Flipkart',
      results: {},
      error: error.message,
      url: `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`
    };
  }
};

/**
 * Search for a product on Myntra using Firecrawl
 * @param {string} productName - Name of the product to search
 * @returns {Promise<Object>} - Search results from Myntra
 */
const searchMyntra = async (productName) => {
  try {
    // Create Myntra search URL
    const myntraUrl = `https://www.myntra.com/${encodeURIComponent(productName)}`;
    
    // Use Firecrawl to scrape the search results page
    const scrapeResult = await firecrawlClient.scrapeUrl(myntraUrl, { formats: ['markdown'] });
    
    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape Myntra: ${scrapeResult.error}`);
    }
    
    return {
      source: 'Myntra',
      results: scrapeResult.data || {},
      url: myntraUrl
    };
  } catch (error) {
    console.error('Error searching Myntra:', error);
    return {
      source: 'Myntra',
      results: {},
      error: error.message,
      url: `https://www.myntra.com/${encodeURIComponent(productName)}`
    };
  }
};

/**
 * Search for a product across all supported e-commerce sites
 * @param {string} productName - Name of the product to search
 * @returns {Promise<Object>} - Combined results from all sites
 */
const searchAllSites = async (productName) => {
  try {
    // Make all requests in parallel
    const [amazonResults, flipkartResults, myntraResults] = await Promise.all([
      searchAmazon(productName),
      searchFlipkart(productName),
      searchMyntra(productName)
    ]);
    
    return {
      amazon: amazonResults,
      flipkart: flipkartResults,
      myntra: myntraResults
    };
  } catch (error) {
    console.error('Error searching all sites:', error);
    throw new Error('Failed to search for products');
  }
};

export { searchAllSites, searchAmazon, searchFlipkart, searchMyntra }; 