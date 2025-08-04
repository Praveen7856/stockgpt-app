import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    router.push('/analysis');
  };

  const popularStocks = [
    'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 
    'SBIN', 'BAJFINANCE', 'LT', 'MARUTI', 'ASIANPAINT'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Head>
        <title>StockMarket - AI-Powered Investment Analysis</title>
        <meta name="description" content="Get comprehensive stock market analysis powered by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">📈</span>
              </div>
              <h1 className="text-5xl font-bold">StockMarket</h1>
            </div>
            
            <h2 className="text-6xl font-bold mb-6">
              AI-Powered Investment Analysis
            </h2>
            <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Get comprehensive stock analysis with our advanced AI technology. 
              Make informed investment decisions with real-time insights.
            </p>

            {/* User Testimonials Floating */}
            <div className="flex justify-center items-center space-x-6 mb-12">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">
                  RS
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">
                  MK
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">
                  AP
                </div>
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold">"Best investment tool I've used!"</p>
                <p className="text-sm opacity-75">- 1,000+ Happy Investors</p>
              </div>
            </div>

            {/* Popular Stocks Section */}
            <div className="mt-8 mb-8">
              <p className="text-white text-center mb-4 opacity-90 text-lg">
                💡 Popular Stocks:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularStocks.map((stock) => (
                  <button
                    key={stock}
                    className="px-4 py-2 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 rounded-xl hover:bg-opacity-100 hover:text-gray-900 transition-all duration-200 text-sm font-bold border border-white shadow-lg"
                  >
                    {stock}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className={`px-12 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-2xl rounded-3xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'
              }`}
            >
              {isLoading ? '🚀 Loading...' : '🚀 Get Started Free'}
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-gray-800 mb-6">
            🎯 Comprehensive Analysis
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI analyzes stocks across multiple dimensions to give you the complete picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: '📊',
              title: 'Fundamental Analysis',
              description: 'Deep dive into financial health, ratios, and company fundamentals',
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: '📈',
              title: 'Technical Analysis', 
              description: 'Chart patterns, indicators, and price action analysis',
              color: 'from-green-500 to-green-600'
            },
            {
              icon: '💭',
              title: 'Sentiment Analysis',
              description: 'Market sentiment and investor psychology insights',
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: '📰',
              title: 'News Analysis',
              description: 'Latest news impact and market-moving events',
              color: 'from-orange-500 to-orange-600'
            },
            {
              icon: '🎯',
              title: 'Stock Screener',
              description: 'Find stocks that match your investment criteria',
              color: 'from-indigo-500 to-indigo-600'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">
              💬 What Investors Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Sharma',
                role: 'Portfolio Manager',
                avatar: 'RS',
                text: 'StockMarket has revolutionized how I analyze investments. The AI insights are incredibly accurate!',
                gradient: 'from-yellow-400 to-orange-500'
              },
              {
                name: 'Meera Krishnan',
                role: 'Day Trader',
                avatar: 'MK', 
                text: 'The technical analysis feature helped me identify perfect entry and exit points. Amazing tool!',
                gradient: 'from-green-400 to-blue-500'
              },
              {
                name: 'Amit Patel',
                role: 'Long-term Investor',
                avatar: 'AP',
                text: 'Finally, a platform that combines all types of analysis in one place. Highly recommended!',
                gradient: 'from-purple-400 to-pink-500'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold text-gray-800">{testimonial.name}</h5>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {'⭐'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-5xl font-bold mb-6">
            🚀 Ready to Start Investing Smarter?
          </h3>
          <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Join thousands of investors who trust StockMarket for their investment decisions
          </p>
          
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className={`px-12 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-2xl rounded-3xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '🚀 Loading...' : '🚀 Start Analyzing Now'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">📈</span>
            </div>
            <h4 className="text-2xl font-bold">StockMarket</h4>
          </div>
          <p className="text-gray-400 mb-6">
            AI-powered investment analysis platform for smarter decisions
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 StockMarket. Making investing accessible to everyone.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .pattern-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
