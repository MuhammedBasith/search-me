# Visual Product Search & Price Comparison Backend

A Node.js + Express.js backend that allows users to upload an image, process it using Gemini API, and search for the identified product on Amazon, Flipkart, and Myntra using Firecrawl's web scraping capabilities.

## Features

- Image upload to AWS S3
- Product identification with Gemini API
- Automatic price comparison across e-commerce platforms using web scraping
- Clean, structured JSON responses

## Tech Stack

- **Backend**: Node.js + Express.js with MVC architecture
- **Storage**: AWS S3 (for storing images)
- **AI Processing**: Gemini API (for analyzing image content)
- **Web Scraping**: Firecrawl SDK (scrapeUrl method to extract e-commerce data)
- **Data Processing**: Gemini API (to refine scraped data)

## Prerequisites

- Node.js (v14 or higher)
- AWS Account with S3 bucket
- Gemini API key
- Firecrawl API key

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file based on `.env.example` and fill in your API keys and configuration.

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Upload Image and Get Product Comparisons

```
POST /api/upload
```

**Request Body:**
- `image` (file): The image file to upload

**Response:**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Image processed and products retrieved",
  "data": {
    "s3_url": "https://s3.amazonaws.com/bucket/image.jpg",
    "product_details": {
      "name": "Product Name",
      "brand": "Brand Name",
      "category": "Category",
      "description": "Description",
      "color": ["Color1", "Color2"],
      "material": "Material",
      "attributes": {
        "size": "Size",
        "style": "Style"
      },
      "confidence": 0.95
    },
    "search_results": {
      "products": [
        {
          "source": "Amazon",
          "name": "Product Name",
          "price": "₹9,999",
          "availability": "In Stock",
          "rating": "4.5",
          "url": "https://www.amazon.in/product-url"
        },
        {
          "source": "Flipkart",
          "name": "Product Name",
          "price": "₹9,499",
          "availability": "In Stock",
          "rating": "4.3",
          "url": "https://www.flipkart.com/product-url"
        },
        {
          "source": "Myntra",
          "name": "Product Name",
          "price": "₹9,799",
          "availability": "Limited Stock",
          "rating": "4.4",
          "url": "https://www.myntra.com/product-url"
        }
      ]
    }
  }
}
```

### Search Products Directly (Alternative Endpoint)

```
GET /api/search?product_name=ProductName
```

**Query Parameters:**
- `product_name` (string): Name of the product to search for

**Response:**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Products retrieved successfully",
  "data": {
    "products": [
      {
        "source": "Amazon",
        "name": "Product Name",
        "price": "₹9,999",
        "availability": "In Stock",
        "rating": "4.5",
        "url": "https://www.amazon.in/product-url"
      },
      {
        "source": "Flipkart",
        "name": "Product Name",
        "price": "₹9,499",
        "availability": "In Stock",
        "rating": "4.3",
        "url": "https://www.flipkart.com/product-url"
      },
      {
        "source": "Myntra",
        "name": "Product Name",
        "price": "₹9,799",
        "availability": "Limited Stock",
        "rating": "4.4",
        "url": "https://www.myntra.com/product-url"
      }
    ]
  }
}
```

## Workflow

1. User uploads an image through the frontend
2. Backend uploads the image to AWS S3
3. Backend analyzes the image with Gemini API to identify the product
4. Backend automatically generates search URLs for Amazon, Flipkart, and Myntra
5. Backend uses Firecrawl's scrapeUrl method to extract product listings from each site
6. Backend uses Gemini API to process the markdown data and extract structured product information
7. Backend returns a single response with both product details and price comparisons
8. Frontend displays the consolidated results to the user

## How Firecrawl Integration Works

The backend uses the Firecrawl SDK to scrape e-commerce websites:

```javascript
// Initialize the Firecrawl client
const firecrawlClient = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

// Scrape a product search page
const scrapeResult = await firecrawlClient.scrapeUrl(
  'https://www.amazon.in/s?k=productName', 
  { formats: ['markdown'] }
);

// Get the scraped content
const markdownContent = scrapeResult.data.markdown;
```

## Folder Structure

```
/backend
│── /config
│   ├── s3.js        # AWS S3 configuration
│   ├── firecrawl.js # Firecrawl configuration
│   ├── gemini.js    # Gemini API configuration
│── /controllers
│   ├── imageController.js    # Handles image uploads & processing
│   ├── searchController.js   # Handles product search logic
│── /routes
│   ├── imageRoutes.js    # Routes for image upload & processing
│   ├── searchRoutes.js   # Routes for product search
│── /services
│   ├── firecrawlService.js  # Firecrawl API integration
│   ├── geminiService.js     # Gemini API integration
│── /utils
│   ├── responseFormatter.js # Helper to format responses
│── /middleware
│   ├── errorHandler.js  # Global error handling middleware
│── server.js
│── .env.example
│── package.json
```

## License

MIT 