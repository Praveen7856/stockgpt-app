import { NextApiRequest, NextApiResponse } from 'next';
import { SecureEnvironmentManager } from '../../utils/secureEnvironment';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const envManager = SecureEnvironmentManager.getInstance();
    const status = envManager.getEnvironmentStatus();
    
    // Add status classification for each environment variable
    const enhancedStatus = Object.fromEntries(
      Object.entries(status).map(([key, info]) => {
        let statusType: 'secure' | 'warning' | 'missing';
        
        if (info.masked === 'Not set') {
          statusType = 'missing';
        } else if (info.encrypted) {
          statusType = 'secure';
        } else {
          statusType = 'warning';
        }
        
        return [key, { ...info, status: statusType }];
      })
    );

    // Add general security metrics
    const securityMetrics = {
      totalKeys: Object.keys(enhancedStatus).length,
      encryptedKeys: Object.values(enhancedStatus).filter(info => info.encrypted).length,
      missingKeys: Object.values(enhancedStatus).filter(info => info.status === 'missing').length,
      exposedKeys: Object.values(enhancedStatus).filter(info => info.status === 'warning').length,
    };

    res.status(200).json({
      ...enhancedStatus,
      _metrics: securityMetrics,
      _timestamp: new Date().toISOString(),
      _securityScore: Math.round((securityMetrics.encryptedKeys / (securityMetrics.totalKeys - securityMetrics.missingKeys)) * 100) || 0
    });
  } catch (error: any) {
    console.error('Environment status check failed:', error);
    res.status(500).json({ 
      message: 'Failed to check environment status',
      error: error.message 
    });
  }
}
