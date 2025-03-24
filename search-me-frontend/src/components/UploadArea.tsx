import React, { useCallback, useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useImage } from '../context/ImageContext';
import { toast } from 'sonner';
import { API_BASE_URL } from '../App';

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
  
  const processFile = async (file: File) => {
    // Set loading state and show file preview
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);
    
    // Create FileReader for image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Simulate progress (in a real implementation, you would use fetch with XMLHttpRequest for progress)
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

      // Send to API
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        console.log(data.data);
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
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      toast.error('Failed to process image. Please try again.');
      console.error(err);
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
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Upload Product Image</h3>
          <p className="text-muted-foreground">
            Drag and drop an image here, or click to select
          </p>
        </div>
        <label className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer">
          <span>Select Image</span>
          <input 
            type="file" 
            className="hidden"
            accept="image/*" 
            onChange={handleFileSelect} 
          />
        </label>
      </div>
    </div>
  );
};

export default UploadArea;
