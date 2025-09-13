import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'expiring',
      title: 'Products Expiring Soon',
      message: '5 products will expire within the next 3 days',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'high',
      actionRequired: true,
      products: ['Fresh Spinach', 'Bell Peppers', 'Organic Lettuce']
    },
    {
      id: 2,
      type: 'authenticity',
      title: 'Authenticity Alert',
      message: 'Suspicious verification detected for Bell Peppers batch PEP-2025-003',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'critical',
      actionRequired: true,
      batchId: 'PEP-2025-003'
    },
    {
      id: 3,
      type: 'stock',
      title: 'Low Stock Warning',
      message: 'Organic Carrots inventory below minimum threshold',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'medium',
      actionRequired: false,
      currentStock: '25 kg',
      threshold: '50 kg'
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'expiring':
        return { name: 'Clock', color: 'text-warning' };
      case 'authenticity':
        return { name: 'ShieldAlert', color: 'text-error' };
      case 'stock':
        return { name: 'Package', color: 'text-secondary' };
      default:
        return { name: 'Bell', color: 'text-text-secondary' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-l-error bg-error/5';
      case 'high':
        return 'border-l-warning bg-warning/5';
      case 'medium':
        return 'border-l-secondary bg-secondary/5';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const handleTakeAction = (alert) => {
    console.log('Taking action for alert:', alert);
    // Handle specific actions based on alert type
  };

  if (alerts?.length === 0) return null;

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-warning" strokeWidth={2} />
          Active Alerts ({alerts?.length})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconPosition="left"
          iconSize={16}
          onClick={() => setAlerts([])}
        >
          Dismiss All
        </Button>
      </div>
      <div className="space-y-3">
        {alerts?.map((alert) => {
          const iconConfig = getAlertIcon(alert?.type);
          return (
            <div
              key={alert?.id}
              className={`bg-white rounded-xl p-4 shadow-soft border-l-4 ${getPriorityColor(alert?.priority)} animate-fade-in`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`mt-1 ${iconConfig?.color}`}>
                    <Icon name={iconConfig?.name} size={20} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-text-primary">{alert?.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        alert?.priority === 'critical' ? 'bg-error/10 text-error' :
                        alert?.priority === 'high'? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
                      }`}>
                        {alert?.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">{alert?.message}</p>
                    
                    {/* Additional Details */}
                    {alert?.products && (
                      <div className="mb-2">
                        <p className="text-xs text-text-secondary mb-1">Affected products:</p>
                        <div className="flex flex-wrap gap-1">
                          {alert?.products?.map((product, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-xs text-text-primary rounded-md"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {alert?.batchId && (
                      <p className="text-xs text-text-secondary mb-2">
                        Batch ID: <span className="font-mono font-medium">{alert?.batchId}</span>
                      </p>
                    )}
                    
                    {alert?.currentStock && alert?.threshold && (
                      <p className="text-xs text-text-secondary mb-2">
                        Current: {alert?.currentStock} | Threshold: {alert?.threshold}
                      </p>
                    )}
                    
                    <p className="text-xs text-text-secondary">
                      {formatTimeAgo(alert?.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {alert?.actionRequired && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={14}
                      onClick={() => handleTakeAction(alert)}
                    >
                      Take Action
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    iconSize={16}
                    onClick={() => handleDismissAlert(alert?.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertNotifications;