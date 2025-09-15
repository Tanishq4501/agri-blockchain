import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import LanguageToggle from '../../components/ui/LanguageToggle';
import ProduceRegistrationForm from './components/ProduceRegistrationForm';
import WalletSection from './components/WalletSection';
import SummaryMetrics from './components/SummaryMetrics';
import QuickActions from './components/QuickActions';
import QRCodeModal from './components/QRCodeModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../utils/translations';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Mock user data
  const userData = {
    name: 'Ramesh Patel (रमेश पटेल)',
    email: 'ramesh@krishifarm.com',
    role: 'farmer',
    avatar: null
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'verification',
      title: 'Product Verified (उत्पाद सत्यापित)',
      message: 'Your organic tomatoes (जैविक टमाटर) batch has been successfully verified by Hariyali Distributors (हरियाली डिस्ट्रिब्यूटर्स)',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Received (भुगतान प्राप्त)',
      message: 'Payment of ₹12,500.00 received from Fresh Bazar Company (फ्रेश बाजार कंपनी) for tomatoes batch #TOM-2025-001',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Certification Expiring (प्रमाणन समाप्त)',
      message: 'Your organic certification (जैविक प्रमाणन) expires in 45 days. Please renew to maintain premium pricing',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const handleProduceSubmit = async (formData) => {
    setIsSubmittingForm(true);
    
    // Simulate API call
    setTimeout(() => {
      setSelectedProductData(formData);
      setIsQRModalOpen(true);
      setIsSubmittingForm(false);
      
      // Switch to overview tab after successful submission
      setActiveTab('overview');
    }, 2000);
  };

  const handleNewProduceClick = () => {
    setActiveTab('register');
  };

  const handleRegenerateQRClick = (productId) => {
    if (productId) {
      // Mock product data for regeneration
      const mockProductData = {
        id: productId,
        cropType: 'Organic Tomatoes (जैविक टमाटर)',
        quantity: '500',
        unit: 'kg',
        harvestDate: '2025-01-10',
        location: 'Hariyali Krishi Farm, Maharashtra, India'
      };
      setSelectedProductData(mockProductData);
      setIsQRModalOpen(true);
    }
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // Handle notification click - could navigate to specific page
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark as read:', notificationId);
    // Handle marking notification as read
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
    // Handle marking all notifications as read
  };

  // Tab configuration
  const tabs = [
    { id: 'overview', label: t('Dashboard'), icon: 'LayoutDashboard' },
    { id: 'register', label: t('Add New Product'), icon: 'Plus' },
    { id: 'wallet', label: 'Wallet', icon: 'Wallet' },
    { id: 'analytics', label: t('Analytics'), icon: 'BarChart3' }
  ];

  // Set page title
  useEffect(() => {
    document.title = 'Farmer Dashboard - AgriTrace';
  }, []);

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
                  {t('Dashboard')}
                </h1>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                    <Icon name="CheckCircle" size={12} className="mr-1" strokeWidth={2} />
                    {isHindi ? 'सत्यापित किसान' : 'Verified Farmer'}
                  </span>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-4">
                <LanguageToggle
                  isHindi={isHindi}
                  onToggle={toggleLanguage}
                />
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
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
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
            {/* Welcome Banner */}
            {activeTab === 'overview' && (
              <div className="glass-card p-6 mb-8 bg-gradient-to-r from-primary/5 to-success/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-soft">
                      <Icon name="Leaf" size={32} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">
                        {isHindi ? `वापस स्वागत है, ${userData?.name?.split(' ')?.[0]}!` : `Welcome back, ${userData?.name?.split(' ')?.[0]}!`}
                      </h2>
                      <p className="text-text-secondary mt-1">
                        {isHindi ? 'अपने कृषि उत्पादों का प्रबंधन करें, आय ट्रैक करें, और अपने कृषि व्यवसाय को बढ़ाएं।' : 'Manage your farm produce, track earnings, and grow your agricultural business.'}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={18}
                      onClick={handleNewProduceClick}
                    >
                      {isHindi ? 'नया उत्पाद पंजीकृत करें' : 'Register New Produce'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <>
                  <SummaryMetrics />
                  <QuickActions
                    onNewProduceClick={handleNewProduceClick}
                    onRegenerateQRClick={handleRegenerateQRClick}
                  />
                </>
              )}

              {activeTab === 'register' && (
                <ProduceRegistrationForm
                  onSubmit={handleProduceSubmit}
                  isLoading={isSubmittingForm}
                />
              )}

              {activeTab === 'wallet' && <WalletSection />}

              {activeTab === 'analytics' && (
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-warning to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="BarChart3" size={32} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {t('Analytics')} {t('Dashboard')}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {isHindi ? 'विस्तृत विश्लेषण और रिपोर्टिंग सुविधाएं जल्द आ रही हैं। अपने खेत के प्रदर्शन, बिक्री रुझान और बाजार अंतर्दृष्टि को ट्रैक करें।' : 'Detailed analytics and reporting features coming soon. Track your farm performance, sales trends, and market insights.'}
                  </p>
                  <Button
                    variant="outline"
                    iconName="TrendingUp"
                    iconPosition="left"
                    iconSize={16}
                  >
                    {isHindi ? 'नमूना रिपोर्ट देखें' : 'View Sample Reports'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        productData={selectedProductData}
      />
    </div>
  );
};

export default FarmerDashboard;