import React from 'react';
import { Clock, Activity } from 'lucide-react';

interface StatusBarProps {
  message: string;
  isLoading?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ message, isLoading = false }) => {
  const currentTime = new Date().toLocaleString();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-6 py-3 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isLoading ? (
            <Activity className="w-4 h-4 animate-spin text-green-400" />
          ) : (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          )}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <Clock className="w-4 h-4" />
          <span>Last updated: {currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;