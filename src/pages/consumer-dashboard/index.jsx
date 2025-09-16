import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');
  const [qrCode, setQrCode] = useState('');
  const [scannedProducts, setScannedProducts] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  // Get actual logged-in user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (currentUser && Object.keys(currentUser).length > 0) {
      setUserData({
        name: currentUser.name || currentUser.fullName || 'User',
        email: currentUser.email || userEmail,
        role: currentUser.role || userRole,
        avatar: currentUser.avatar || null
      });
    } else {
      // Fallback if no user data found
      setUserData({
        name: 'Consumer User',
        email: userEmail || 'consumer@agritrace.com',
        role: userRole || 'consumer',
        avatar: null
      });
    }
  }, []);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Product Alert',
      message: 'New organic tomatoes from Green Valley Farm are now available in your area',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Verification Complete',
      message: 'Successfully verified organic certification for your recent purchase',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Recall Notice',
      message: 'Product recall issued for batch #ABC-123. Check your purchase history.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true
    }
  ];

  // Mock scanned products data
  const mockScannedProducts = [
    {
      id: 'TOM-2025-001',
      name: 'Organic Tomatoes',
      farmer: 'Green Valley Farm',
      location: 'California, USA',
      harvestDate: '2025-01-10',
      certifications: ['Organic', 'Non-GMO'],
      status: 'verified',
      scanDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      image: null,
      journey: [
        { stage: 'Harvested', date: '2025-01-10', location: 'Green Valley Farm' },
        { stage: 'Processed', date: '2025-01-11', location: 'Valley Processing Co.' },
        { stage: 'Distributed', date: '2025-01-12', location: 'Fresh Market Co.' },
        { stage: 'Retail', date: '2025-01-13', location: 'Local Grocery Store' }
      ]
    },
    {
      id: 'CAR-2025-002',
      name: 'Organic Carrots',
      farmer: 'Sunrise Organic Farm',
      location: 'Oregon, USA',
      harvestDate: '2025-01-08',
      certifications: ['Organic', 'Fair Trade'],
      status: 'verified',
      scanDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      image: null,
      journey: [
        { stage: 'Harvested', date: '2025-01-08', location: 'Sunrise Organic Farm' },
        { stage: 'Packaged', date: '2025-01-09', location: 'Organic Pack Co.' },
        { stage: 'Shipped', date: '2025-01-10', location: 'Regional Distribution' }
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
    { id: 'scan', label: 'Scan Product', icon: 'QrCode' },
    { id: 'history', label: 'Scan History', icon: 'History' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' },
    { id: 'alerts', label: 'Alerts', icon: 'Bell' }
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
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">
                    Consumer Dashboard
                  </h1>
                  <p className="text-text-secondary">Welcome back, {userData?.name || 'Consumer'}!</p>
                </div>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                    <Icon name="Shield" size={12} className="mr-1" strokeWidth={2} />
                    Verified Consumer
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
                        Welcome, {userData?.name?.split(' ')?.[0]}!
                      </h2>
                      <p className="text-text-secondary mt-1">
                        Scan QR codes to verify product authenticity and trace your food's journey from farm to table.
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
                      Scan QR Code
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Icon name="Camera" size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-text-secondary mb-4">
                          Point your camera at the QR code or enter code manually
                        </p>
                        <Button
                          variant="outline"
                          iconName="Camera"
                          iconPosition="left"
                          className="mb-4"
                        >
                          Open Camera
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter QR code manually"
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
                          Scan
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="BarChart3" size={20} className="mr-2" />
                      Your Activity
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="text-2xl font-bold text-primary">{scannedProducts.length}</div>
                        <div className="text-sm text-text-secondary">Products Scanned</div>
                      </div>
                      <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
                        <div className="text-2xl font-bold text-success">
                          {scannedProducts.filter(p => p.status === 'verified').length}
                        </div>
                        <div className="text-sm text-text-secondary">Verified Products</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                        <div className="text-2xl font-bold text-secondary">
                          {new Set(scannedProducts.map(p => p.farmer)).size}
                        </div>
                        <div className="text-sm text-text-secondary">Unique Farms</div>
                      </div>
                      <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/10">
                        <div className="text-2xl font-bold text-accent">
                          {scannedProducts.reduce((acc, p) => acc + p.certifications.length, 0)}
                        </div>
                        <div className="text-sm text-text-secondary">Certifications</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scan History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-primary">Scan History</h3>
                    <Button variant="outline" iconName="Download" iconPosition="left">
                      Export History
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
                            <label className="text-sm font-medium text-text-secondary">Harvest Date</label>
                            <p className="text-text-primary">{product.harvestDate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Scan Date</label>
                            <p className="text-text-primary">{product.scanDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Product ID</label>
                            <p className="text-text-primary font-mono text-sm">{product.id}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="text-sm font-medium text-text-secondary mb-2 block">Certifications</label>
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
                              {product.journey.length} tracking points
                            </span>
                          </div>
                          <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                            View Journey
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
                    Favorite Products
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Save your favorite products and farmers to easily track them and get notifications about new harvests.
                  </p>
                  <Button
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Add Favorites
                  </Button>
                </div>
              )}

              {/* Alerts Tab */}
              {activeTab === 'alerts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-primary">Product Alerts</h3>
                    <Button variant="outline" iconName="Settings" iconPosition="left">
                      Alert Settings
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
