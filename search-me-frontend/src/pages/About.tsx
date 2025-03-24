import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About SearchMe</h1>
            <p className="text-xl text-muted-foreground">
              We help you find products online with just a picture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                At SearchMe, we're on a mission to simplify online shopping. We believe finding products online shouldn't require complicated text searches or knowing exact product names. With our AI-powered platform, simply upload a photo of any product, and we'll identify it and show you where you can purchase it online.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">How It Works</h2>
              <p className="text-muted-foreground">
                Our advanced AI technology recognizes products from your uploaded images with remarkable accuracy. Once identified, our search engine scans major e-commerce platforms like Amazon, Flipkart, and more to find where the product is available. The entire process takes just seconds, transforming how you discover and shop for products online.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Technology</h2>
              <p className="text-muted-foreground">
                SearchMe uses state-of-the-art computer vision and machine learning algorithms to analyze your images and match them to millions of products in our database. Our technology can recognize products even from partial images, different angles, or in various lighting conditions, making it incredibly easy to find what you're looking for.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Why Choose SearchMe</h2>
              <p className="text-muted-foreground">
                Unlike traditional search engines that rely on text, SearchMe lets you search visually - the way humans naturally recognize objects. This is particularly helpful when you spot something you like but don't know what it's called, or when text searches aren't yielding the right results. We're removing barriers between seeing something you want and being able to find it online.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
