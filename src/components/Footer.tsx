import React from 'react';
import { Heart, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-900" />
              </div>
              <h3 className="text-2xl font-bold text-white">AgriSense</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Empowering farmers and agricultural professionals with AI-driven insights, 
              data analysis, and smart recommendations for optimal crop management and 
              sustainable farming practices.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for sustainable agriculture</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-400 transition-colors cursor-pointer">Crop Recommendations</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Fertilizer Analysis</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Yield Predictions</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Data Analytics</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-400 transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">API Reference</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Community</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 AgriSense. All rights reserved. 
            <span className="mx-2">|</span>
            Revolutionizing agriculture through smart technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;