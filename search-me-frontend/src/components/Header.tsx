import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <div className="max-w-3xl w-full rounded-full glass-morphism shadow-lg px-6 py-3 flex items-center justify-between hover:translate-y-[1px]">
        <Link to="/" className="text-xl font-bold text-primary transition-all-200 hover:opacity-80">
          SearchMe
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-all-200 relative py-1",
              isActive('/') 
                ? "text-primary" 
                : "text-foreground/70 hover:text-primary"
            )}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
            )}
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium transition-all-200 relative py-1",
              isActive('/about') 
                ? "text-primary" 
                : "text-foreground/70 hover:text-primary"
            )}
          >
            About
            {isActive('/about') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
            )}
          </Link>
          <Link 
            to="/faq" 
            className={cn(
              "text-sm font-medium transition-all-200 relative py-1",
              isActive('/faq') 
                ? "text-primary" 
                : "text-foreground/70 hover:text-primary"
            )}
          >
            FAQ
            {isActive('/faq') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
            )}
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button 
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all-200"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[75vw] max-w-xs p-0 bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all-200"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={cn(
                    "text-lg font-medium transition-all-200 py-2 pl-3 rounded-md",
                    isActive('/') 
                      ? "bg-primary/10 text-primary border-l-2 border-primary" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary hover:pl-5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={cn(
                    "text-lg font-medium transition-all-200 py-2 pl-3 rounded-md",
                    isActive('/about') 
                      ? "bg-primary/10 text-primary border-l-2 border-primary" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary hover:pl-5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/faq" 
                  className={cn(
                    "text-lg font-medium transition-all-200 py-2 pl-3 rounded-md",
                    isActive('/faq') 
                      ? "bg-primary/10 text-primary border-l-2 border-primary" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary hover:pl-5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
