// AI Analysis Prompts Configuration
// This file contains all the prompts used for different types of stock analysis

export const ANALYSIS_PROMPTS = {
  fundamental: {
    title: "Fundamental Analysis",
    description: "Comprehensive financial analysis with Warren Buffett perspective",
    prompt: `You are a seasoned financial analyst with expertise in fundamental analysis. Analyze the stock {stockName} listed on {stockExchange} exchange and provide a comprehensive fundamental analysis report.

Please structure your analysis in the following 6 sections:

1️⃣ **FINANCIAL HEALTH OVERVIEW**
• Revenue growth trends (last 3-5 years)
• Profit margins and profitability ratios
• Debt-to-equity ratio and financial stability
• Cash flow analysis (operating, investing, financing)
• Return on equity (ROE) and return on assets (ROA)

2️⃣ **VALUATION METRICS**
• Current P/E ratio vs industry average
• Price-to-book (P/B) ratio analysis
• PEG ratio for growth consideration
• Enterprise value to EBITDA
• Dividend yield and payout ratio (if applicable)

3️⃣ **GROWTH POTENTIAL**
• Market position and competitive advantages
• Business model sustainability
• Management quality and corporate governance
• Expansion plans and future prospects
• Industry trends and market opportunities

4️⃣ **RISK ANALYSIS**
• Key business risks and challenges
• Regulatory and compliance risks
• Market and economic sensitivity
• Competition analysis
• Liquidity and solvency concerns

5️⃣ **RECENT NEWS & CATALYSTS**
• Latest quarterly results and guidance
• Recent corporate actions or announcements
• Analyst upgrades/downgrades
• Industry developments affecting the stock
• Management commentary and outlook

6️⃣ **INVESTMENT RECOMMENDATION**
• Overall investment thesis (Buy/Hold/Sell)
• Target price range (if possible)
• Investment horizon recommendation
• Key factors to monitor
• Risk-adjusted return potential

Please provide specific numbers, ratios, and data points wherever possible. Focus on actionable insights that would help an investor make informed decisions.`
  },

  technical: {
    title: "Technical Analysis",
    description: "Chart pattern analysis and trading signals",
    prompt: `You are an expert technical analyst. Provide a comprehensive technical analysis for {stockName} stock.

Structure your analysis as follows:

📈 **PRICE ACTION & TREND ANALYSIS**
• Current trend direction (bullish/bearish/sideways)
• Key support and resistance levels
• Price momentum and volatility analysis
• Moving average positions (20, 50, 200 SMA/EMA)

📊 **TECHNICAL INDICATORS**
• RSI (Relative Strength Index) interpretation
• MACD signal and divergences
• Bollinger Bands analysis
• Volume analysis and patterns
• Stochastic oscillator readings

🎯 **CHART PATTERNS**
• Identify any chart patterns (triangles, flags, head & shoulders, etc.)
• Breakout or breakdown signals
• Candlestick patterns significance
• Gap analysis and implications

⚡ **TRADING SIGNALS**
• Entry and exit points for traders
• Stop-loss recommendations
• Target price levels
• Risk-reward ratio analysis

⏰ **TIME FRAME ANALYSIS**
• Short-term outlook (1-2 weeks)
• Medium-term outlook (1-3 months)
• Long-term technical perspective (6-12 months)

🚨 **KEY LEVELS TO WATCH**
• Critical support levels
• Important resistance zones
• Breakout triggers
• Volume confirmation requirements

Please provide specific price levels and actionable trading insights based on current technical setup.`
  },

  sentiment: {
    title: "Market Sentiment Analysis",
    description: "News sentiment analysis with scoring",
    prompt: `You are a market sentiment analyst. Analyze the current market sentiment for {stockName} stock.

Provide your analysis in the following format:

💭 **OVERALL SENTIMENT SCORE**
Rate the sentiment on a scale of 1-10 (1=Very Bearish, 10=Very Bullish)
Current Score: [X/10]

📰 **NEWS SENTIMENT BREAKDOWN**
• Recent positive news factors
• Recent negative news factors
• Neutral/mixed developments
• Media coverage tone and frequency

🏛️ **INSTITUTIONAL SENTIMENT**
• Analyst recommendations and changes
• Institutional buying/selling activity
• Fund manager opinions and holdings
• Broker target price consensus

🗣️ **SOCIAL MEDIA & RETAIL SENTIMENT**
• Retail investor discussions and mood
• Social media mentions and trends
• Online forum sentiment (Reddit, Twitter, etc.)
• Search interest and popularity trends

📊 **MARKET BEHAVIOR INDICATORS**
• Options flow and put/call ratios
• Short interest levels and changes
• Insider trading activity
• Mutual fund and ETF flows

🔍 **SENTIMENT DRIVERS**
• Key positive factors driving optimism
• Main concerns causing pessimism
• Upcoming events that could shift sentiment
• Seasonal or cyclical sentiment patterns

⚠️ **CONTRARIAN INDICATORS**
• Signs of excessive optimism/pessimism
• Potential sentiment reversal signals
• Market positioning extremes
• Fear & greed indicators

🎯 **SENTIMENT OUTLOOK**
• Expected sentiment direction (next 1-3 months)
• Catalysts that could change sentiment
• Sentiment support/resistance levels
• Investment implications based on sentiment

Provide specific examples and recent developments that support your sentiment analysis.`
  },

  news: {
    title: "Stock News & Market Updates",
    description: "Latest news aggregation and analysis",
    prompt: `You are a financial news analyst. Provide comprehensive news coverage and market updates for {stockName}.

{newsTypePrompt}

Structure your response as follows:

📰 **HEADLINE NEWS SUMMARY**
• Top 3-5 most important recent news items
• Brief impact assessment for each news item
• Timeline of key developments (last 30 days)

🏢 **COMPANY-SPECIFIC UPDATES**
• Earnings announcements and results
• Corporate actions (dividends, splits, buybacks)
• Management changes and strategic decisions
• Product launches or business developments
• Partnership and acquisition news

📊 **FINANCIAL PERFORMANCE NEWS**
• Quarterly/annual results analysis
• Revenue and profit growth updates
• Guidance changes and outlook
• Credit rating changes
• Analyst reactions to financial results

🌍 **INDUSTRY & SECTOR NEWS**
• Industry trends affecting the stock
• Regulatory developments
• Competitive landscape changes
• Sector rotation and investment flows
• Economic factors impacting the industry

📈 **MARKET REACTION ANALYSIS**
• Stock price reaction to recent news
• Volume spikes and trading patterns
• Analyst recommendation changes
• Institutional investor responses
• Peer comparison and relative performance

🔮 **UPCOMING EVENTS CALENDAR**
• Earnings announcement dates
• Important company events and conferences
• Industry events and regulatory deadlines
• Economic data releases affecting the stock
• Potential catalyst events to watch

⚡ **BREAKING NEWS IMPACT**
• Most recent breaking news (if any)
• Immediate market impact assessment
• Potential longer-term implications
• Similar historical precedents
• Risk and opportunity analysis

Focus on factual, recent developments with clear impact assessment on stock performance and investment outlook.`
  },

  screener: {
    title: "Stock Screening & Discovery",
    description: "Undervalued stock discovery with community insights",
    prompt: `You are a stock screening expert and investment researcher. Provide a comprehensive stock screening analysis {stockContext}.

📊 **FUNDAMENTAL SCREENING CRITERIA**
• P/E ratio vs industry peers
• Price-to-book value analysis
• Debt-to-equity ratio assessment
• Return on equity (ROE) comparison
• Revenue and earnings growth rates
• Free cash flow generation
• Dividend yield and sustainability

💰 **VALUE SCREENING METRICS**
• Undervaluation indicators
• Fair value estimation methods
• Asset-based valuation
• Earnings-based valuation
• DCF model insights
• Relative valuation vs peers

🚀 **GROWTH SCREENING FACTORS**
• Revenue growth consistency
• Earnings growth trajectory
• Market share expansion
• Product pipeline and innovation
• Geographic expansion opportunities
• Operating leverage potential

🏆 **QUALITY SCREENING PARAMETERS**
• Management effectiveness
• Corporate governance standards
• Business model sustainability
• Competitive moat strength
• Financial statement quality
• Regulatory compliance record

📈 **MOMENTUM & TECHNICAL SCREENS**
• Price momentum indicators
• Volume and liquidity analysis
• Technical breakout patterns
• Relative strength vs market
• Moving average positioning
• Support and resistance levels

🎯 **SECTOR-SPECIFIC SCREENING**
• Industry-specific metrics
• Sector rotation opportunities
• Peer comparison analysis
• Industry growth prospects
• Regulatory environment assessment
• Market positioning advantages

🌟 **INVESTMENT COMMUNITY INSIGHTS**
• Analyst consensus and recommendations
• Institutional ownership patterns
• Insider buying/selling activity
• Smart money positioning
• Hedge fund holdings
• Mutual fund interest

💡 **SCREENING RECOMMENDATIONS**
• Top screening criteria for current market
• Stocks that pass multiple filters
• Hidden gem identification
• Value trap warnings
• Risk-adjusted opportunity assessment
• Portfolio diversification suggestions

Provide specific screening criteria, metrics, and actionable insights for finding quality investment opportunities.`
  }
};

// News type specific prompts
export const NEWS_TYPE_PROMPTS = {
  general: "Focus on general market news, economic indicators, and broad market trends that could affect stock markets overall. Include global economic developments, central bank policies, and major market-moving events.",
  
  specific: "Focus specifically on news related to {stockName} company, including corporate announcements, earnings reports, management changes, product launches, partnerships, and any company-specific developments.",
  
  daily: "Provide a daily market summary including today's key market movements, top gainers/losers, sector performance, major news events, and market sentiment. Include both domestic and international factors affecting Indian markets."
};

// Helper function to get formatted prompt
export const getFormattedPrompt = (analysisType, stockName, stockExchange = 'NSE', additionalData = {}) => {
  const promptConfig = ANALYSIS_PROMPTS[analysisType];
  if (!promptConfig) {
    throw new Error(`Unknown analysis type: ${analysisType}`);
  }

  let prompt = promptConfig.prompt;
  
  // Replace placeholders
  prompt = prompt.replace(/\{stockName\}/g, stockName);
  prompt = prompt.replace(/\{stockExchange\}/g, stockExchange);
  
  // Handle news type specific prompts
  if (analysisType === 'news' && additionalData.newsType) {
    const newsTypePrompt = NEWS_TYPE_PROMPTS[additionalData.newsType] || NEWS_TYPE_PROMPTS.specific;
    prompt = prompt.replace(/\{newsTypePrompt\}/g, newsTypePrompt.replace(/\{stockName\}/g, stockName));
  }
  
  // Handle screener context
  if (analysisType === 'screener') {
    const stockContext = stockName 
      ? `focusing on ${stockName} and similar stocks in its sector`
      : `for discovering undervalued opportunities across different sectors`;
    prompt = prompt.replace(/\{stockContext\}/g, stockContext);
  }
  
  return prompt;
};

// Export individual prompt configs for easier access
export const {
  fundamental: FUNDAMENTAL_PROMPT,
  technical: TECHNICAL_PROMPT,
  sentiment: SENTIMENT_PROMPT,
  news: NEWS_PROMPT,
  screener: SCREENER_PROMPT
} = ANALYSIS_PROMPTS;
