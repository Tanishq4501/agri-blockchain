import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockCredentialsInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    { role: 'Farmer', email: 'farmer@agritrace.com', password: 'farmer123' },
    { role: 'Distributor', email: 'distributor@agritrace.com', password: 'distributor123' },
    { role: 'Consumer', email: 'consumer@agritrace.com', password: 'consumer123' },
    { role: 'Retailer', email: 'retailer@agritrace.com', password: 'retailer123' },
    { role: 'Admin', email: 'admin@agritrace.com', password: 'admin123' },
    { role: 'Regulator', email: 'regulator@agritrace.com', password: 'regulator123' }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-6 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-secondary">Demo Credentials</span>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={toggleExpanded}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={14}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-text-secondary">
            Use these credentials to test different user roles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockCredentials?.map((cred, index) => (
              <div 
                key={index}
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-secondary/30 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-primary">
                    {cred?.role}
                  </span>
                  <Icon name="User" size={12} className="text-text-secondary" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary font-mono">
                    {cred?.email}
                  </p>
                  <p className="text-xs text-text-secondary font-mono">
                    {cred?.password}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start space-x-2 mt-3 p-2 bg-warning/10 rounded-lg">
            <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-warning">
              These are demo credentials for testing purposes only. In production, use your actual login credentials.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockCredentialsInfo;