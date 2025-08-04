# StockGPT Prompts Configuration

This document explains how to manage and customize AI analysis prompts in the StockGPT application.

## Overview

All AI prompts are centralized in `/config/prompts.js` for easy management and customization. This allows you to:

- ✅ Update prompts without touching API code
- ✅ Add new analysis types easily
- ✅ Maintain consistency across all endpoints
- ✅ Version control prompt changes
- ✅ A/B test different prompt variations

## File Structure

```
/config/prompts.js
├── ANALYSIS_PROMPTS          # Main prompts object
├── NEWS_TYPE_PROMPTS         # News-specific prompts
├── getFormattedPrompt()      # Helper function
└── Individual exports        # For direct access
```

## Available Analysis Types

### 1. **Fundamental Analysis** (`fundamental`)
- **Purpose**: Warren Buffett-style financial analysis
- **Sections**: Financial health, valuation, growth, risks, news, recommendations
- **Variables**: `{stockName}`, `{stockExchange}`

### 2. **Technical Analysis** (`technical`)
- **Purpose**: Chart patterns and trading signals
- **Sections**: Price action, indicators, patterns, signals, timeframes
- **Variables**: `{stockName}`

### 3. **Sentiment Analysis** (`sentiment`)
- **Purpose**: Market sentiment with scoring (1-10)
- **Sections**: News sentiment, institutional views, social media, outlook
- **Variables**: `{stockName}`

### 4. **Stock News** (`news`)
- **Purpose**: News aggregation and analysis
- **Types**: `general`, `specific`, `daily`
- **Variables**: `{stockName}`, `{newsTypePrompt}`

### 5. **Stock Screener** (`screener`)
- **Purpose**: Stock discovery and screening
- **Sections**: Fundamental metrics, value analysis, growth factors
- **Variables**: `{stockName}`, `{stockContext}`

## How to Use

### Basic Usage
```javascript
import { getFormattedPrompt } from '../config/prompts';

// Get a formatted prompt
const prompt = getFormattedPrompt('fundamental', 'RELIANCE', 'NSE');
```

### Advanced Usage
```javascript
// With additional data for news analysis
const newsPrompt = getFormattedPrompt('news', 'TCS', 'NSE', { 
  newsType: 'specific' 
});

// For screener without specific stock
const screenerPrompt = getFormattedPrompt('screener', '');
```

### Direct Access
```javascript
import { FUNDAMENTAL_PROMPT, TECHNICAL_PROMPT } from '../config/prompts';

// Access prompt configuration directly
console.log(FUNDAMENTAL_PROMPT.title);        // "Fundamental Analysis"
console.log(FUNDAMENTAL_PROMPT.description);  // "Comprehensive financial analysis..."
console.log(FUNDAMENTAL_PROMPT.prompt);       // Full prompt template
```

## Adding New Analysis Types

### Step 1: Add to ANALYSIS_PROMPTS
```javascript
export const ANALYSIS_PROMPTS = {
  // ... existing prompts ...
  
  newAnalysis: {
    title: "New Analysis Type",
    description: "Brief description of what this analysis does",
    prompt: `Your detailed prompt template here with {stockName} placeholders...`
  }
};
```

### Step 2: Update API Endpoint
Create `/pages/api/new-analysis.ts`:
```javascript
import { getFormattedPrompt } from '../../config/prompts';

const prompt = getFormattedPrompt('newAnalysis', stockName);
```

### Step 3: Add to Frontend
Update the tabs array in `/pages/index.tsx`:
```javascript
{
  id: 'newAnalysis' as const,
  name: 'New Analysis',
  icon: '🔍',
  color: 'from-teal-500 to-teal-600',
  description: 'Brief Description'
}
```

## Customizing Prompts

### Modify Existing Prompts
1. Open `/config/prompts.js`
2. Find the analysis type you want to modify
3. Update the `prompt` field
4. Save the file - changes take effect immediately

### Adding Variables
Variables are replaced using string replacement:
- `{stockName}` → Actual stock name (e.g., "RELIANCE")
- `{stockExchange}` → Exchange name (e.g., "NSE")
- Custom variables can be added in `getFormattedPrompt()`

### News Type Customization
Modify `NEWS_TYPE_PROMPTS` to change how different news types are handled:
```javascript
export const NEWS_TYPE_PROMPTS = {
  general: "Your general market news prompt...",
  specific: "Your company-specific news prompt...",
  daily: "Your daily summary prompt...",
  custom: "Your new custom news type..."
};
```

## Best Practices

### ✅ Do's
- Use clear, specific instructions in prompts
- Include examples where helpful
- Structure output with emojis and headers
- Test prompts with different stock names
- Keep prompts focused on specific analysis goals

### ❌ Don'ts
- Don't make prompts too long (max 4000 tokens)
- Avoid ambiguous instructions
- Don't hardcode specific stock names in templates
- Don't mix different analysis types in one prompt

## Examples

### Adding Options Analysis
```javascript
options: {
  title: "Options Analysis",
  description: "Options chain and volatility analysis",
  prompt: `Analyze options activity for {stockName}...
  
  📊 **Options Chain Analysis**
  • Current implied volatility levels
  • Put/call ratio analysis
  • Unusual options activity
  
  ⚡ **Trading Strategies**
  • Suggested options strategies
  • Risk/reward analysis
  • Expiration considerations`
}
```

### Custom News Type
```javascript
// In NEWS_TYPE_PROMPTS
earnings: "Focus specifically on earnings-related news for {stockName}, including quarterly results, guidance updates, analyst reactions, and earnings call highlights."
```

## Troubleshooting

### Common Issues
1. **Variable not replaced**: Check spelling of `{variableName}`
2. **Prompt too long**: Reduce content or split into sections
3. **API errors**: Verify prompt syntax and OpenAI limits

### Testing Prompts
```javascript
// Test prompt generation
const testPrompt = getFormattedPrompt('fundamental', 'TEST_STOCK', 'NSE');
console.log(testPrompt);
```

## Version History

- **v1.0**: Initial prompts implementation
- **v1.1**: Added centralized configuration
- **v1.2**: Enhanced with news type support
- **Future**: Will add more analysis types based on user feedback

---

**📝 Note**: Always test prompt changes with different stock symbols to ensure they work correctly across various scenarios.
