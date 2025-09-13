import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      text: 'Secure Login',
      description: 'Multi-layer security protection'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform',
      description: 'Trusted by agricultural professionals'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-text-primary mb-2">
          Your Security is Our Priority
        </p>
        <p className="text-xs text-text-secondary">
          AgriTrace uses industry-standard security measures to protect your account
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon 
                name={feature?.icon} 
                size={16} 
                className="text-success"
                strokeWidth={2}
              />
            </div>
            <p className="text-xs font-medium text-text-primary mb-1">
              {feature?.text}
            </p>
            <p className="text-xs text-text-secondary leading-tight">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityIndicators;