import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedSidebar = ({ 
  isCollapsed = false, 
  onToggleCollapse,
  userRole = 'farmer',
  userName = 'John Doe',
  userEmail = 'john@example.com'
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location?.pathname === path;

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        label: 'Dashboard',
        path: `/${userRole}-dashboard`,
        icon: 'LayoutDashboard',
        roleAccess: ['farmer', 'distributor', 'consumer', 'retailer', 'admin', 'regulator']
      }
    ];

    const roleSpecificItems = {
      farmer: [
        { label: 'My Products', path: '/farmer-products', icon: 'Package', roleAccess: ['farmer'] },
        { label: 'Harvest Records', path: '/farmer-harvest', icon: 'Calendar', roleAccess: ['farmer'] },
        { label: 'Earnings', path: '/farmer-earnings', icon: 'DollarSign', roleAccess: ['farmer'] },
        { label: 'Profile', path: '/farmer-profile', icon: 'User', roleAccess: ['farmer'] }
      ],
      distributor: [
        { label: 'Shipments', path: '/distributor-shipments', icon: 'Truck', roleAccess: ['distributor'] },
        { label: 'Scan Products', path: '/distributor-scan', icon: 'QrCode', roleAccess: ['distributor'] },
        { label: 'Routes', path: '/distributor-routes', icon: 'Map', roleAccess: ['distributor'] },
        { label: 'Profile', path: '/distributor-profile', icon: 'User', roleAccess: ['distributor'] }
      ],
      consumer: [
        { label: 'Verify Products', path: '/consumer-verification', icon: 'Shield', roleAccess: ['consumer'] },
        { label: 'My Scans', path: '/consumer-history', icon: 'History', roleAccess: ['consumer'] },
        { label: 'Favorites', path: '/consumer-favorites', icon: 'Heart', roleAccess: ['consumer'] },
        { label: 'Profile', path: '/consumer-profile', icon: 'User', roleAccess: ['consumer'] }
      ],
      retailer: [
        { label: 'Stock Management', path: '/retailer-stock-management', icon: 'Package', roleAccess: ['retailer'] },
        { label: 'Verify Inventory', path: '/retailer-verify', icon: 'CheckCircle', roleAccess: ['retailer'] },
        { label: 'Sales Reports', path: '/retailer-reports', icon: 'BarChart3', roleAccess: ['retailer'] },
        { label: 'Profile', path: '/retailer-profile', icon: 'User', roleAccess: ['retailer'] }
      ],
      admin: [
        { label: 'User Management', path: '/admin-users', icon: 'Users', roleAccess: ['admin'] },
        { label: 'System Analytics', path: '/admin-analytics', icon: 'TrendingUp', roleAccess: ['admin'] },
        { label: 'Compliance', path: '/admin-compliance', icon: 'FileCheck', roleAccess: ['admin'] },
        { label: 'Settings', path: '/admin-settings', icon: 'Settings', roleAccess: ['admin'] }
      ],
      regulator: [
        { label: 'Audit Reports', path: '/regulator-audits', icon: 'FileText', roleAccess: ['regulator'] },
        { label: 'Compliance Status', path: '/regulator-compliance', icon: 'Shield', roleAccess: ['regulator'] },
        { label: 'Violations', path: '/regulator-violations', icon: 'AlertTriangle', roleAccess: ['regulator'] },
        { label: 'Export Data', path: '/regulator-export', icon: 'Download', roleAccess: ['regulator'] }
      ]
    };

    return [...baseItems, ...(roleSpecificItems?.[userRole] || [])];
  };

  const navigationItems = getNavigationItems();

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location?.pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className={`flex items-center px-4 py-6 border-b border-gray-200 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <Link 
          to="/landing-page" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          onClick={closeMobileSidebar}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center shadow-soft">
            <Icon name="Leaf" size={18} color="white" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary tracking-tight">AgriTrace</span>
              <span className="text-xs text-text-secondary -mt-1 capitalize">{userRole} Portal</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            onClick={closeMobileSidebar}
            className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isActive(item?.path)
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-text-secondary hover:text-primary hover:bg-muted'
            } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
            title={isCollapsed ? item?.label : ''}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              strokeWidth={2}
              className={`${isCollapsed ? '' : 'mr-3'} ${
                isActive(item?.path) ? 'text-primary-foreground' : 'group-hover:text-primary'
              }`}
            />
            {!isCollapsed && (
              <span className="truncate">{item?.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className={`px-4 py-4 border-t border-gray-200 ${isCollapsed ? 'text-center' : ''}`}>
        {!isCollapsed ? (
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{userName}</p>
              <p className="text-xs text-text-secondary truncate">{userEmail}</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto">
            <Icon name="User" size={16} color="white" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Collapse Toggle (Desktop Only) */}
      {onToggleCollapse && (
        <div className="hidden lg:block px-4 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={`w-full ${isCollapsed ? 'px-2' : ''}`}
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconPosition={isCollapsed ? "left" : "right"}
            iconSize={16}
          >
            {!isCollapsed && "Collapse"}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 bg-white border-r border-gray-200 shadow-soft transition-all duration-300 ease-in-out ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-elevated border border-gray-200 hover:bg-muted transition-colors duration-200"
        aria-label="Toggle sidebar"
      >
        <Icon name="Menu" size={20} strokeWidth={2} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeMobileSidebar}
          />
          
          {/* Sidebar */}
          <aside className="relative w-64 bg-white shadow-floating animate-slide-in-left">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default RoleBasedSidebar;