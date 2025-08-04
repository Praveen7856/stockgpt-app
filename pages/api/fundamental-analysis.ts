import type { NextApiRequest, NextApiResponse } from 'next';
import { getFormattedPrompt } from '../../config/prompts';
import { aiManager } from '../../utils/aiProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("✅ Fundamental Analysis API triggered");

  const { stockName, stockExchange = 'NSE' } = req.body;
  console.log("✅ Stock:", stockName, "Exchange:", stockExchange);

  if (!stockName || typeof stockName !== 'string') {
    return res.status(400).json({ error: "Invalid or missing stock name in request body." });
  }

  const fundamentalAnalysisPrompt = getFormattedPrompt('fundamental', stockName, stockExchange);

  try {
    const result = await aiManager.generateAnalysis(fundamentalAnalysisPrompt, 'fundamental');
    
    if (result.success) {
      console.log(`✅ Analysis generated using: ${result.provider}`);
      return res.status(200).json({ 
        result: result.data, 
        analysisType: 'fundamental',
        provider: result.provider,
        isDemo: result.provider === 'demo'
      });
    } else {
      return res.status(500).json({ error: result.error || "Failed to generate analysis" });
    }
  } catch (err) {
    console.error("❌ Error generating analysis:", err);
    return res.status(500).json({ error: "Analysis service temporarily unavailable" });
  }
}
