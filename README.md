# SearchMe: Visual Product Search & Price Comparison 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to SearchMe! Ever seen a product you liked – maybe in a photo, on the street, or in a magazine – but didn't know where to buy it or how to find the best price online? SearchMe solves that problem!

**Just upload an image, and SearchMe will use AI to figure out what the product is and then automatically hunt it down on popular Indian e-commerce sites like Amazon, Flipkart, and Myntra, showing you prices and links.**

**GitHub Repository:** [https://github.com/MuhammedBasith/search-me](https://github.com/MuhammedBasith/search-me)

## 🤔 What Does It Do? (Features)

*   **📸 Image Upload:** Easily upload product images using drag-and-drop or a standard file selector.
*   **🧠 AI Product Recognition:** Leverages the power of Google's Gemini AI to analyze the image and identify key product details (name, brand, category, color, etc.).
*   **🛒 Multi-Store Price Hunt:** Automatically searches for the identified product on:
    *   Amazon.in
    *   Flipkart
    *   Myntra
*   **📊 Clear Results:** Displays the identified product details alongside the search results from each store, including name, price, and a direct link to the product page.
*   **📱 Responsive Design:** Works smoothly on both desktop and mobile devices.
*   **🤖 Smart Scraping & Refinement:** Uses Firecrawl to efficiently scrape search results and Gemini again to clean and structure the data for a reliable comparison.

---

## ⚙️ How It Works

1.  **Upload:** You upload an image through the user-friendly frontend interface.
2.  **To the Backend:** The image is securely sent to our Node.js backend.
3.  **Cloud Storage:** The image is temporarily stored on AWS S3 for processing.
4.  **AI Vision:** The backend sends the image URL to the Gemini Vision API. Gemini analyzes the image and returns structured details about the product it sees (like "Nike Air Max shoe, white and red").
5.  **Web Crawling:** Armed with the product name from Gemini, the backend uses the Firecrawl service to visit Amazon.in, Flipkart, and Myntra search pages for that product. Firecrawl efficiently extracts the content (product titles, prices, links) from these pages.
6.  **AI Data Cleanup:** The raw data scraped by Firecrawl can be messy. The backend sends this raw data *back* to Gemini (this time a text-focused model) to clean it up and extract only the essential details (like product title, price, image URL, page URL) in a consistent JSON format for each store.
7.  **Back to Frontend:** The backend bundles the initial product details (from step 4) and the cleaned-up search results (from step 6) into a single response.
8.  **Display:** The React frontend receives this data and presents it to you in a clear, organized way, showing the identified product and the comparison across stores.

---

## 🛠️ Tech Stack

This project uses modern technologies for both the brain (backend) and the face (frontend):

**Backend (`search-me-backend/`)**

*   **Runtime:** Node.js
*   **Framework:** Express.js (for building the API)
*   **AI:** Google Gemini API (for image recognition and data structuring)
*   **Web Scraping:** Firecrawl SDK (to fetch data from e-commerce sites)
*   **Storage:** AWS S3 (for temporary image storage)
*   **Image Handling:** Multer (for handling image uploads in Express)
*   **Environment:** Dotenv (for managing API keys and secrets)
*   **Language:** JavaScript (ES Modules)

**Frontend (`search-me-frontend/`)**

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite (for super-fast development and builds)
*   **Styling:** Tailwind CSS (utility-first CSS framework)
*   **UI Components:** shadcn/ui (beautiful, reusable components built on Radix UI and Tailwind)
*   **Data Fetching:** TanStack Query (React Query) (for managing API requests, caching, and state)
*   **Routing:** React Router DOM (for handling navigation between pages)

---

## 📁 Project Structure


search-me/
├── search-me-backend/ # Node.js/Express backend code
│ ├── server.js # Main server entry point
│ ├── .env.example # Example environment variables
│ ├── config/ # Configuration for external services (AWS, Gemini, Firecrawl)
│ ├── controllers/ # Handles incoming requests and sends responses
│ ├── routes/ # Defines the API endpoints (like /api/upload)
│ ├── services/ # Core logic (interacting with Gemini, Firecrawl)
│ └── ...
└── search-me-frontend/ # React/Vite frontend code
├── public/ # Static assets
├── src/ # Main source code
│ ├── App.tsx # Root application component
│ ├── main.tsx # Entry point for React
│ ├── components/ # Reusable UI components (Header, UploadArea, ResultsDisplay)
│ ├── pages/ # Top-level page components (Home, About)
│ ├── context/ # React Context for state management (if any)
│ ├── hooks/ # Custom React Hooks
│ └── lib/ # Utility functions
├── index.html # Main HTML file
├── vite.config.ts # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── .env.example # Example environment variables

---

## 🚀 Getting Started Locally

Want to run SearchMe on your own computer? Follow these steps:

**Prerequisites:**

*   Node.js (v14 or higher recommended)
*   npm, yarn, or bun (package manager)
*   An AWS Account with an S3 bucket configured (you'll need Access Key ID, Secret Access Key, Bucket Name, Region)
*   A Google Gemini API Key
*   A Firecrawl API Key

**Steps:**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/MuhammedBasith/search-me.git
    cd search-me
    ```

2.  **Set up the Backend:**
    ```bash
    cd search-me-backend
    npm install # or yarn install / bun install

    # Copy the example environment file
    cp .env.example .env

    # Edit the .env file with your actual keys and bucket details:
    # PORT=5000 (or another port if you prefer)
    # GEMINI_API_KEY=your-gemini-api-key
    # FIRECRAWL_API_KEY=your-firecrawl-api-key
    # AWS_ACCESS_KEY_ID=your-aws-access-key
    # AWS_SECRET_ACCESS_KEY=your-aws-secret-key
    # AWS_S3_BUCKET_NAME=your-s3-bucket-name
    # AWS_REGION=your-aws-region

    # Start the backend server (in development mode with auto-reload)
    npm run dev
    # Or for production mode: npm start
    ```
    *Keep this terminal running.*

3.  **Set up the Frontend:**
    *Open a **new** terminal window.*
    ```bash
    cd ../search-me-frontend # Navigate back to root, then into frontend
    # OR if you are in the root directory already: cd search-me-frontend

    npm install # or yarn install / bun install

    # Copy the example environment file
    cp .env.example .env

    # Edit the .env file and set the backend API URL:
    # VITE_API_BASE_URL=http://localhost:5000 # Make sure the port matches your backend

    # Start the frontend development server
    npm run dev # or yarn dev / bun run dev
    ```

4.  **Access the App:**
    Open your web browser and navigate to the URL provided by the frontend development server (usually `http://localhost:5173`).

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find bugs, feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file (you might need to create one if it doesn't exist) for details.

---

## 🙏 Acknowledgements

*   **Google Gemini:** For the powerful AI vision and text processing capabilities.
*   **Firecrawl:** For the efficient web scraping service.
*   **AWS S3:** For reliable object storage.
*   **shadcn/ui:** For the fantastic UI components.
*   All the open-source libraries and tools that make this project possible!

---

Happy Searching! ✨



License Badge: Added a simple MIT license badge at the top.

GitHub Link: Included the repository link prominently.

Remember to replace the placeholder [Insert Screenshot/GIF...] with an actual visual representation of your application!
