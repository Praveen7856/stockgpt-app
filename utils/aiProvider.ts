// AI API utility to handle multiple providers
export interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
  provider?: string;
}

export class AIProviderManager {
  private providers: string[];

  constructor() {
    // Get priority from env or use default
    const priority = process.env.API_PRIORITY || 'openai,huggingface,cohere,google,groq';
    this.providers = priority.split(',').map(p => p.trim());
  }

  async generateAnalysis(prompt: string, analysisType: string): Promise<AIResponse> {
    // Try each provider in priority order
    for (const provider of this.providers) {
      try {
        const result = await this.callProvider(provider, prompt, analysisType);
        if (result.success) {
          return result;
        }
      } catch (error) {
        console.log(`${provider} failed, trying next provider...`);
        continue;
      }
    }

    // If all providers fail, return demo mode
    return this.getDemoAnalysis(analysisType);
  }

  private async callProvider(provider: string, prompt: string, analysisType: string): Promise<AIResponse> {
    switch (provider) {
      case 'openai':
        return await this.callOpenAI(prompt);
      case 'huggingface':
        return await this.callHuggingFace(prompt);
      case 'cohere':
        return await this.callCohere(prompt);
      case 'google':
        return await this.callGoogleAI(prompt);
      case 'groq':
        return await this.callGroq(prompt);
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  private async callOpenAI(prompt: string): Promise<AIResponse> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.choices[0]?.message?.content,
      provider: 'openai'
    };
  }

  private async callHuggingFace(prompt: string): Promise<AIResponse> {
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error('Hugging Face API key not found');
    }

    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Hugging Face API error');
    }

    const data = await response.json();
    return {
      success: true,
      data: data[0]?.generated_text || data.generated_text,
      provider: 'huggingface'
    };
  }

  private async callCohere(prompt: string): Promise<AIResponse> {
    if (!process.env.COHERE_API_KEY) {
      throw new Error('Cohere API key not found');
    }

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Cohere API error');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.generations[0]?.text,
      provider: 'cohere'
    };
  }

  private async callGoogleAI(prompt: string): Promise<AIResponse> {
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('Google AI API key not found');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error('Google AI API error');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.candidates[0]?.content?.parts[0]?.text,
      provider: 'google'
    };
  }

  private async callGroq(prompt: string): Promise<AIResponse> {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('Groq API key not found');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Groq API error');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.choices[0]?.message?.content,
      provider: 'groq'
    };
  }

  private getDemoAnalysis(analysisType: string): AIResponse {
    const demoContent = `# 📊 ${analysisType.toUpperCase()} Analysis

## ⚠️ Demo Mode
*All AI providers are currently unavailable. Showing sample analysis format.*

## Analysis Overview
This is a demonstration of the analysis format. To get real AI-powered analysis, please configure at least one of the following free API keys:

### 🆓 Free Options:
1. **Hugging Face**: Sign up at https://huggingface.co/
2. **Cohere**: Free tier at https://cohere.ai/
3. **Google AI Studio**: Free Gemini API at https://makersuite.google.com/
4. **Groq**: Fast free inference at https://groq.com/

### 💳 Paid Option:
- **OpenAI**: Add credits at https://platform.openai.com/

## Sample Analysis Content
[This would contain detailed analysis specific to ${analysisType}]

## Next Steps
1. Choose a free AI provider above
2. Get your API key
3. Add it to your .env.local file
4. Restart the application

Your analysis platform is ready - just add an AI provider!`;

    return {
      success: true,
      data: demoContent,
      provider: 'demo'
    };
  }
}

export const aiManager = new AIProviderManager();
