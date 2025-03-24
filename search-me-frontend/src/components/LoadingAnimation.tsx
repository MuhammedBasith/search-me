import React, { useState, useEffect } from 'react';
import { Search, Image, ShoppingBag } from 'lucide-react';

interface LoadingAnimationProps {
  text?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ text = 'Processing image...' }) => {
  const [step, setStep] = useState(0);
  const steps = [
    'Analyzing your image...',
    'Identifying the product...',
    'Finding the best prices...',
    'Preparing your results...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prevStep => (prevStep + 1) % steps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  const getIcon = () => {
    switch(step) {
      case 0: return <Image className="h-6 w-6 text-primary" />;
      case 1: return <Search className="h-6 w-6 text-primary" />;
      case 2: return <ShoppingBag className="h-6 w-6 text-primary" />;
      case 3: return <ShoppingBag className="h-6 w-6 text-primary" />;
      default: return <Image className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in py-20">
      <div className="relative h-20 w-20 flex items-center justify-center">
        <div className="absolute top-0 left-0 h-full w-full border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 h-full w-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        <div className="bg-background p-2 rounded-full">
          {getIcon()}
        </div>
      </div>
      
      <div className="space-y-4 text-center">
        <p className="text-xl font-semibold">{steps[step]}</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Our AI is analyzing your image and searching across multiple stores to find the best deals
        </p>
      </div>
      
      <div className="w-full max-w-sm space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>Analyzing</span>
          <span>Comparing</span>
          <span>Results</span>
        </div>
        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500" 
            style={{ width: `${((step + 1) / steps.length) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
