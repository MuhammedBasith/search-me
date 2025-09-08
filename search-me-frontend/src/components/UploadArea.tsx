import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Upload, Camera } from 'lucide-react';
import { useImage } from '../context/ImageContext';
import { toast } from 'sonner';
import { API_BASE_URL } from '../App';

// Dummy response data for when backend is down
const dummyResponse = {
  s3_url: '/nike-shoe.jpg',
  product_details: {
    name: 'Nike Air Max 270',
    description: 'Men\'s Running Shoes with visible Air cushioning for all-day comfort',
    brand: 'Nike',
    category: 'Running Shoes',
    confidence: 0.95,
    color: ['White', 'Black', 'University Red'],
    material: 'Mesh and Synthetic',
    attributes: {
      size: 'US 10',
      style: 'Athletic',
      'Sole Material': 'Rubber',
      'Closure': 'Lace-Up',
      'Shoe Width': 'Medium',
      'Model': 'AR6670-100'
    }
  },
  search_results: {
    products: [
      {
        title: 'Nike Air Max 270 - White/Black/University Red',
        image_url: './nike-shoe-2.jpg',
        price: '₹15,495',
        mrp: '₹16,495',
        url: 'https://www.amazon.in/NIKE-Mens-Air-Black-White/dp/B078X1CGNP/ref=sr_1_5?th=1&psc=1',
        source: 'Amazon'
      },
      {
        title: 'Nike Air Max 270 - White/Black/University Red',
        image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
        price: '₹16,495',
        mrp: '₹16,495',
        url: 'https://www.nike.com/in/t/air-max-270-shoes-V4DfZQ/AH6789-006',
        source: 'Nike'
      },
      {
        title: 'Nike Air Max 270 - White/Black/University Red',
        image_url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQajRrAH6pPQqjHUzsRiTxrPBA9QfLECpSA13R3fO_LQSuFPioEDbtENonT0wY2LAJxQw7r4QmPBsR-ublc0dwbw9Db_vaDm658fKbTuT8MAb2jQCfPpOMpsfI',
        price: '₹13,999',
        mrp: '₹16,495',
        url: 'https://www.ebay.co.uk/b/bn_7118620162',
        source: 'eBay'
      }
    ]
  }
};

const UploadArea: React.FC = () => {
  const { 
    setImage, 
    setIsLoading, 
    setProductDetails, 
    setSearchResults, 
    setS3Url, 
    setError 
  } = useImage();
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.match('image.*')) {
        processFile(file);
      } else {
        toast.error('Please upload an image file');
      }
    }
  }, []);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (err) {
      toast.error('Failed to access camera. Please make sure you have granted camera permissions.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          processFile(file);
        }
      }, 'image/jpeg');
      
      stopCamera();
    }
  };
  
  const processFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null) return 10;
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        // Try to parse error message from backend
        let errorMsg = `Error: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData?.message) errorMsg = errorData.message;
        } catch {}
        throw new Error(errorMsg);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setS3Url(data.data.s3_url);
        setProductDetails(data.data.product_details);
        setSearchResults(data.data.search_results);
        setIsLoading(false);
        toast.success('Product found! Showing comparisons');
      } else {
        throw new Error(data.message || 'Failed to process image');
      }
    } catch (err) {
      setIsLoading(false);
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      
      // Show friendly message for backend errors
      toast.info(
        "We're really sorry, but we've had to temporarily take down our backend services due to high AWS, Firecrawl, and LLM costs. We're working hard to bring them back online soon. In the meantime, here's a dummy response to show you how the results would look.",
        { duration: 10000 }
      );
      
      // Set dummy data to show the UI flow
      setS3Url(dummyResponse.s3_url);
      setProductDetails(dummyResponse.product_details);
      setSearchResults(dummyResponse.search_results);
      console.log('Showing dummy response due to backend unavailability');
    }
  };
  
  return (
    <div 
      className={`relative w-full max-w-xl mx-auto rounded-xl border-2 border-dashed p-12 transition-all duration-300 ${
        isDragging 
          ? 'border-primary bg-primary/5 scale-105' 
          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {uploadProgress !== null && uploadProgress < 100 && (
        <div className="absolute top-0 left-0 w-full bg-secondary h-1">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${uploadProgress}%` }} 
          />
        </div>
      )}
      
      {showCamera ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-md rounded-lg"
          />
          <div className="flex gap-4">
            <button
              onClick={capturePhoto}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Take Photo
            </button>
            <button
              onClick={stopCamera}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Upload Product Image</h3>
          <p className="text-muted-foreground">Drag and drop an image here, or click to select</p>
          <div className="flex gap-4">
            <label className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer">
              <span>Select Image</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
            </label>
            <button
              onClick={startCamera}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2"
            >
              <Camera className="h-4 w-4 mr-2" />
              Use Camera
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
