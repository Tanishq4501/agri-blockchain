import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationIndicator = ({ 
  notifications = [],
  unreadCount = 0,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event?.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (onMarkAsRead && !notification?.read) {
      onMarkAsRead(notification?.id);
    }
    closeDropdown();
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'error':
        return { name: 'AlertCircle', color: 'text-error' };
      case 'info':
        return { name: 'Info', color: 'text-secondary' };
      case 'shipment':
        return { name: 'Truck', color: 'text-primary' };
      case 'verification':
        return { name: 'Shield', color: 'text-success' };
      case 'compliance':
        return { name: 'FileCheck', color: 'text-warning' };
      default:
        return { name: 'Bell', color: 'text-text-secondary' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Sample notifications if none provided
  const sampleNotifications = [
    {
      id: 1,
      type: 'verification',
      title: 'Product Verified',
      message: 'Organic tomatoes batch #TOM-2025-001 has been successfully verified',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'shipment',
      title: 'Shipment Update',
      message: 'Your shipment is now in transit to Regional Distribution Center',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'compliance',
      title: 'Compliance Check',
      message: 'Monthly compliance report is due in 3 days',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    }
  ];

  const displayNotifications = notifications?.length > 0 ? notifications : sampleNotifications;
  const displayUnreadCount = unreadCount > 0 ? unreadCount : displayNotifications?.filter(n => !n?.read)?.length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Notifications ${displayUnreadCount > 0 ? `(${displayUnreadCount} unread)` : ''}`}
      >
        <Icon 
          name="Bell" 
          size={20} 
          className="text-text-secondary hover:text-primary transition-colors duration-200"
          strokeWidth={2}
        />
        
        {/* Unread Badge */}
        {displayUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-soft">
            {displayUnreadCount > 9 ? '9+' : displayUnreadCount}
          </span>
        )}
      </button>
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-floating border border-gray-200 z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-text-primary">
              Notifications
            </h3>
            {displayUnreadCount > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {displayNotifications?.length > 0 ? (
              <div className="py-2">
                {displayNotifications?.map((notification) => {
                  const iconConfig = getNotificationIcon(notification?.type);
                  return (
                    <button
                      key={notification?.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-200 border-l-4 ${
                        notification?.read 
                          ? 'border-transparent bg-white' :'border-primary bg-primary/5'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 ${iconConfig?.color}`}>
                          <Icon 
                            name={iconConfig?.name} 
                            size={16} 
                            strokeWidth={2}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium truncate ${
                              notification?.read ? 'text-text-secondary' : 'text-text-primary'
                            }`}>
                              {notification?.title}
                            </p>
                            <span className="text-xs text-text-secondary ml-2 flex-shrink-0">
                              {formatTimeAgo(notification?.timestamp)}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 line-clamp-2 ${
                            notification?.read ? 'text-text-secondary' : 'text-text-secondary'
                          }`}>
                            {notification?.message}
                          </p>
                        </div>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Icon 
                  name="Bell" 
                  size={32} 
                  className="text-text-secondary mx-auto mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-text-secondary">
                  No notifications yet
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  You'll see updates about your supply chain activities here
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {displayNotifications?.length > 0 && (
            <div className="border-t border-gray-100 p-3">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
                onClick={closeDropdown}
              >
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIndicator;