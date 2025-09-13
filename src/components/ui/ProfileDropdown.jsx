import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ProfileDropdown = ({ 
  userName = 'John Doe',
  userEmail = 'john@example.com',
  userRole = 'farmer',
  userAvatar = null,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    closeDropdown();
    if (onLogout) {
      onLogout();
    }
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

  const menuItems = [
    {
      label: 'My Profile',
      path: `/${userRole}-profile`,
      icon: 'User',
      description: 'View and edit your profile'
    },
    {
      label: 'Account Settings',
      path: `/${userRole}-settings`,
      icon: 'Settings',
      description: 'Manage your account preferences'
    },
    {
      label: 'Notifications',
      path: `/${userRole}-notifications`,
      icon: 'Bell',
      description: 'Configure notification settings'
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      description: 'Get help and contact support'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center shadow-soft">
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt={userName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" strokeWidth={2} />
          )}
        </div>

        {/* User Info (Hidden on mobile) */}
        <div className="hidden sm:block text-left min-w-0">
          <p className="text-sm font-medium text-text-primary truncate max-w-32">
            {userName}
          </p>
          <p className="text-xs text-text-secondary truncate max-w-32 capitalize">
            {userRole}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-floating border border-gray-200 py-2 z-50 animate-scale-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center shadow-soft">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} color="white" strokeWidth={2} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {userName}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {userEmail}
                </p>
                <p className="text-xs text-primary font-medium capitalize mt-1">
                  {userRole} Account
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeDropdown}
                className="flex items-start px-4 py-3 hover:bg-muted transition-colors duration-200 group"
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className="text-text-secondary group-hover:text-primary mt-0.5 mr-3 flex-shrink-0"
                  strokeWidth={2}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary group-hover:text-primary">
                    {item?.label}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {item?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 group"
            >
              <Icon 
                name="LogOut" 
                size={18} 
                className="text-text-secondary group-hover:text-red-600 mr-3"
                strokeWidth={2}
              />
              <div>
                <p className="text-sm font-medium text-text-primary group-hover:text-red-600">
                  Sign Out
                </p>
                <p className="text-xs text-text-secondary">
                  Sign out of your account
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;