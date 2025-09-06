import React from 'react';
import { Leaf, Sprout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 shadow-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-4">
          {/* Custom AgriSense Logo */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
              <Sprout className="w-8 h-8 text-green-900" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
              <Leaf className="w-3 h-3 text-amber-800" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-wide">
              Agri<span className="text-lime-300">Sense</span>
            </h1>
            <p className="text-emerald-100 text-lg font-medium mt-2">
              Smart Agricultural Decision Support System
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-200 text-sm">AI-Powered • Real-time Analysis • Data-Driven Insights</span>
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;