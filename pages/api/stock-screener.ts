import type { NextApiRequest, NextApiResponse } from 'next';
import { getFormattedPrompt } from '../../config/prompts';
import { aiManager } from '../../utils/aiProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("✅ Stock Screener API triggered");

  const { stockName } = req.body;
  console.log("✅ Stock:", stockName);

  const screenerPrompt = getFormattedPrompt('screener', stockName || '');

  try {
    const result = await aiManager.generateAnalysis(screenerPrompt, 'screener');
    
    if (result.success) {
      console.log(`✅ Analysis generated using: ${result.provider}`);
      return res.status(200).json({ 
        result: result.data, 
        analysisType: 'screener',
        provider: result.provider,
        isDemo: result.provider === 'demo'
      });
    } else {
      return res.status(500).json({ error: result.error || "Failed to generate analysis" });
    }
  } catch (error) {
    console.error('Stock Screener Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
