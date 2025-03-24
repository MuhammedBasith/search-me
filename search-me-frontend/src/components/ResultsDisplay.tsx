import React from 'react';
import { ChevronLeft, ArrowUpRight, ShoppingBag, Tag, Star } from 'lucide-react';
import { useImage } from '../context/ImageContext';

const ResultsDisplay: React.FC = () => {
  const { image, productDetails, searchResults, s3Url, setImage, setProductDetails, setSearchResults, setS3Url } = useImage();

  if (!productDetails || !searchResults) return null;

  const resetSearch = () => {
    setImage(null);
    setProductDetails(null);
    setSearchResults(null);
    setS3Url(null);
  };

  // Function to calculate discount percentage when both price and mrp are available
  const calculateDiscount = (price: string, mrp: string | null) => {
    if (!mrp) return null;
    
    // Extract numeric values from price strings (assuming format like "₹4,795")
    const priceValue = parseFloat(price.replace(/[^\d.]/g, ''));
    const mrpValue = parseFloat(mrp.replace(/[^\d.]/g, ''));
    
    if (isNaN(priceValue) || isNaN(mrpValue) || mrpValue <= priceValue) return null;
    
    const discountPercent = Math.round(((mrpValue - priceValue) / mrpValue) * 100);
    return discountPercent;
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in py-12">
      <button 
        onClick={resetSearch}
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to search
      </button>
      
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-md bg-white">
          <img 
            src={s3Url || image || ''} 
            alt={productDetails.name} 
            className="w-full h-auto object-cover aspect-square"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            {productDetails.category}
          </div>
          <h2 className="text-3xl font-bold mb-2">{productDetails.name}</h2>
          <p className="text-lg text-muted-foreground mb-1">
            by <span className="font-medium">{productDetails.brand}</span>
          </p>
          <p className="mb-4 text-muted-foreground">
            Confidence: <span className="font-medium">{(productDetails.confidence * 100).toFixed(1)}%</span>
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">
              {productDetails.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {productDetails.color.map((color, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 rounded-md bg-secondary text-xs"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Material</h3>
              <span className="px-2 py-1 rounded-md bg-secondary text-xs">
                {productDetails.material}
              </span>
            </div>
          </div>
          
          {Object.keys(productDetails.attributes).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Attributes</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(productDetails.attributes).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <span className="text-xs text-muted-foreground capitalize">{key}:</span>
                    <span className="text-xs font-medium ml-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Price Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {searchResults.products.map((product, index) => {
          const discount = calculateDiscount(product.price, product.mrp);
          
          return (
            <a 
              key={index} 
              href={product.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-accent/20">
                  <img 
                    src={product.image_url} 
                    alt={product.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                {discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                    {discount}% OFF
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-secondary/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md">
                  {product.source}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-sm mb-2 line-clamp-2 h-10" title={product.title}>
                  {product.title}
                </h4>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-primary">{product.price}</span>
                      {product.mrp && (
                        <span className="text-xs text-muted-foreground line-through">{product.mrp}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 h-8 px-3">
                    View <ArrowUpRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={resetSearch}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Search another product
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
