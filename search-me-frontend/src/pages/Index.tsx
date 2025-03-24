import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadArea from '../components/UploadArea';
import ResultsDisplay from '../components/ResultsDisplay';
import LoadingAnimation from '../components/LoadingAnimation';
import { ImageProvider, useImage } from '../context/ImageContext';

const MainContent: React.FC = () => {
  const { image, isLoading } = useImage();

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
      {!image ? (
        <div className="space-y-12 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-3 py-1 rounded-full shadow-sm bg-primary/10 text-primary text-xs font-medium mb-1 animate-slide-in mt-10">
              Visual product search made easy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Upload an Image, Find Where to Buy It
            </h1>
            <p className="text-xl text-muted-foreground">
              Simply upload a product image, and we'll find it across popular online stores so you can shop with confidence
            </p>
          </div>
          <UploadArea />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-secondary/50 text-center border border-border hover:shadow-md transition-all-200">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-medium">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload Image</h3>
              <p className="text-sm text-muted-foreground">
                Upload any product image or snap a picture
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/50 text-center border border-border hover:shadow-md transition-all-200">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-medium">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Identifies It</h3>
              <p className="text-sm text-muted-foreground">
                Our AI recognizes the product in seconds
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/50 text-center border border-border hover:shadow-md transition-all-200">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-medium">3</span>
              </div>
              <h3 className="font-semibold mb-2">Find Where To Buy</h3>
              <p className="text-sm text-muted-foreground">
                See which stores carry the product online
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? <LoadingAnimation /> : <ResultsDisplay />}
        </>
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ImageProvider>
  );
};

export default Index;
