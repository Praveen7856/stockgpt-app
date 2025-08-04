import React, { useState, useEffect } from 'react';
import { getMaskedEnvVar } from '../utils/secureEnvironment';

interface EnvironmentStatus {
  [key: string]: {
    encrypted: boolean;
    masked: string;
    status: 'secure' | 'warning' | 'missing';
  };
}

export const SecurityStatus: React.FC = () => {
  const [envStatus, setEnvStatus] = useState<EnvironmentStatus>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check environment status
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/env-status');
        const data = await response.json();
        setEnvStatus(data);
      } catch (error) {
        console.error('Failed to fetch environment status:', error);
      }
    };

    checkStatus();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'missing': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure': return '🔒';
      case 'warning': return '⚠️';
      case 'missing': return '❌';
      default: return '❓';
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <span>🔐</span>
          <span>Security Status</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">🔐 Environment Security</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        {Object.entries(envStatus).map(([key, info]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium">{key}:</span>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(info.status)}`}>
                {getStatusIcon(info.status)} {info.encrypted ? 'Encrypted' : 'Plain Text'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <p className="text-xs text-gray-600">
          <strong>🔒 Encrypted:</strong> Values are securely encrypted<br/>
          <strong>⚠️ Plain Text:</strong> Values are exposed in plain text<br/>
          <strong>❌ Missing:</strong> API key not configured
        </p>
      </div>
      
      <div className="mt-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(envStatus, null, 2));
            alert('Environment status copied to clipboard');
          }}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          📋 Copy Status
        </button>
      </div>
    </div>
  );
};

export default SecurityStatus;
