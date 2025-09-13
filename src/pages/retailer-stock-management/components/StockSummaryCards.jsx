import React from 'react';
import Icon from '../../../components/AppIcon';

const StockSummaryCards = () => {
  const summaryData = [
    {
      id: 1,
      title: "Total Inventory Value",
      value: "$127,450",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      description: "Current stock valuation"
    },
    {
      id: 2,
      title: "Verification Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "Shield",
      description: "Products verified authentic"
    },
    {
      id: 3,
      title: "Compliance Score",
      value: "98.7%",
      change: "-0.3%",
      changeType: "negative",
      icon: "CheckCircle",
      description: "Regulatory compliance"
    },
    {
      id: 4,
      title: "Expiring Soon",
      value: "23",
      change: "+5",
      changeType: "warning",
      icon: "AlertTriangle",
      description: "Items expiring in 7 days"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData?.map((item) => (
        <div
          key={item?.id}
          className="bg-white rounded-2xl p-6 shadow-soft border border-gray-200 hover:shadow-elevated transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              item?.changeType === 'warning' ?'bg-warning/10 text-warning' :'bg-primary/10 text-primary'
            }`}>
              <Icon name={item?.icon} size={24} strokeWidth={2} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(item?.changeType)}`}>
              <Icon name={getChangeIcon(item?.changeType)} size={16} strokeWidth={2} />
              <span className="text-sm font-medium">{item?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-text-primary">{item?.value}</h3>
            <p className="text-sm font-medium text-text-primary">{item?.title}</p>
            <p className="text-xs text-text-secondary">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockSummaryCards;