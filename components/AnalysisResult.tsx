import React from 'react';

interface AnalysisResultProps {
  result: string;
  analysisType: string;
  stockName?: string;
  onClear: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  analysisType, 
  stockName, 
  onClear 
}) => {
  const getAnalysisTypeIcon = (type: string) => {
    switch (type) {
      case 'fundamental': return '📊';
      case 'technical': return '📈';
      case 'sentiment': return '💭';
      case 'news': return '📰';
      case 'screener': return '🎯';
      default: return '💼';
    }
  };

  const getAnalysisTypeTitle = (type: string) => {
    switch (type) {
      case 'fundamental': return 'Fundamental Analysis Report';
      case 'technical': return 'Technical Analysis Report';
      case 'sentiment': return 'Sentiment Analysis Report';
      case 'news': return 'Stock News & Market Updates';
      case 'screener': return 'Stock Screening Results';
      default: return 'Analysis Report';
    }
  };

  const getAnalysisTypeColor = (type: string) => {
    switch (type) {
      case 'fundamental': return 'from-blue-500 to-blue-600';
      case 'technical': return 'from-green-500 to-green-600';
      case 'sentiment': return 'from-purple-500 to-purple-600';
      case 'news': return 'from-orange-500 to-orange-600';
      case 'screener': return 'from-indigo-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatResult = (text: string) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle bullet points and emoji lists
      if (paragraph.includes('•') || paragraph.includes('✅') || paragraph.includes('📈') || 
          paragraph.includes('⚠️') || paragraph.includes('🚀') || paragraph.includes('💡') ||
          paragraph.includes('📊') || paragraph.includes('💭') || paragraph.includes('🔍')) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="mb-6 p-4 bg-white rounded-xl border-l-4 border-blue-400 shadow-sm">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="mb-2">
                {line.trim() && (
                  <div className={`${
                    line.includes('•') || line.includes('✅') || line.includes('📈') || 
                    line.includes('⚠️') || line.includes('🚀') || line.includes('💡') ||
                    line.includes('📊') || line.includes('💭') || line.includes('🔍')
                      ? 'text-gray-800 pl-2 font-medium' 
                      : 'font-bold text-gray-900 text-lg mb-3'
                  }`}>
                    {line}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      
      // Handle section headers (lines that end with colon or contain numbers like 1️⃣, 2️⃣)
      if ((paragraph.includes(':') && paragraph.length < 100) || 
          /[1-9]️⃣/.test(paragraph) || paragraph.startsWith('#')) {
        return (
          <div key={index} className="mt-8 mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-400 inline-block">
              {paragraph.replace(/^#+\s*/, '')}
            </h3>
          </div>
        );
      }
      
      // Regular paragraphs
      return (
        <div key={index} className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-800 leading-relaxed text-lg font-medium">
            {paragraph}
          </p>
        </div>
      );
    });
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${stockName || 'market'}-${analysisType}-analysis.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getAnalysisTypeColor(analysisType)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
              <span className="text-3xl">{getAnalysisTypeIcon(analysisType)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {getAnalysisTypeTitle(analysisType)}
              </h2>
              {stockName && (
                <p className="text-lg opacity-90 mt-1">
                  Analysis for: <span className="font-semibold">{stockName.toUpperCase()}</span>
                </p>
              )}
              <p className="text-sm opacity-75 mt-1">
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={downloadReport}
              className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 text-gray-800 font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg border border-white border-opacity-50"
            >
              <span>📥</span>
              <span>Download</span>
            </button>
            <button
              onClick={onClear}
              className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 text-gray-800 font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg border border-white border-opacity-50"
            >
              <span>✕</span>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="analysis-content text-gray-900">
            {formatResult(result)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center space-x-2">
              <span>🤖</span>
              <span>Generated by StockGPT AI</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Powered by OpenAI</span>
            </span>
          </div>
          <div className="text-gray-500">
            Report ID: {Date.now().toString(36).toUpperCase()}
          </div>
        </div>
      </div>

      <style jsx>{`
        .analysis-content * {
          color: #1f2937 !important;
        }
        .analysis-content h1,
        .analysis-content h2,
        .analysis-content h3,
        .analysis-content h4,
        .analysis-content h5,
        .analysis-content h6 {
          color: #111827 !important;
          font-weight: bold !important;
        }
        .analysis-content p {
          color: #374151 !important;
        }
        .analysis-content li {
          color: #374151 !important;
        }
        .analysis-content strong {
          color: #111827 !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  );
};

export default AnalysisResult;
