import { getGeminiModel, getGeminiTextModel } from '../config/gemini.js';
import fetch from 'node-fetch';

/**
 * Process image with Gemini API to identify product details
 * @param {string} imageUrl - The URL of the image to process
 * @returns {Promise<Object>} - JSON object with product details
 */
const identifyProduct = async (imageUrl) => {
  try {
    const model = getGeminiModel();
    
    // Fetch the image from URL
    const imageResp = await fetch(imageUrl).then(response => response.arrayBuffer());
    
    // Convert to base64
    const base64Image = Buffer.from(imageResp).toString('base64');
    
    const prompt = `
    You are an AI-powered product identification model.
    Analyze the product in the given image and provide structured JSON output.
    Return the following details:
    - **Product Name**
    - **Brand**
    - **Category** (e.g., Electronics, Footwear, Clothing, Accessories)
    - **Description** (Short description of key features)
    - **Color** (Main detected colors)
    - **Material** (Leather, plastic, metal, etc.)
    - **Additional Attributes** (Size, style, weight, etc.)
    - **Confidence Score** (How confident the AI is in the recognition)
    
    Example Output:
    {
      "name": "Nike Air Max 90",
      "brand": "Nike",
      "category": "Footwear",
      "description": "A stylish running shoe with Air cushioning.",
      "color": ["White", "Black", "Red"],
      "material": "Leather & Mesh",
      "attributes": {
        "size": "Multiple available",
        "style": "Casual/Sports"
      },
      "confidence": 0.97
    }
    
    Important: Return ONLY the JSON object, nothing else.
    `;

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the text (in case Gemini adds any other text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error in Gemini product identification:', error);
    throw new Error('Failed to process image with Gemini API');
  }
};

/**
 * Refine crawled product data using Gemini API
 * @param {Object} crawledData - Raw data from web crawlers
 * @returns {Promise<Object>} - Structured JSON with refined product data
 */
const refineProductData = async (crawledData, productName) => {
  try {
    const model = getGeminiTextModel();
    const { firecrawlClient } = await import('../config/firecrawl.js');
  
    
    // Directly crawl each URL to get fresh data
    const amazonPromise = firecrawlClient.scrapeUrl(crawledData.amazon.url, { formats: ['markdown'] });
    const flipkartPromise = firecrawlClient.scrapeUrl(crawledData.flipkart.url, { formats: ['markdown'] });
    const myntraPromise = firecrawlClient.scrapeUrl(crawledData.myntra.url, { formats: ['markdown'] });
    
    const [amazonResult, flipkartResult, myntraResult] = await Promise.all([
      amazonPromise, flipkartPromise, myntraPromise
    ]);
    
    // Prepare data from each source
    const amazonData = amazonResult.success && amazonResult.markdown ? 
      amazonResult.markdown : "No data available";
      
    const flipkartData = flipkartResult.success && flipkartResult.markdown ? 
      flipkartResult.markdown : "No data available";
      
    const myntraData = myntraResult.success && myntraResult.markdown ? 
      myntraResult.markdown : "No data available";

    
    // Process each source with Gemini
    const amazonPrompt = `
    You are a highly skilled data extraction expert. Your task is to extract information about ${productName} from the following text, which is a snippet of an Amazon product listing page. The text is in Markdown format. Identify the 'title', 'image_url', 'price', 'mrp' (Maximum Retail Price, if available, otherwise null), and 'url' for each product. Return the data in a structured JSON array format. If certain fields like "mrp" are unavailable, mark them as 'null'. Ensure that image urls ends with .jpg or .png or .gif
    
    Here is the text from Amazon:
    ${amazonData}
    
    Example Output Format(only return the json array dont return anything else, STRICTLY JSON):
    
    [
      {
        "title": "Nike Mens Court Vision Lo NnRunning Shoe",
        "image_url": "https://m.media-amazon.com/images/I/51xuWoOZDPL._AC_UL960_FMwebp_QL65_.jpg",
        "price": "₹4,795",
        "mrp": "₹4,995",
        "url": "https://www.amazon.in/Nike-Court-Vision-NN-WHITE-BLACK-DH2987-101-9/dp/B098F6QPLK/ref=sr_1_1"
      }
    ]
    `;
    
    const flipkartPrompt = `
    You are a highly skilled data extraction expert. Your task is to extract information about ${productName} from the following text, which is a snippet of a Flipkart product listing page. The text is in Markdown format. Identify the 'title', 'image_url', 'price', 'mrp' (Maximum Retail Price, if available, otherwise null), and 'url' for each product. Return the data in a structured JSON array format. If certain fields like "mrp" are unavailable, mark them as 'null'. Ensure that image urls ends with .jpg or .png or .gif
    
    Here is the text from Flipkart:
    ${flipkartData}
    
    Example Output Format(only return the json array dont return anything else STRICTLY JSON):
    
    [
      {
        "title": "Nike Mens Court Vision Lo NnRunning Shoe",
        "image_url": "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/g/k/q/-original-imaggyegv5pkqgb2.jpeg",
        "price": "₹4,795",
        "mrp": "₹4,995",
        "url": "https://www.flipkart.com/nike-court-vision-lo-nn-sneakers-men/p/itm18a2f2ad98f8c"
      }
    ]
    `;
    
    const myntraPrompt = `
    You are a highly skilled data extraction expert. Your task is to extract information about ${productName} from the following text, which is a snippet of a Myntra product listing page. The text is in Markdown format. Identify the 'title', 'image_url', 'price', 'mrp' (Maximum Retail Price, if available, otherwise null), and 'url' for each product. Return the data in a structured JSON array format. If certain fields like "mrp" are unavailable, mark them as 'null'. Ensure that image urls ends with .jpg or .png or .gif
    
    Here is the text from Myntra:
    ${myntraData}
    
    Example Output Format(only return the json array dont return anything else STRICTLY JSON):
    
    [
      {
        "title": "Nike Mens Court Vision Lo NnRunning Shoe",
        "image_url": "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/12632002/2020/10/15/1ac8d818-cfd0-4fee-98c8-4e176a8fc0e51602758843772-Nike-Men-White-COURT-VISION-LOW-Tennis-Shoes-43316027588425-1.jpg",
        "price": "₹4,795",
        "mrp": "₹4,995",
        "url": "https://www.myntra.com/sports-shoes/nike/nike-men-white-court-vision-low-tennis-shoes/12632002/buy"
      }
    ]
    `;
    
    // Process each source in parallel
    const [amazonDataPromise, flipkartDataPromise, myntraDataPromise] = await Promise.all([
      model.generateContent(amazonPrompt),
      model.generateContent(flipkartPrompt),
      model.generateContent(myntraPrompt)
    ]);
    
    // Extract results
    const amazonResponse = amazonDataPromise.response.text();
    const flipkartResponse = flipkartDataPromise.response.text();
    const myntraResponse = myntraDataPromise.response.text();

    
    // Parse JSON from responses
    const parseJsonFromText = (text) => {
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(text);
      } catch (error) {
        console.error('Error parsing JSON from text:', error);
        return [];
      }
    };
    
    const amazonProducts = parseJsonFromText(amazonResponse);
    const flipkartProducts = parseJsonFromText(flipkartResponse);
    const myntraProducts = parseJsonFromText(myntraResponse);
    
    // Add source information to each product
    const addSource = (products, source) => {
      return products.map(product => ({
        ...product,
        source
      }));
    };
    
    // Limit to first two products from each site
    const limitProducts = (products) => {
      return products.slice(0, 2);
    };
    
    // Combine all products into one array, limiting to first two from each source
    const allProducts = [
      ...addSource(limitProducts(amazonProducts), 'Amazon'),
      ...addSource(limitProducts(flipkartProducts), 'Flipkart'),
      ...addSource(limitProducts(myntraProducts), 'Myntra')
    ];
    
    return {
      products: allProducts
    };
  } catch (error) {
    console.error('Error in Gemini data refinement:', error);
    throw new Error('Failed to refine product data with Gemini API: ' + error.message);
  }
};

export { identifyProduct, refineProductData }; 