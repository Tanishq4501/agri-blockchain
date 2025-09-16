import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import TranslateToggle from '../../components/ui/TranslateToggle';
import TranslatableText from '../../components/ui/TranslatableText';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const FarmerEarnings = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [timeFilter, setTimeFilter] = useState('month');
  const [earnings, setEarnings] = useState([]);

  const userData = {
    name: 'John Mitchell',
    email: 'john.mitchell@greenfarm.com',
    role: 'farmer',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of ₹2,250.00 received from Fresh Market Co.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    }
  ];

  const mockEarnings = [
    {
      id: 'PAY-2025-001',
      productName: 'Organic Tomatoes',
      buyer: 'Fresh Market Co.',
      quantity: 500,
      unit: 'kg',
      pricePerUnit: 4.50,
      totalAmount: 2250.00,
      paymentDate: '2025-01-13',
      paymentStatus: 'completed',
      paymentMethod: 'Bank Transfer',
      batchNumber: 'TOM-B001',
      commission: 112.50,
      netEarnings: 2137.50
    },
    {
      id: 'PAY-2025-002',
      productName: 'Fresh Carrots',
      buyer: 'Green Grocers Ltd.',
      quantity: 300,
      unit: 'kg',
      pricePerUnit: 3.20,
      totalAmount: 960.00,
      paymentDate: '2025-01-11',
      paymentStatus: 'completed',
      paymentMethod: 'Digital Wallet',
      batchNumber: 'CAR-B002',
      commission: 48.00,
      netEarnings: 912.00
    },
    {
      id: 'PAY-2025-003',
      productName: 'Organic Lettuce',
      buyer: 'Farm Fresh Supermarket',
      quantity: 150,
      unit: 'kg',
      pricePerUnit: 6.00,
      totalAmount: 900.00,
      paymentDate: '2025-01-14',
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer',
      batchNumber: 'LET-B003',
      commission: 45.00,
      netEarnings: 855.00
    }
  ];

  const timeFilterOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  useEffect(() => {
    setEarnings(mockEarnings);
    document.title = 'Earnings - AgriTrace';
  }, []);

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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'failed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.netEarnings, 0);
  const completedEarnings = earnings.filter(e => e.paymentStatus === 'completed').reduce((sum, earning) => sum + earning.netEarnings, 0);
  const pendingEarnings = earnings.filter(e => e.paymentStatus === 'pending').reduce((sum, earning) => sum + earning.netEarnings, 0);
  const totalCommission = earnings.reduce((sum, earning) => sum + earning.commission, 0);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        userRole={userData?.role}
        userName={userData?.name}
        userEmail={userData?.email}
      />

      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <header className="bg-white border-b border-gray-200 shadow-soft sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <TranslatableText as="h1" className="text-2xl font-bold text-text-primary" text="Earnings" />
              </div>

              <div className="flex items-center space-x-4">
                <TranslateToggle />
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

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/10">
                <div className="flex items-center justify-between">
                  <div>
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Total Earnings" />
                    <p className="text-3xl font-bold text-success">₹{totalEarnings.toFixed(2)}</p>
                  </div>
                  <Icon name="DollarSign" size={24} className="text-success" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Completed" />
                    <p className="text-3xl font-bold text-primary">₹{completedEarnings.toFixed(2)}</p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-primary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-warning/5 to-accent/5 border border-warning/10">
                <div className="flex items-center justify-between">
                  <div>
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Pending" />
                    <p className="text-3xl font-bold text-warning">₹{pendingEarnings.toFixed(2)}</p>
                  </div>
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Commission" />
                    <p className="text-3xl font-bold text-secondary">₹{totalCommission.toFixed(2)}</p>
                  </div>
                  <Icon name="Percent" size={24} className="text-secondary" />
                </div>
              </div>
            </div>

            {/* Filter and Actions */}
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Time Period:" />
                  <Select
                    value={timeFilter}
                    onValueChange={setTimeFilter}
                    options={timeFilterOptions}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    <TranslatableText text="Export Report" />
                  </Button>
                  <Button iconName="Receipt" iconPosition="left">
                    <TranslatableText text="Request Payment" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Earnings List */}
            <div className="grid gap-6">
              {earnings.map((earning, index) => (
                <motion.div
                  key={earning.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 hover-lift"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-lg flex items-center justify-center">
                        <Icon name="DollarSign" size={24} color="white" />
                      </div>
                      <div>
                        <TranslatableText as="h3" className="text-xl font-semibold text-text-primary" text={earning.productName} />
                        <p className="text-text-secondary">{earning.buyer} • {earning.paymentDate}</p>
                        <p className="text-sm text-text-secondary"><TranslatableText text="Batch:" /> {earning.batchNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(earning.paymentStatus)}`}>
                        <Icon name={getPaymentStatusIcon(earning.paymentStatus)} size={12} className="mr-1" />
                        <TranslatableText text={earning.paymentStatus} />
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Quantity Sold" />
                      <p className="text-text-primary font-semibold">{earning.quantity} {earning.unit}</p>
                    </div>
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text={`Price per ${earning.unit}`} />
                      <p className="text-text-primary">₹{earning.pricePerUnit}</p>
                    </div>
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Total Amount" />
                      <p className="text-text-primary font-semibold">₹{earning.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Payment Method" />
                      <p className="text-text-primary">{earning.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                      <div className="flex items-center justify-between">
                        <TranslatableText as="span" className="text-sm font-medium text-text-secondary" text="Platform Commission (5%)" />
                        <span className="text-error font-semibold">-₹{earning.commission.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                      <div className="flex items-center justify-between">
                        <TranslatableText as="span" className="text-sm font-medium text-text-secondary" text="Net Earnings" />
                        <span className="text-success font-bold text-lg">₹{earning.netEarnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Hash" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary font-mono">{earning.id}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                        <TranslatableText text="View Details" />
                      </Button>
                      <Button variant="outline" size="sm" iconName="Receipt" iconPosition="left">
                        <TranslatableText text="Invoice" />
                      </Button>
                      {earning.paymentStatus === 'pending' && (
                        <Button size="sm" iconName="MessageSquare" iconPosition="left">
                          <TranslatableText text="Follow Up" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Monthly Summary Chart Placeholder */}
            <div className="glass-card p-8 mt-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={32} color="white" strokeWidth={2} />
              </div>
              <TranslatableText 
                as="h3" 
                className="text-xl font-semibold text-text-primary mb-2"
                text="Earnings Analytics"
              />
              <TranslatableText 
                as="p" 
                className="text-text-secondary mb-6"
                text="Detailed earnings charts and analytics coming soon. Track your income trends, seasonal patterns, and growth metrics."
              />
              <Button
                variant="outline"
                iconName="BarChart3"
                iconPosition="left"
                iconSize={16}
              >
                <TranslatableText text="View Analytics" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerEarnings;
