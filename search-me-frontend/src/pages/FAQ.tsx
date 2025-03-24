import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about SearchMe
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">How accurate is the product recognition?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI recognition system is highly accurate and can identify thousands of common products. For best results, upload clear images with good lighting and minimal background clutter. The system continuously improves as more people use it.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">Which online stores does SearchMe search?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We currently search major e-commerce platforms including Amazon, Flipkart, Walmart, eBay, and several other popular online retailers. We're constantly adding more stores to our database to give you the most comprehensive results.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">Is SearchMe free to use?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! SearchMe is completely free for basic usage. We may introduce premium features in the future, but our core service of identifying products and finding where to buy them will always remain free.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">How do you handle my uploaded images?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We respect your privacy. Your uploaded images are processed by our AI system and are not stored permanently on our servers. They are automatically deleted after processing unless you specifically opt to save your search history in your account.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">Can I use SearchMe on my mobile device?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! SearchMe is fully responsive and works great on smartphones and tablets. You can take a picture of a product while shopping and instantly find where it's available online.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium">What types of products can SearchMe identify?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  SearchMe can identify a wide range of consumer products including electronics, clothing, furniture, home goods, beauty products, and much more. Our system is constantly learning and expanding its recognition capabilities to cover more product categories.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium">What if SearchMe can't identify my product?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While our system is quite advanced, there might be cases where it can't identify a product or misidentifies it. In such cases, try uploading a clearer image from a different angle or with better lighting. You can also provide feedback which helps us improve our recognition system.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-8 border border-primary/20 mt-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              We're here to help! Contact our support team and we'll get back to you as soon as possible.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
