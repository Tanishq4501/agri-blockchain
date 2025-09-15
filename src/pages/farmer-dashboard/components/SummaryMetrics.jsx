import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryMetrics = () => {
  const metricsData = [
    {
      id: 1,
      title: 'Total Registered Produce (कुल पंजीकृत उत्पाद)',
      value: '247',
      unit: 'items',
      change: '+18',
      changeType: 'increase',
      icon: 'Package',
      color: 'from-primary to-success',
      description: 'Products registered this month'
    },
    {
      id: 2,
      title: 'Active Listings (सक्रिय सूची)',
      value: '34',
      unit: 'listings',
      change: '+5',
      changeType: 'increase',
      icon: 'ShoppingCart',
      color: 'from-secondary to-blue-400',
      description: 'Currently available for sale'
    },
    {
      id: 3,
      title: 'Monthly Revenue (मासिक आय)',
      value: '₹89,000',
      unit: 'Rupees',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'from-success to-emerald-400',
      description: 'Revenue generated this month'
    },
    {
      id: 4,
      title: 'Quality Score (गुणवत्ता स्कोर)',
      value: '4.8',
      unit: '/5.0',
      change: '+0.2',
      changeType: 'increase',
      icon: 'Star',
      color: 'from-warning to-yellow-400',
      description: 'Average buyer rating'
    },
    {
      id: 5,
      title: 'Verified Buyers (सत्यापित खरीदार)',
      value: '89',
      unit: 'buyers',
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'from-purple-500 to-purple-400',
      description: 'Unique verified buyers'
    },
    {
      id: 6,
      title: 'Compliance Rate (अनुपालन दर)',
      value: '98.5%',
      unit: 'compliance',
      change: '+1.2%',
      changeType: 'increase',
      icon: 'Shield',
      color: 'from-green-500 to-green-400',
      description: 'Quality standards met'
    }
  ];

  const getChangeIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
          <Icon name="BarChart3" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">Performance Overview</h2>
          <p className="text-sm text-text-secondary">Key metrics and performance indicators</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData?.map((metric) => (
          <div key={metric?.id} className="glass-card p-6 hover-lift hover-glow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${metric?.color} rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={metric?.icon} size={24} color="white" strokeWidth={2} />
              </div>
              <div className={`flex items-center space-x-1 ${getChangeColor(metric?.changeType)}`}>
                <Icon 
                  name={getChangeIcon(metric?.changeType)} 
                  size={14} 
                  strokeWidth={2}
                />
                <span className="text-sm font-medium">{metric?.change}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary leading-tight">
                {metric?.title}
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-text-primary">
                  {metric?.value}
                </span>
                <span className="text-sm text-text-secondary">
                  {metric?.unit}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {metric?.description}
              </p>
            </div>

            {/* Progress indicator for certain metrics */}
            {metric?.id === 6 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-success to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: metric?.value }}
                  ></div>
                </div>
              </div>
            )}

            {metric?.id === 4 && (
              <div className="mt-4 flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className={star <= Math.floor(parseFloat(metric?.value)) ? 'text-warning fill-current' : 'text-gray-300'}
                    strokeWidth={1}
                  />
                ))}
                <span className="text-xs text-text-secondary ml-2">
                  Based on 156 reviews
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Insights */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-blue-400 rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={16} color="white" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Quick Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" strokeWidth={2} />
              <span className="text-sm font-medium text-success">Growth Opportunity</span>
            </div>
            <p className="text-sm text-text-secondary">
              Your organic produce (जैविक उत्पाद) has 23% higher demand. Consider increasing organic crop allocation.
            </p>
          </div>

          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" strokeWidth={2} />
              <span className="text-sm font-medium text-warning">Action Required</span>
            </div>
            <p className="text-sm text-text-secondary">
              3 quality certifications (गुणवत्ता प्रमाणपत्र) expire within 60 days. Schedule renewal to maintain premium pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryMetrics;