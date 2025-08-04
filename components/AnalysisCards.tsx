import React from 'react';

interface AnalysisCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  color: string;
  disabled?: boolean;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  color, 
  disabled = false 
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${
        disabled 
          ? 'bg-gray-100 cursor-not-allowed opacity-50' 
          : `bg-white hover:shadow-2xl hover:scale-105 cursor-pointer border-2 border-transparent hover:${color.replace('border-', 'border-')}`
      }`}
      onClick={disabled ? undefined : onClick}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${color.replace('border-', 'bg-').replace('-500', '-500')}`}></div>
      
      <div className="relative p-6">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl ${color.replace('border-', 'bg-').replace('-500', '-100')} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <span className="text-2xl">→</span>
        </div>
        
        {/* Bottom border accent */}
        <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${color.replace('border-', 'bg-')}`}></div>
      </div>
    </div>
  );
};

interface AnalysisCardsProps {
  onAnalysisSelect: (type: string, stockName?: string, additionalData?: any) => void;
  stockName: string;
  loading: boolean;
}

const AnalysisCards: React.FC<AnalysisCardsProps> = ({ onAnalysisSelect, stockName, loading }) => {
  const analysisTypes = [
    {
      id: 'fundamental',
      title: 'Fundamental Analysis',
      description: 'Deep dive into financial statements, valuation metrics, and growth potential. Includes Warren Buffett investment perspective and detailed ratio analysis.',
      icon: '📊',
      color: 'border-blue-500',
      requiresStock: true,
    },
    {
      id: 'technical',
      title: 'Technical Analysis',
      description: 'Comprehensive chart pattern analysis, technical indicators, support/resistance levels, and actionable trading signals for optimal entry/exit points.',
      icon: '📈',
      color: 'border-green-500',
      requiresStock: true,
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'AI-powered sentiment analysis from latest news sources with positive, negative, and neutral factors affecting stock performance.',
      icon: '💭',
      color: 'border-purple-500',
      requiresStock: true,
    },
    {
      id: 'news-general',
      title: 'Market News',
      description: 'Latest Indian stock market news, major index movements, sector performance, and economic updates affecting the broader market.',
      icon: '📰',
      color: 'border-orange-500',
      requiresStock: false,
    },
    {
      id: 'news-specific',
      title: 'Stock-Specific News',
      description: 'Recent company-specific news, earnings reports, corporate announcements, and developments that could impact the stock price.',
      icon: '🔍',
      color: 'border-red-500',
      requiresStock: true,
    },
    {
      id: 'screener',
      title: 'Stock Screener',
      description: 'Discover undervalued stocks using fundamental metrics, community insights from investor forums, and quantitative screening criteria.',
      icon: '🎯',
      color: 'border-indigo-500',
      requiresStock: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {analysisTypes.map((analysis) => (
        <AnalysisCard
          key={analysis.id}
          title={analysis.title}
          description={analysis.description}
          icon={analysis.icon}
          color={analysis.color}
          disabled={loading || (analysis.requiresStock && !stockName.trim())}
          onClick={() => {
            if (analysis.id.startsWith('news-')) {
              const newsType = analysis.id.split('-')[1];
              onAnalysisSelect('news', stockName, { newsType });
            } else {
              onAnalysisSelect(analysis.id, stockName);
            }
          }}
        />
      ))}
    </div>
  );
};

export default AnalysisCards;
