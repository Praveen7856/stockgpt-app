import type { NextApiRequest, NextApiResponse } from 'next';
import { getFormattedPrompt } from '../../config/prompts';
import { aiManager } from '../../utils/aiProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("✅ Stock News API triggered");

  const { stockName, newsType } = req.body;
  console.log("✅ Stock:", stockName, "News Type:", newsType);

  const newsPrompt = getFormattedPrompt('news', stockName, 'NSE', { newsType });

  try {
    const result = await aiManager.generateAnalysis(newsPrompt, 'news');
    
    if (result.success) {
      console.log(`✅ Analysis generated using: ${result.provider}`);
      return res.status(200).json({ 
        result: result.data, 
        analysisType: 'news',
        provider: result.provider,
        isDemo: result.provider === 'demo'
      });
    } else {
      return res.status(500).json({ error: result.error || "Failed to generate analysis" });
    }
  } catch (error) {
    console.error('Stock News Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
