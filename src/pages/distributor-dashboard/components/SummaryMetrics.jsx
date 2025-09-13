import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SummaryMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: 'Active Shipments',
      value: '24',
      change: '+3 from yesterday',
      changeType: 'positive',
      icon: 'Truck',
      color: 'blue',
      progress: 75
    },
    {
      id: 2,
      title: 'Delivery Performance',
      value: '94%',
      change: 'On-time delivery rate',
      changeType: 'neutral',
      icon: 'Target',
      color: 'green',
      progress: 94
    },
    {
      id: 3,
      title: 'Verification Rate',
      value: '98.5%',
      change: '+1.2% this week',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'purple',
      progress: 98.5
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        lightBg: 'bg-blue-50',
        text: 'text-blue-600',
        progress: 'bg-blue-500'
      },
      green: {
        bg: 'bg-green-500',
        lightBg: 'bg-green-50',
        text: 'text-green-600',
        progress: 'bg-green-500'
      },
      purple: {
        bg: 'bg-purple-500',
        lightBg: 'bg-purple-50',
        text: 'text-purple-600',
        progress: 'bg-purple-500'
      }
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-primary">
          Performance Metrics
        </h3>
        <div className="text-sm text-text-secondary">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
      </div>
      <div className="space-y-4">
        {metrics?.map((metric, index) => {
          const colorClasses = getColorClasses(metric?.color);
          
          return (
            <motion.div
              key={metric?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${colorClasses?.bg} rounded-xl flex items-center justify-center`}>
                    <Icon name={metric?.icon} size={24} color="white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">
                      {metric?.title}
                    </h4>
                    <p className={`text-sm ${
                      metric?.changeType === 'positive' ?'text-green-600' 
                        : metric?.changeType === 'negative' ?'text-red-600' :'text-text-secondary'
                    }`}>
                      {metric?.change}
                    </p>
                  </div>
                </div>
                <div className={`text-right`}>
                  <div className={`text-3xl font-bold ${colorClasses?.text}`}>
                    {metric?.value}
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Progress</span>
                  <span className={`font-medium ${colorClasses?.text}`}>
                    {metric?.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric?.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-2 rounded-full ${colorClasses?.progress}`}
                  ></motion.div>
                </div>
              </div>
              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">This Week</span>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={metric?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                      className={
                        metric?.changeType === 'positive' ?'text-green-500' 
                          : metric?.changeType === 'negative' ?'text-red-500' :'text-text-secondary'
                      }
                    />
                    <span className={`font-medium ${
                      metric?.changeType === 'positive' ?'text-green-600' 
                        : metric?.changeType === 'negative' ?'text-red-600' :'text-text-secondary'
                    }`}>
                      {metric?.changeType === 'positive' ? '+5.2%' : metric?.changeType === 'negative' ? '-2.1%' : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Quick Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6 bg-gradient-to-r from-gray-50 to-blue-50"
      >
        <h4 className="text-lg font-semibold text-text-primary mb-4">
          Today's Overview
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-text-secondary">Pickups Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-text-secondary">Deliveries Made</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-text-secondary">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-text-secondary">Completed</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryMetrics;