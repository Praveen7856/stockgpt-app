import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  analysisType?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Analyzing...", 
  analysisType 
}) => {
  const getAnalysisMessage = (type?: string) => {
    switch (type) {
      case 'fundamental': return 'Analyzing financial statements and valuation metrics...';
      case 'technical': return 'Examining chart patterns and technical indicators...';
      case 'sentiment': return 'Processing latest news and market sentiment...';
      case 'news': return 'Fetching latest market news and updates...';
      case 'screener': return 'Screening stocks based on fundamental criteria...';
      default: return message;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Animated spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
      
      {/* Loading message */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">
          {getAnalysisMessage(analysisType)}
        </p>
        <p className="text-sm text-gray-500">
          This may take a few moments as we gather the latest data
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
