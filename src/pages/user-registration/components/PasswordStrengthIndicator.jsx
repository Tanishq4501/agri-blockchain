import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      numbers: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    score = Object.values(checks)?.filter(Boolean)?.length;
    
    if (score <= 2) return { score, label: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score <= 3) return { score, label: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    if (score <= 4) return { score, label: 'Good', color: 'text-secondary', bgColor: 'bg-secondary' };
    return { score, label: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const strength = getPasswordStrength(password);
  
  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">Password Strength:</span>
        <span className={`text-xs font-medium ${strength?.color}`}>
          {strength?.label}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              level <= strength?.score ? strength?.bgColor : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="space-y-1">
        <PasswordRequirement 
          met={password?.length >= 8} 
          text="At least 8 characters" 
        />
        <PasswordRequirement 
          met={/[a-z]/?.test(password)} 
          text="One lowercase letter" 
        />
        <PasswordRequirement 
          met={/[A-Z]/?.test(password)} 
          text="One uppercase letter" 
        />
        <PasswordRequirement 
          met={/\d/?.test(password)} 
          text="One number" 
        />
        <PasswordRequirement 
          met={/[!@#$%^&*(),.?":{}|<>]/?.test(password)} 
          text="One special character" 
        />
      </div>
    </div>
  );
};

const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center space-x-2">
    <Icon 
      name={met ? "CheckCircle" : "Circle"} 
      size={12} 
      className={met ? "text-success" : "text-gray-300"}
      strokeWidth={2}
    />
    <span className={`text-xs ${met ? "text-success" : "text-text-secondary"}`}>
      {text}
    </span>
  </div>
);

export default PasswordStrengthIndicator;