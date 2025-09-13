import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const AdminControl = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock user data
  const userData = {
    name: 'Admin User',
    email: 'admin@agritrace.com',
    role: 'admin',
    avatar: null
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'System Alert',
      message: 'High server load detected. Consider scaling resources.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New User Registration',
      message: '5 new farmers registered in the last hour',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: false
    }
  ];

  // Mock system metrics
  const systemMetrics = {
    totalUsers: 1247,
    activeFarms: 342,
    verifiedProducts: 8934,
    totalTransactions: 15678,
    systemUptime: '99.9%',
    avgResponseTime: '120ms'
  };

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'John Mitchell',
      email: 'john.mitchell@greenfarm.com',
      role: 'farmer',
      status: 'active',
      joinDate: '2024-12-15',
      lastActive: '2025-01-13'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'consumer',
      status: 'active',
      joinDate: '2024-11-20',
      lastActive: '2025-01-14'
    },
    {
      id: 3,
      name: 'Mike Distribution Co.',
      email: 'contact@mikedist.com',
      role: 'distributor',
      status: 'pending',
      joinDate: '2025-01-10',
      lastActive: '2025-01-12'
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleUserAction = (userId, action) => {
    console.log(`User ${userId} action: ${action}`);
  };

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'products', label: 'Product Verification', icon: 'Package' },
    { id: 'system', label: 'System Health', icon: 'Activity' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'farmer', label: 'Farmers' },
    { value: 'consumer', label: 'Consumers' },
    { value: 'distributor', label: 'Distributors' },
    { value: 'retailer', label: 'Retailers' }
  ];

  // Set page title
  useEffect(() => {
    document.title = 'Admin Control - AgriTrace';
  }, []);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.role === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <RoleBasedSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        userRole={userData?.role}
        userName={userData?.name}
        userEmail={userData?.email}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-soft sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Page Title */}
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-text-primary">
                  Admin Control Panel
                </h1>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error/10 text-error border border-error/20">
                    <Icon name="Shield" size={12} className="mr-1" strokeWidth={2} />
                    System Administrator
                  </span>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-4">
                <NotificationIndicator
                  notifications={notifications}
                  unreadCount={notifications?.filter(n => !n?.read)?.length}
                  onNotificationClick={handleNotificationClick}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
                <ProfileDropdown
                  userName={userData?.name}
                  userEmail={userData?.email}
                  userRole={userData?.role}
                  userAvatar={userData?.avatar}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} strokeWidth={2} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Tab Content */}
            <div className="space-y-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* System Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-secondary">Total Users</p>
                          <p className="text-3xl font-bold text-primary">{systemMetrics.totalUsers.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Users" size={24} className="text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-secondary">Active Farms</p>
                          <p className="text-3xl font-bold text-success">{systemMetrics.activeFarms}</p>
                        </div>
                        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                          <Icon name="Leaf" size={24} className="text-success" />
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6 bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-secondary">Verified Products</p>
                          <p className="text-3xl font-bold text-secondary">{systemMetrics.verifiedProducts.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={24} className="text-secondary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        iconName="UserPlus"
                        iconPosition="left"
                        className="justify-start"
                        fullWidth
                      >
                        Add New User
                      </Button>
                      <Button
                        variant="outline"
                        iconName="FileText"
                        iconPosition="left"
                        className="justify-start"
                        fullWidth
                      >
                        Generate Report
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Settings"
                        iconPosition="left"
                        className="justify-start"
                        fullWidth
                      >
                        System Settings
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Database"
                        iconPosition="left"
                        className="justify-start"
                        fullWidth
                      >
                        Backup Data
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* User Management Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  {/* Search and Filter */}
                  <div className="glass-card p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="w-full sm:w-48">
                        <Select
                          value={selectedFilter}
                          onValueChange={setSelectedFilter}
                          options={filterOptions}
                        />
                      </div>
                      <Button iconName="Plus" iconPosition="left">
                        Add User
                      </Button>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Join Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                    <Icon name="User" size={16} color="white" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-text-primary">{user.name}</div>
                                    <div className="text-sm text-text-secondary">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.role === 'farmer' ? 'bg-success/10 text-success border border-success/20' :
                                  user.role === 'consumer' ? 'bg-secondary/10 text-secondary border border-secondary/20' :
                                  user.role === 'distributor' ? 'bg-accent/10 text-accent border border-accent/20' :
                                  'bg-gray-100 text-gray-800 border border-gray-200'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === 'active' ? 'bg-success/10 text-success border border-success/20' :
                                  'bg-warning/10 text-warning border border-warning/20'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                {new Date(user.joinDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    iconName="Eye"
                                    onClick={() => handleUserAction(user.id, 'view')}
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    iconName="Edit"
                                    onClick={() => handleUserAction(user.id, 'edit')}
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    iconName="Trash2"
                                    onClick={() => handleUserAction(user.id, 'delete')}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs with placeholder content */}
              {(activeTab === 'products' || activeTab === 'system' || activeTab === 'reports') && (
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon 
                      name={
                        activeTab === 'products' ? 'Package' :
                        activeTab === 'system' ? 'Activity' :
                        'FileText'
                      } 
                      size={32} 
                      color="white" 
                      strokeWidth={2} 
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {activeTab === 'products' ? 'Product Verification' :
                     activeTab === 'system' ? 'System Health' :
                     'Reports & Analytics'}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {activeTab === 'products' ? 'Manage product verification, certifications, and quality control processes.' :
                     activeTab === 'system' ? 'Monitor system performance, server health, and infrastructure metrics.' :
                     'Generate comprehensive reports and analytics for business insights.'}
                  </p>
                  <Button
                    variant="outline"
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={16}
                  >
                    Coming Soon
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminControl;
