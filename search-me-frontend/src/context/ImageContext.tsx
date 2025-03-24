import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types based on API response
interface ProductAttribute {
  size?: string;
  style?: string;
  [key: string]: string | undefined;
}

interface ProductDetails {
  name: string;
  brand: string;
  category: string;
  description: string;
  color: string[];
  material: string;
  attributes: ProductAttribute;
  confidence: number;
}

interface ComparisonProduct {
  title: string;
  image_url: string;
  price: string;
  mrp: string | null;
  url: string;
  source: string;
}

interface SearchResults {
  products: ComparisonProduct[];
}

interface ApiResponse {
  s3_url: string;
  product_details: ProductDetails;
  search_results: SearchResults;
}

interface ImageContextType {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  productDetails: ProductDetails | null;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails | null>>;
  searchResults: SearchResults | null;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults | null>>;
  s3Url: string | null;
  setS3Url: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [s3Url, setS3Url] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ 
      image, 
      setImage, 
      isLoading, 
      setIsLoading, 
      productDetails, 
      setProductDetails,
      searchResults,
      setSearchResults,
      s3Url,
      setS3Url,
      error,
      setError
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
