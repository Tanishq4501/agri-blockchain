import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, error }) => {
  const roles = [
    {
      id: 'farmer',
      label: 'Farmer',
      description: 'Agricultural producers and crop growers',
      icon: 'Sprout',
      color: 'text-green-600'
    },
    {
      id: 'distributor',
      label: 'Distributor',
      description: 'Logistics and transportation providers',
      icon: 'Truck',
      color: 'text-blue-600'
    },
    {
      id: 'consumer',
      label: 'Consumer',
      description: 'End customers and product buyers',
      icon: 'ShoppingCart',
      color: 'text-purple-600'
    },
    {
      id: 'retailer',
      label: 'Retailer',
      description: 'Store owners and wholesalers',
      icon: 'Store',
      color: 'text-orange-600'
    },
    {
      id: 'admin',
      label: 'Administrator',
      description: 'System managers and supervisors',
      icon: 'Shield',
      color: 'text-red-600'
    },
    {
      id: 'regulator',
      label: 'Regulator',
      description: 'Government officials and compliance officers',
      icon: 'FileCheck',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Select Your Role <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles?.map((role) => (
            <button
              key={role?.id}
              type="button"
              onClick={() => onRoleChange(role?.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-soft ${
                selectedRole === role?.id
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`${role?.color} mt-1`}>
                  <Icon name={role?.icon} size={20} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    selectedRole === role?.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {role?.label}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {role?.description}
                  </p>
                </div>
                {selectedRole === role?.id && (
                  <div className="text-primary">
                    <Icon name="CheckCircle" size={16} strokeWidth={2} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        {error && (
          <p className="text-error text-sm mt-2 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;