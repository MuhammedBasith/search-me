# SearchMe - Visual Product Search Application

SearchMe is a visual product search application that allows users to upload an image of a product and find it across multiple online retailers. The application uses AI to analyze the product image and then searches across popular e-commerce platforms to find the best prices and availability.

## Features

- Upload product images via drag-and-drop or file selection
- AI-powered product identification
- Price and availability comparison across multiple stores
- Detailed product information display
- Mobile-responsive design

## Tech Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling (with shadcn/ui components)
- React Router for navigation
- React Query for data fetching

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/search-me.git
cd search-me
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_API_BASE_URL=http://localhost:3000  # Replace with your backend API URL in production
```

4. Start the development server:
```
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for production:

```
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## API Integration

The application is designed to work with a backend API that exposes the following endpoint:

### POST /api/upload

Upload an image file to be processed for product identification and comparison.

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
        }
      ]
    }
  }
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
