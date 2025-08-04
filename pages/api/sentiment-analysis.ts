import type { NextApiRequest, NextApiResponse } from 'next';
import { getFormattedPrompt } from '../../config/prompts';
import { aiManager } from '../../utils/aiProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("✅ Sentiment Analysis API triggered");

  const { stockName } = req.body;
  console.log("✅ Stock:", stockName);

  if (!stockName || typeof stockName !== 'string') {
    return res.status(400).json({ error: "Invalid or missing stock name in request body." });
  }

  const sentimentAnalysisPrompt = getFormattedPrompt('sentiment', stockName);

  try {
    const result = await aiManager.generateAnalysis(sentimentAnalysisPrompt, 'sentiment');
    
    if (result.success) {
      console.log(`✅ Analysis generated using: ${result.provider}`);
      return res.status(200).json({ 
        result: result.data, 
        analysisType: 'sentiment',
        provider: result.provider,
        isDemo: result.provider === 'demo'
      });
    } else {
      return res.status(500).json({ error: result.error || "Failed to generate analysis" });
    }
  } catch (error) {
    console.error('Sentiment Analysis Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
