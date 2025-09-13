import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LogisticsTimeline = ({ updates = [] }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    'Picked Up': { color: 'blue', bg: 'bg-blue-100', text: 'text-blue-800', icon: 'MapPin' },
    'In Transit': { color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'Truck' },
    'At Warehouse': { color: 'purple', bg: 'bg-purple-100', text: 'text-purple-800', icon: 'Building' },
    'Out for Delivery': { color: 'orange', bg: 'bg-orange-100', text: 'text-orange-800', icon: 'Package' },
    'Delivered': { color: 'green', bg: 'bg-green-100', text: 'text-green-800', icon: 'CheckCircle' },
    'Delayed': { color: 'red', bg: 'bg-red-100', text: 'text-red-800', icon: 'AlertCircle' },
    'Returned': { color: 'gray', bg: 'bg-gray-100', text: 'text-gray-800', icon: 'RotateCcw' }
  };

  const filterOptions = [
    { value: 'all', label: 'All Updates' },
    { value: 'In Transit', label: 'In Transit' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Delayed', label: 'Delayed' }
  ];

  const filteredUpdates = filterStatus === 'all' 
    ? updates 
    : updates?.filter(update => update?.status === filterStatus);

  const handleCardClick = (updateId) => {
    setExpandedCard(expandedCard === updateId ? null : updateId);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header and Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Logistics Timeline
          </h2>
          <p className="text-text-secondary mt-1">
            Real-time tracking of supply chain movements
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {filterOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Timeline */}
      <div className="glass-card p-6">
        {filteredUpdates?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No Updates Yet
            </h3>
            <p className="text-text-secondary">
              Logistics updates will appear here as products move through the supply chain.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredUpdates?.map((update, index) => {
              const statusInfo = statusConfig?.[update?.status] || statusConfig?.['In Transit'];
              const isExpanded = expandedCard === update?.id;

              return (
                <motion.div
                  key={update?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Line */}
                  {index < filteredUpdates?.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}
                  {/* Timeline Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => handleCardClick(update?.id)}
                    className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-soft border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    {/* Status Icon */}
                    <div className={`w-16 h-16 ${statusInfo?.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon 
                        name={statusInfo?.icon} 
                        size={24} 
                        className={statusInfo?.text}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-text-primary">
                          {update?.productName}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo?.bg} ${statusInfo?.text}`}>
                          {update?.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <Icon name="MapPin" size={14} />
                          <span>{update?.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={14} />
                          <span>{formatTimeAgo(update?.timestamp)}</span>
                        </div>
                        {update?.driverName && (
                          <div className="flex items-center space-x-2">
                            <Icon name="User" size={14} />
                            <span>Driver: {update?.driverName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <Icon name="ChevronDown" size={20} className="text-text-secondary" />
                    </motion.div>
                  </motion.div>
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-20 mt-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-text-primary mb-2">
                              Product Details
                            </h5>
                            <div className="space-y-1 text-text-secondary">
                              <p>Product ID: {update?.productId}</p>
                              <p>Status: {update?.status}</p>
                              <p>Location: {update?.location}</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-text-primary mb-2">
                              Logistics Info
                            </h5>
                            <div className="space-y-1 text-text-secondary">
                              <p>Driver: {update?.driverName || 'Not assigned'}</p>
                              <p>Updated: {new Date(update.timestamp)?.toLocaleString()}</p>
                              {update?.estimatedDelivery && (
                                <p>Est. Delivery: {new Date(update.estimatedDelivery)?.toLocaleDateString()}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="MapPin"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Track Route
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="MessageCircle"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Contact Driver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="FileText"
                            iconPosition="left"
                            iconSize={14}
                          >
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      {/* Timeline Stats */}
      {filteredUpdates?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Timeline Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {updates?.filter(u => u?.status === 'In Transit')?.length}
              </div>
              <div className="text-sm text-blue-800">In Transit</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {updates?.filter(u => u?.status === 'Delivered')?.length}
              </div>
              <div className="text-sm text-green-800">Delivered</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {updates?.length}
              </div>
              <div className="text-sm text-purple-800">Total Updates</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LogisticsTimeline;