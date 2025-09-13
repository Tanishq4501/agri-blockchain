import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTimeline = ({ timeline }) => {
  const [expandedStage, setExpandedStage] = useState(null);

  if (!timeline || timeline?.length === 0) return null;

  const getStageIcon = (stage) => {
    switch (stage?.toLowerCase()) {
      case 'harvested':
        return 'Sprout';
      case 'processed':
        return 'Settings';
      case 'packaged':
        return 'Package';
      case 'shipped':
        return 'Truck';
      case 'distributed':
        return 'Building2';
      case 'retail':
        return 'Store';
      case 'delivered':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getStageColor = (stage, isCompleted) => {
    if (!isCompleted) return 'text-gray-400 bg-gray-100';
    
    switch (stage?.toLowerCase()) {
      case 'harvested':
        return 'text-green-600 bg-green-100';
      case 'processed':
        return 'text-blue-600 bg-blue-100';
      case 'packaged':
        return 'text-purple-600 bg-purple-100';
      case 'shipped':
        return 'text-orange-600 bg-orange-100';
      case 'distributed':
        return 'text-indigo-600 bg-indigo-100';
      case 'retail':
        return 'text-pink-600 bg-pink-100';
      case 'delivered':
        return 'text-success bg-success/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const toggleExpanded = (index) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevated border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Product Journey</h2>
        <p className="text-text-secondary">
          Track your product's complete journey from farm to table
        </p>
      </div>
      {/* Desktop Timeline - Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>
          <div 
            className="absolute top-8 left-0 h-0.5 bg-primary transition-all duration-1000 ease-out"
            style={{ 
              width: `${(timeline?.filter(item => item?.completed)?.length / timeline?.length) * 100}%` 
            }}
          ></div>

          {/* Timeline Items */}
          <div className="flex justify-between relative">
            {timeline?.map((item, index) => (
              <div key={index} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Stage Icon */}
                <button
                  onClick={() => toggleExpanded(index)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-soft transition-all duration-300 hover:scale-110 ${
                    getStageColor(item?.stage, item?.completed)
                  } ${item?.completed ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <Icon 
                    name={getStageIcon(item?.stage)} 
                    size={24} 
                    strokeWidth={2}
                  />
                </button>

                {/* Stage Info */}
                <div className="mt-4 text-center max-w-32">
                  <h3 className={`text-sm font-semibold ${
                    item?.completed ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {item?.stage}
                  </h3>
                  {item?.completed && (
                    <>
                      <p className="text-xs text-text-secondary mt-1">{item?.location}</p>
                      <p className="text-xs text-text-secondary">{item?.date}</p>
                    </>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedStage === index && item?.completed && (
                  <div className="absolute top-20 mt-8 bg-white rounded-lg shadow-floating border border-gray-200 p-4 w-64 z-10 animate-scale-in">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} className="text-primary" />
                        <span className="text-sm font-medium">{item?.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-sm">{item?.date} at {item?.time}</span>
                      </div>
                      {item?.handler && (
                        <div className="flex items-center space-x-2">
                          <Icon name="User" size={16} className="text-primary" />
                          <span className="text-sm">{item?.handler}</span>
                        </div>
                      )}
                      {item?.temperature && (
                        <div className="flex items-center space-x-2">
                          <Icon name="Thermometer" size={16} className="text-primary" />
                          <span className="text-sm">{item?.temperature}</span>
                        </div>
                      )}
                      {item?.notes && (
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-xs text-text-secondary">{item?.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Timeline - Vertical */}
      <div className="md:hidden space-y-4">
        {timeline?.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Stage Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              getStageColor(item?.stage, item?.completed)
            }`}>
              <Icon 
                name={getStageIcon(item?.stage)} 
                size={20} 
                strokeWidth={2}
              />
            </div>

            {/* Stage Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-lg font-semibold ${
                  item?.completed ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {item?.stage}
                </h3>
                {item?.completed && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Icon 
                      name={expandedStage === index ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                    />
                  </button>
                )}
              </div>

              {item?.completed && (
                <div className="space-y-1">
                  <p className="text-sm text-text-secondary">{item?.location}</p>
                  <p className="text-sm text-text-secondary">{item?.date} at {item?.time}</p>
                </div>
              )}

              {/* Expanded Details */}
              {expandedStage === index && item?.completed && (
                <div className="mt-3 bg-muted rounded-lg p-3 animate-fade-in">
                  <div className="space-y-2">
                    {item?.handler && (
                      <div className="flex items-center space-x-2">
                        <Icon name="User" size={14} className="text-primary" />
                        <span className="text-sm">Handled by: {item?.handler}</span>
                      </div>
                    )}
                    {item?.temperature && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Thermometer" size={14} className="text-primary" />
                        <span className="text-sm">Temperature: {item?.temperature}</span>
                      </div>
                    )}
                    {item?.notes && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-text-secondary">{item?.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline Line */}
              {index < timeline?.length - 1 && (
                <div className={`w-0.5 h-8 ml-6 mt-2 ${
                  item?.completed ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Progress Summary */}
      <div className="mt-8 bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Journey Progress</span>
          <span className="text-sm text-text-secondary">
            {timeline?.filter(item => item?.completed)?.length} of {timeline?.length} stages completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${(timeline?.filter(item => item?.completed)?.length / timeline?.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductTimeline;