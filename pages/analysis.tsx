import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AnalysisResult from '../components/AnalysisResult';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AnalysisPage() {
  const router = useRouter();
  const [stockName, setStockName] = useState('');
  const [stockExchange, setStockExchange] = useState('NSE');
  const [activeTab, setActiveTab] = useState<'fundamental' | 'technical' | 'sentiment' | 'news' | 'screener'>('fundamental');
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Store responses for each tab
  const [tabResponses, setTabResponses] = useState({
    fundamental: '',
    technical: '',
    sentiment: '',
    news: '',
    screener: ''
  });

  const [tabLoading, setTabLoading] = useState({
    fundamental: false,
    technical: false,
    sentiment: false,
    news: false,
    screener: false
  });

  const tabs = [
    { 
      id: 'fundamental' as const, 
      name: 'Fundamental', 
      icon: '📊',
      color: 'from-blue-500 to-blue-600',
      description: 'Financial Analysis'
    },
    { 
      id: 'technical' as const, 
      name: 'Technical', 
      icon: '📈',
      color: 'from-green-500 to-green-600',
      description: 'Chart Analysis'
    },
    { 
      id: 'sentiment' as const, 
      name: 'Sentiment', 
      icon: '💭',
      color: 'from-purple-500 to-purple-600',
      description: 'Market Sentiment'
    },
    { 
      id: 'news' as const, 
      name: 'News', 
      icon: '📰',
      color: 'from-orange-500 to-orange-600',
      description: 'Latest Updates'
    },
    { 
      id: 'screener' as const, 
      name: 'Screener', 
      icon: '🎯',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Stock Discovery'
    }
  ];

  const popularStocks = [
    'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 
    'SBIN', 'BAJFINANCE', 'LT', 'MARUTI', 'ASIANPAINT'
  ];

  const handleSearch = async () => {
    if (!stockName.trim()) {
      setError('Please enter a stock name or symbol');
      return;
    }
    
    setError('');
    setHasSearched(true);
    
    // Clear all previous responses
    setTabResponses({
      fundamental: '',
      technical: '',
      sentiment: '',
      news: '',
      screener: ''
    });

    // Load data for all tabs
    await loadAllTabs();
  };

  const loadAllTabs = async () => {
    const tabIds = ['fundamental', 'technical', 'sentiment', 'news', 'screener'];
    
    // Load all tabs in parallel
    const promises = tabIds.map(tabId => loadTabData(tabId));
    await Promise.all(promises);
  };

  const loadTabData = async (tabId: string) => {
    setTabLoading(prev => ({ ...prev, [tabId]: true }));
    
    try {
      let apiEndpoint = '';
      let requestBody: any = {};

      switch (tabId) {
        case 'fundamental':
          apiEndpoint = '/api/fundamental-analysis';
          requestBody = { stockName, stockExchange };
          break;
        case 'technical':
          apiEndpoint = '/api/technical-analysis';
          requestBody = { stockName };
          break;
        case 'sentiment':
          apiEndpoint = '/api/sentiment-analysis';
          requestBody = { stockName };
          break;
        case 'news':
          apiEndpoint = '/api/stock-news';
          requestBody = { stockName, newsType: 'specific' };
          break;
        case 'screener':
          apiEndpoint = '/api/stock-screener';
          requestBody = { stockName };
          break;
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to get ${tabId} analysis`);
      }

      setTabResponses(prev => ({ ...prev, [tabId]: data.analysis || data.result }));
    } catch (error: any) {
      console.error(`Error loading ${tabId}:`, error);
      setTabResponses(prev => ({ 
        ...prev, 
        [tabId]: `Error loading ${tabId} analysis: ${error?.message || 'Unknown error'}` 
      }));
    } finally {
      setTabLoading(prev => ({ ...prev, [tabId]: false }));
    }
  };

  const handleStockSelect = (stock: string) => {
    setStockName(stock);
  };

  const clearResults = () => {
    setTabResponses({
      fundamental: '',
      technical: '',
      sentiment: '',
      news: '',
      screener: ''
    });
    setHasSearched(false);
    setStockName('');
    setError('');
    setActiveTab('fundamental');
  };

  const getCurrentTabData = () => {
    return {
      response: tabResponses[activeTab],
      loading: tabLoading[activeTab],
      analysisType: activeTab
    };
  };

  const goBackToLanding = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Head>
        <title>StockMarket Analysis - AI-Powered Stock Analysis</title>
        <meta name="description" content="Get comprehensive stock market analysis powered by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-blue-600 font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">StockMarket</h1>
            </div>
            <button
              onClick={goBackToLanding}
              className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-xl hover:bg-opacity-100 hover:text-gray-900 transition-all duration-200 font-semibold shadow-lg"
            >
              ← Back to Home
            </button>
          </div>

          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">
              📈 Stock Analysis
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              AI-Powered Investment Research Platform
            </p>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Get comprehensive fundamental, technical, sentiment analysis and latest news for any stock
            </p>
          </div>

          {/* Search Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 glass">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol (e.g., RELIANCE, TCS, INFY)"
                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-blue-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                
                <select
                  value={stockExchange}
                  onChange={(e) => setStockExchange(e.target.value)}
                  className="px-6 py-4 text-lg rounded-2xl border-2 border-blue-300 bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                >
                  <option value="NSE" className="text-gray-800">NSE</option>
                  <option value="BSE" className="text-gray-800">BSE</option>
                </select>

                <button
                  onClick={handleSearch}
                  disabled={!stockName.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 btn-gradient"
                >
                  🚀 Analyze Stock
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-500 bg-opacity-20 backdrop-blur-sm rounded-xl text-white text-center">
                  ⚠️ {error}
                </div>
              )}

              {/* Popular Stocks */}
              <div className="mt-6">
                <p className="text-white text-center mb-4 opacity-90">
                  💡 Popular Stocks:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularStocks.map((stock) => (
                    <button
                      key={stock}
                      onClick={() => handleStockSelect(stock)}
                      className="px-4 py-2 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 rounded-xl hover:bg-opacity-100 hover:text-gray-900 transition-all duration-200 text-sm font-bold border border-white shadow-lg"
                    >
                      {stock}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {hasSearched && (
          <>
            {/* Tab Navigation */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Analysis for {stockName}
                    </h2>
                    <p className="text-gray-600">
                      Select a tab to view different types of analysis
                    </p>
                  </div>
                  <button
                    onClick={clearResults}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                  >
                    ✕ Clear All
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="overflow-x-auto">
                <div className="flex min-w-full">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[200px] px-6 py-4 text-center transition-all duration-300 relative ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">{tab.icon}</span>
                        <div>
                          <div className="font-semibold text-lg">{tab.name}</div>
                          <div className="text-sm opacity-75">{tab.description}</div>
                        </div>
                        {tabLoading[tab.id] && (
                          <div className="absolute top-2 right-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {getCurrentTabData().loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <LoadingSpinner analysisType={activeTab} />
                    <p className="mt-4 text-gray-600 text-lg">
                      Loading {tabs.find(t => t.id === activeTab)?.name} analysis...
                    </p>
                  </div>
                ) : getCurrentTabData().response ? (
                  <AnalysisResult
                    result={getCurrentTabData().response}
                    analysisType={activeTab}
                    stockName={stockName}
                    onClear={() => setTabResponses(prev => ({ ...prev, [activeTab]: '' }))}
                  />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">
                      {tabs.find(t => t.id === activeTab)?.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {tabs.find(t => t.id === activeTab)?.name} Analysis
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Search for a stock to view {tabs.find(t => t.id === activeTab)?.description.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Welcome Message when no search */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to StockMarket Analysis
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Enter a stock symbol above to get comprehensive AI-powered analysis across multiple dimensions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
                {tabs.map((tab) => (
                  <div key={tab.id} className="text-center p-6 bg-gray-50 rounded-2xl">
                    <div className="text-3xl mb-3">{tab.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{tab.name}</h3>
                    <p className="text-sm text-gray-600">{tab.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
