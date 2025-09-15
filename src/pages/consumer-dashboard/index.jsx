import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import LanguageToggle from '../../components/ui/LanguageToggle';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useLanguage } from '../../utils/translations';

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');
  const [qrCode, setQrCode] = useState('');
  const [scannedProducts, setScannedProducts] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  // Mock user data
  const userData = {
    name: 'Anita Sharma (अनिता शर्मा)',
    email: 'anita.sharma@gmail.com',
    role: 'consumer',
    avatar: null
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Product Alert (उत्पाद अलर्ट)',
      message: 'New organic basmati rice from Krishna Farm is now available in Mumbai markets',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Verification Complete (सत्यापन पूर्ण)',
      message: 'Successfully verified FSSAI organic certification for your recent mango purchase',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Recall Notice (वापसी सूचना)',
      message: 'Product recall issued for batch #MH-123 from Maharashtra. Check your purchase history.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true
    }
  ];

  // Mock scanned products data
  const mockScannedProducts = [
    {
      id: 'MAN-2025-001',
      name: 'Organic Alphonso Mangoes (जैविक आम)',
      farmer: 'Ratnagiri Farms (रत्नागिरी फार्म)',
      location: 'Ratnagiri, Maharashtra',
      harvestDate: '2025-01-10',
      certifications: ['FSSAI Organic', 'GI Tag', 'Export Quality'],
      status: 'verified',
      scanDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      image: null,
      journey: [
        { stage: 'Harvested (फसल काटी)', date: '2025-01-10', location: 'Ratnagiri Farms' },
        { stage: 'Processed (प्रसंस्करण)', date: '2025-01-11', location: 'Maharashtra Processing Unit' },
        { stage: 'Distributed (वितरण)', date: '2025-01-12', location: 'Mumbai Distribution Center' },
        { stage: 'Retail (खुदरा)', date: '2025-01-13', location: 'Reliance Fresh Mumbai' }
      ]
    },
    {
      id: 'RIC-2025-002',
      name: 'Organic Basmati Rice (जैविक बासमती)',
      farmer: 'Punjab Organic Co-op (पंजाब जैविक सहकारी)',
      location: 'Amritsar, Punjab',
      harvestDate: '2025-01-08',
      certifications: ['FSSAI Organic', 'Fair Trade', 'Export Grade'],
      status: 'verified',
      scanDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      image: null,
      journey: [
        { stage: 'Harvested (फसल काटी)', date: '2025-01-08', location: 'Punjab Organic Co-op' },
        { stage: 'Processed (प्रसंस्करण)', date: '2025-01-09', location: 'Amritsar Rice Mill' },
        { stage: 'Packaged (पैकेजिंग)', date: '2025-01-10', location: 'Punjab Packaging Unit' }
      ]
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

  const handleQRScan = async () => {
    if (!qrCode.trim()) return;
    
    setIsScanning(true);
    
    // Simulate API call
    setTimeout(() => {
      const newProduct = {
        id: qrCode.toUpperCase(),
        name: 'Scanned Product',
        farmer: 'Local Farm',
        location: 'Unknown',
        harvestDate: new Date().toISOString().split('T')[0],
        certifications: ['Verified'],
        status: 'verified',
        scanDate: new Date(),
        image: null,
        journey: [
          { stage: 'Scanned', date: new Date().toISOString().split('T')[0], location: 'Consumer App' }
        ]
      };
      
      setScannedProducts(prev => [newProduct, ...prev]);
      setQrCode('');
      setIsScanning(false);
      setActiveTab('history');
    }, 2000);
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

  // Tab configuration
  const tabs = [
    { id: 'scan', label: isHindi ? 'उत्पाद स्कैन करें' : 'Scan Product', icon: 'QrCode' },
    { id: 'history', label: isHindi ? 'स्कैन इतिहास' : 'Scan History', icon: 'History' },
    { id: 'favorites', label: isHindi ? 'पसंदीदा' : 'Favorites', icon: 'Heart' },
    { id: 'alerts', label: isHindi ? 'अलर्ट' : 'Alerts', icon: 'Bell' }
  ];

  // Set page title
  useEffect(() => {
    document.title = 'Consumer Dashboard - AgriTrace';
    setScannedProducts(mockScannedProducts);
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
                  {isHindi ? 'उपभोक्ता डैशबोर्ड' : 'Consumer Dashboard'}
                </h1>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                    <Icon name="Shield" size={12} className="mr-1" strokeWidth={2} />
                    {isHindi ? 'सत्यापित उपभोक्ता' : 'Verified Consumer'}
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
            {/* Welcome Banner */}
            {activeTab === 'scan' && (
              <div className="glass-card p-6 mb-8 bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-soft">
                      <Icon name="QrCode" size={32} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">
                        {isHindi ? `स्वागत है, ${userData?.name?.split(' ')?.[0]}!` : `Welcome, ${userData?.name?.split(' ')?.[0]}!`}
                      </h2>
                      <p className="text-text-secondary mt-1">
                        {isHindi ? 'उत्पाद प्रामाणिकता सत्यापित करने और खेत से मेज तक अपने भोजन की यात्रा का पता लगाने के लिए QR कोड स्कैन करें।' : 'Scan QR codes to verify product authenticity and trace your food\'s journey from farm to table.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Scan Product Tab */}
              {activeTab === 'scan' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* QR Scanner */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="QrCode" size={20} className="mr-2" />
                      {isHindi ? 'QR कोड स्कैन करें' : 'Scan QR Code'}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Icon name="Camera" size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-text-secondary mb-4">
                          {isHindi ? 'अपना कैमरा QR कोड पर इंगित करें या मैन्युअल रूप से कोड दर्ज करें' : 'Point your camera at the QR code or enter code manually'}
                        </p>
                        <Button
                          variant="outline"
                          iconName="Camera"
                          iconPosition="left"
                          className="mb-4"
                        >
                          {isHindi ? 'कैमरा खोलें' : 'Open Camera'}
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder={isHindi ? 'QR कोड मैन्युअल रूप से दर्ज करें' : 'Enter QR code manually'}
                          value={qrCode}
                          onChange={(e) => setQrCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleQRScan}
                          loading={isScanning}
                          iconName="Search"
                          disabled={!qrCode.trim()}
                        >
                          {isHindi ? 'स्कैन करें' : 'Scan'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="BarChart3" size={20} className="mr-2" />
                      {isHindi ? 'आपकी गतिविधि' : 'Your Activity'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="text-2xl font-bold text-primary">{scannedProducts.length}</div>
                        <div className="text-sm text-text-secondary">{isHindi ? 'स्कैन किए गए उत्पाद' : 'Products Scanned'}</div>
                      </div>
                      <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
                        <div className="text-2xl font-bold text-success">
                          {scannedProducts.filter(p => p.status === 'verified').length}
                        </div>
                        <div className="text-sm text-text-secondary">{isHindi ? 'सत्यापित उत्पाद' : 'Verified Products'}</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                        <div className="text-2xl font-bold text-secondary">
                          {new Set(scannedProducts.map(p => p.farmer)).size}
                        </div>
                        <div className="text-sm text-text-secondary">{isHindi ? 'अनोखे फार्म' : 'Unique Farms'}</div>
                      </div>
                      <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/10">
                        <div className="text-2xl font-bold text-accent">
                          {scannedProducts.reduce((acc, p) => acc + p.certifications.length, 0)}
                        </div>
                        <div className="text-sm text-text-secondary">{isHindi ? 'प्रमाणपत्र' : 'Certifications'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scan History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-primary">{isHindi ? 'स्कैन इतिहास' : 'Scan History'}</h3>
                    <Button variant="outline" iconName="Download" iconPosition="left">
                      {isHindi ? 'इतिहास निर्यात करें' : 'Export History'}
                    </Button>
                  </div>
                  
                  <div className="grid gap-6">
                    {scannedProducts.map((product) => (
                      <div key={product.id} className="glass-card p-6 hover-lift">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                              <Icon name="Package" size={20} color="white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-text-primary">{product.name}</h4>
                              <p className="text-text-secondary">{product.farmer} • {product.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'verified' 
                                ? 'bg-success/10 text-success border border-success/20'
                                : 'bg-warning/10 text-warning border border-warning/20'
                            }`}>
                              <Icon 
                                name={product.status === 'verified' ? 'CheckCircle' : 'AlertCircle'} 
                                size={12} 
                                className="mr-1" 
                              />
                              {product.status === 'verified' ? 'Verified' : 'Pending'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="text-sm font-medium text-text-secondary">{isHindi ? 'फसल की तारीख' : 'Harvest Date'}</label>
                            <p className="text-text-primary">{product.harvestDate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">{isHindi ? 'स्कैन की तारीख' : 'Scan Date'}</label>
                            <p className="text-text-primary">{product.scanDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">{isHindi ? 'उत्पाद ID' : 'Product ID'}</label>
                            <p className="text-text-primary font-mono text-sm">{product.id}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="text-sm font-medium text-text-secondary mb-2 block">{isHindi ? 'प्रमाणपत्र' : 'Certifications'}</label>
                          <div className="flex flex-wrap gap-2">
                            {product.certifications.map((cert, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                              >
                                <Icon name="Award" size={12} className="mr-1" />
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" size={16} className="text-text-secondary" />
                            <span className="text-sm text-text-secondary">
                              {product.journey.length} {isHindi ? 'ट्रैकिंग पॉइंट्स' : 'tracking points'}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                            {isHindi ? 'यात्रा देखें' : 'View Journey'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Heart" size={32} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {isHindi ? 'पसंदीदा उत्पाद' : 'Favorite Products'}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {isHindi ? 'अपने पसंदीदा उत्पादों और किसानों को सहेजें ताकि आसानी से उन्हें ट्रैक कर सकें और नई फसल के बारे में सूचनाएं प्राप्त कर सकें।' : 'Save your favorite products and farmers to easily track them and get notifications about new harvests.'}
                  </p>
                  <Button
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    {isHindi ? 'पसंदीदा जोड़ें' : 'Add Favorites'}
                  </Button>
                </div>
              )}

              {/* Alerts Tab */}
              {activeTab === 'alerts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-primary">{isHindi ? 'उत्पाद अलर्ट' : 'Product Alerts'}</h3>
                    <Button variant="outline" iconName="Settings" iconPosition="left">
                      {isHindi ? 'अलर्ट सेटिंग्स' : 'Alert Settings'}
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="glass-card p-4 hover-lift">
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.type === 'success' ? 'bg-success/10 text-success' :
                            notification.type === 'warning' ? 'bg-warning/10 text-warning' :
                            'bg-secondary/10 text-secondary'
                          }`}>
                            <Icon 
                              name={
                                notification.type === 'success' ? 'CheckCircle' :
                                notification.type === 'warning' ? 'AlertTriangle' :
                                'Info'
                              } 
                              size={20} 
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-text-primary">{notification.title}</h4>
                            <p className="text-text-secondary text-sm mt-1">{notification.message}</p>
                            <p className="text-xs text-text-secondary mt-2">
                              {notification.timestamp.toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
