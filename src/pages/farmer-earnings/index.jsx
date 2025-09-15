import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import LanguageToggle from '../../components/ui/LanguageToggle';
import GeminiToggle from '../../components/ui/GeminiToggle';
import { useLanguage } from '../../utils/translations';
import { useGeminiTranslation } from '../../hooks/useGeminiTranslation';

const FarmerEarnings = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const { translateText, isGeminiEnabled, toggleGemini, isTranslating } = useGeminiTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [timeFilter, setTimeFilter] = useState('month');
  const [earnings, setEarnings] = useState([]);

  const userData = {
    name: 'Ramesh Patel (रमेश पटेल)',
    email: 'ramesh.patel@organicfarm.com',
    role: 'farmer',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Received (भुगतान प्राप्त)',
      message: 'Payment of ₹1,01,250 received from Reliance Fresh (रिलायंस फ्रेश से भुगतान)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    }
  ];

  const mockEarnings = [
    {
      id: 'PAY-2025-001',
      productName: 'Organic Alphonso Mangoes (जैविक आम)',
      buyer: 'Reliance Fresh (रिलायंस फ्रेश)',
      quantity: 500,
      unit: 'kg',
      pricePerUnit: 450,
      totalAmount: 225000,
      paymentDate: '2025-01-13',
      paymentStatus: 'completed',
      paymentMethod: 'UPI Transfer',
      batchNumber: 'MAN-B001',
      commission: 11250,
      netEarnings: 213750
    },
    {
      id: 'PAY-2025-002',
      productName: 'Organic Basmati Rice (जैविक बासमती)',
      buyer: 'Big Bazaar (बिग बाजार)',
      quantity: 1000,
      unit: 'kg',
      pricePerUnit: 180,
      totalAmount: 180000,
      paymentDate: '2025-01-11',
      paymentStatus: 'completed',
      paymentMethod: 'NEFT Transfer',
      batchNumber: 'RIC-B002',
      commission: 9000,
      netEarnings: 171000
    },
    {
      id: 'PAY-2025-003',
      productName: 'Organic Turmeric (जैविक हल्दी)',
      buyer: 'Nature\'s Basket (नेचर्स बास्केट)',
      quantity: 200,
      unit: 'kg',
      pricePerUnit: 1200,
      totalAmount: 240000,
      paymentDate: '2025-01-14',
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer (RTGS)',
      batchNumber: 'TUR-B003',
      commission: 12000,
      netEarnings: 228000
    }
  ];

  const timeFilterOptions = [
    { value: 'week', label: 'This Week (इस सप्ताह)' },
    { value: 'month', label: 'This Month (इस महीने)' },
    { value: 'quarter', label: 'This Quarter (इस तिमाही)' },
    { value: 'year', label: 'This Year (इस वर्ष)' }
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
                <h1 className="text-2xl font-bold text-text-primary">Earnings (आय)</h1>
              </div>

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

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Earnings (कुल आय)</p>
                    <p className="text-3xl font-bold text-success">₹{totalEarnings.toFixed(2)}</p>
                  </div>
                  <Icon name="IndianRupee" size={24} className="text-success" />
                  </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Completed (पूर्ण)</p>
                    <p className="text-3xl font-bold text-primary">₹{completedEarnings.toFixed(2)}</p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-primary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-warning/5 to-accent/5 border border-warning/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Pending (लंबित)</p>
                    <p className="text-3xl font-bold text-warning">₹{pendingEarnings.toFixed(2)}</p>
                  </div>
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Commission (कमीशन)</p>
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
                  <label className="text-sm font-medium text-text-secondary">Time Period (समय अवधि):</label>
                  <Select
                    value={timeFilter}
                    onChange={setTimeFilter}
                    options={timeFilterOptions}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    Export Report (रिपोर्ट निर्यात)
                  </Button>
                  <Button iconName="Receipt" iconPosition="left">
                    Request Payment (भुगतान अनुरोध)
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
                        <Icon name="IndianRupee" size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">{earning.productName}</h3>
                        <p className="text-text-secondary">{earning.buyer} • {earning.paymentDate}</p>
                        <p className="text-sm text-text-secondary">Batch: {earning.batchNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(earning.paymentStatus)}`}>
                        <Icon name={getPaymentStatusIcon(earning.paymentStatus)} size={12} className="mr-1" />
                        {earning.paymentStatus === 'completed' ? 'Completed (पूर्ण)' : earning.paymentStatus === 'pending' ? 'Pending (लंबित)' : earning.paymentStatus === 'failed' ? 'Failed (असफल)' : earning.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Quantity Sold (बेची गई मात्रा)</label>
                      <p className="text-text-primary font-semibold">{earning.quantity} {earning.unit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Price per {earning.unit} (प्रति {earning.unit} मूल्य)</label>
                      <p className="text-text-primary">₹{earning.pricePerUnit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Total Amount (कुल राशि)</label>
                      <p className="text-text-primary font-semibold">₹{earning.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Payment Method (भुगतान विधि)</label>
                      <p className="text-text-primary">{earning.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-secondary">Platform Commission (5%) (प्लेटफॉर्म कमीशन)</span>
                        <span className="text-error font-semibold">-₹{earning.commission.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-secondary">Net Earnings (शुद्ध आय)</span>
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
                        View Details (विवरण देखें)
                      </Button>
                      <Button variant="outline" size="sm" iconName="Receipt" iconPosition="left">
                        Invoice (चालान)
                      </Button>
                      {earning.paymentStatus === 'pending' && (
                        <Button size="sm" iconName="MessageSquare" iconPosition="left">
                          Follow Up (अनुवर्ती)
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
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Earnings Analytics (आय विश्लेषण)
              </h3>
              <p className="text-text-secondary mb-6">
                Detailed earnings charts and analytics coming soon. Track your income trends, seasonal patterns, and growth metrics. (विस्तृत आय चार्ट और विश्लेषण जल्द आ रहा है।)
              </p>
              <Button
                variant="outline"
                iconName="BarChart3"
                iconPosition="left"
                iconSize={16}
              >
                View Analytics (विश्लेषण देखें)
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerEarnings;
