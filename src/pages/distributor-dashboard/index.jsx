import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [logisticsUpdates, setLogisticsUpdates] = useState([]);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  // Logistics form state
  const [logisticsForm, setLogisticsForm] = useState({
    location: '',
    status: '',
    estimatedDelivery: ''
  });

  // Mock user data
  const userData = {
    name: 'Mike Thompson',
    email: 'mike.thompson@quicklogistics.com',
    role: 'distributor',
    avatar: null
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Delivery Completed',
      message: 'Batch #TOM-2025-001 successfully delivered to Fresh Market Co.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Pickup Request',
      message: 'Green Valley Farm has requested pickup for organic vegetables batch',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Route Delay',
      message: 'Route #RTE-205 experiencing delays due to weather conditions',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true
    }
  ];

  // Mock logistics updates data
  const mockLogisticsData = [
    {
      id: 1,
      productId: 'TOM-2025-001',
      productName: 'Organic Tomatoes',
      location: 'Green Valley Farm, CA',
      status: 'Picked Up',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      driverName: 'Mike Thompson',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      productId: 'CAR-2025-002',
      productName: 'Fresh Carrots',
      location: 'Distribution Center, CA',
      status: 'In Transit',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      driverName: 'Alex Turner',
      estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      productId: 'LET-2025-003',
      productName: 'Organic Lettuce',
      location: 'Fresh Market Co., CA',
      status: 'Delivered',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      driverName: 'Sarah Wilson',
      estimatedDelivery: new Date(Date.now() - 8 * 60 * 60 * 1000)
    }
  ];

  // Status options for dropdown
  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Picked Up', label: 'Picked Up' },
    { value: 'In Transit', label: 'In Transit' },
    { value: 'At Warehouse', label: 'At Warehouse' },
    { value: 'Out for Delivery', label: 'Out for Delivery' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Delayed', label: 'Delayed' },
    { value: 'Returned', label: 'Returned' }
  ];

  useEffect(() => {
    setLogisticsUpdates(mockLogisticsData);
  }, []);

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
        location: 'Farm Location',
        harvestDate: new Date().toISOString().split('T')[0]
      };
      
      setScannedProduct(newProduct);
      setQrCode('');
      setIsScanning(false);
      setActiveTab('logistics');
    }, 2000);
  };

  const handleLogisticsSubmit = async (e) => {
    e.preventDefault();
    if (!logisticsForm.location || !logisticsForm.status) return;
    
    setIsUpdatingLocation(true);
    
    // Auto-fill timestamp
    const currentTime = new Date();
    
    // Simulate API call
    setTimeout(() => {
      const newUpdate = {
        id: logisticsUpdates.length + 1,
        productId: scannedProduct?.id || 'MANUAL-' + Date.now(),
        productName: scannedProduct?.name || 'Manual Entry',
        location: logisticsForm.location,
        status: logisticsForm.status,
        timestamp: currentTime,
        driverName: userData.name,
        estimatedDelivery: logisticsForm.estimatedDelivery ? new Date(logisticsForm.estimatedDelivery) : null
      };
      
      setLogisticsUpdates(prev => [newUpdate, ...prev]);
      setLogisticsForm({ location: '', status: '', estimatedDelivery: '' });
      setScannedProduct(null);
      setIsUpdatingLocation(false);
      setActiveTab('timeline');
    }, 1500);
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
    { id: 'scan', label: 'QR Scanner', icon: 'QrCode' },
    { id: 'logistics', label: 'Update Logistics', icon: 'Truck' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  // Set page title
  useEffect(() => {
    document.title = 'Distributor Dashboard - AgriTrace';
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-success/10 text-success border-success/20';
      case 'In Transit': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Picked Up': return 'bg-primary/10 text-primary border-primary/20';
      case 'Delayed': return 'bg-warning/10 text-warning border-warning/20';
      case 'Returned': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return 'CheckCircle';
      case 'In Transit': return 'Truck';
      case 'Picked Up': return 'Package';
      case 'Delayed': return 'AlertTriangle';
      case 'Returned': return 'RotateCcw';
      default: return 'Clock';
    }
  };

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
                  Distributor Dashboard
                </h1>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                    <Icon name="Truck" size={12} className="mr-1" strokeWidth={2} />
                    Active Distributor
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
              <div className="glass-card p-6 mb-8 bg-gradient-to-r from-secondary/5 to-accent/5 border border-secondary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-soft">
                      <Icon name="Truck" size={32} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">
                        Welcome, {userData?.name?.split(' ')?.[0]}!
                      </h2>
                      <p className="text-text-secondary mt-1">
                        Scan products, update logistics status, and track supply chain movements in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="space-y-8">
              {/* QR Scanner Tab */}
              {activeTab === 'scan' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* QR Scanner Section */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="QrCode" size={20} className="mr-2" />
                      QR Code Scanner
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Icon name="Scan" size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-text-secondary mb-4">
                          Scan product QR code to update logistics information
                        </p>
                        <Button
                          variant="outline"
                          iconName="Camera"
                          iconPosition="left"
                          className="mb-4"
                        >
                          Open Scanner
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
                      {scannedProduct && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="text-sm font-medium text-success">Product Scanned Successfully</span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            Product ID: <span className="font-mono font-medium">{scannedProduct.id}</span>
                          </p>
                          <p className="text-sm text-text-secondary">
                            Name: {scannedProduct.name}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="BarChart3" size={20} className="mr-2" />
                      Logistics Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="text-2xl font-bold text-primary">{logisticsUpdates.length}</div>
                        <div className="text-sm text-text-secondary">Total Shipments</div>
                      </div>
                      <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
                        <div className="text-2xl font-bold text-success">
                          {logisticsUpdates.filter(u => u.status === 'Delivered').length}
                        </div>
                        <div className="text-sm text-text-secondary">Delivered</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                        <div className="text-2xl font-bold text-secondary">
                          {logisticsUpdates.filter(u => u.status === 'In Transit').length}
                        </div>
                        <div className="text-sm text-text-secondary">In Transit</div>
                      </div>
                      <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/10">
                        <div className="text-2xl font-bold text-warning">
                          {logisticsUpdates.filter(u => u.status === 'Delayed').length}
                        </div>
                        <div className="text-sm text-text-secondary">Delayed</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Logistics Update Form Tab */}
              {activeTab === 'logistics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <Icon name="MapPin" size={20} className="mr-2" />
                      Update Logistics
                    </h3>
                    
                    {scannedProduct && (
                      <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium text-primary">Updating: {scannedProduct.name}</p>
                        <p className="text-xs text-text-secondary">ID: {scannedProduct.id}</p>
                      </div>
                    )}

                    <form onSubmit={handleLogisticsSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Current Location
                        </label>
                        <Input
                          placeholder="Enter current location"
                          value={logisticsForm.location}
                          onChange={(e) => setLogisticsForm(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Transit Status
                        </label>
                        <Select
                          value={logisticsForm.status}
                          onValueChange={(value) => setLogisticsForm(prev => ({ ...prev, status: value }))}
                          options={statusOptions}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Estimated Delivery (Optional)
                        </label>
                        <Input
                          type="datetime-local"
                          value={logisticsForm.estimatedDelivery}
                          onChange={(e) => setLogisticsForm(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                        />
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-text-secondary mb-1">Timestamp (Auto-filled)</p>
                        <p className="text-sm text-text-primary">{new Date().toLocaleString()}</p>
                      </div>

                      <Button
                        type="submit"
                        loading={isUpdatingLocation}
                        iconName="Upload"
                        iconPosition="left"
                        fullWidth
                        disabled={!logisticsForm.location || !logisticsForm.status}
                      >
                        Update Logistics
                      </Button>
                    </form>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Recent Updates</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {logisticsUpdates.slice(0, 5).map((update) => (
                        <motion.div
                          key={update.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm text-text-primary">{update.productName}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(update.status)}`}>
                              <Icon name={getStatusIcon(update.status)} size={10} className="mr-1" />
                              {update.status}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary">{update.location}</p>
                          <p className="text-xs text-text-secondary">{update.timestamp.toLocaleString()}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-text-primary">Logistics Timeline</h3>
                    <Button variant="outline" iconName="Download" iconPosition="left">
                      Export Timeline
                    </Button>
                  </div>

                  <div className="glass-card p-6">
                    <div className="space-y-6">
                      <AnimatePresence>
                        {logisticsUpdates.map((update, index) => (
                          <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-start space-x-4"
                          >
                            {/* Timeline connector */}
                            {index !== logisticsUpdates.length - 1 && (
                              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                            )}
                            
                            {/* Status icon */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                              update.status === 'Delivered' ? 'bg-success/10 border-success text-success' :
                              update.status === 'In Transit' ? 'bg-secondary/10 border-secondary text-secondary' :
                              update.status === 'Delayed' ? 'bg-warning/10 border-warning text-warning' :
                              'bg-primary/10 border-primary text-primary'
                            }`}>
                              <Icon name={getStatusIcon(update.status)} size={20} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-text-primary">{update.productName}</h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(update.status)}`}>
                                  {update.status}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                  <p className="text-sm font-medium text-text-secondary">Product ID</p>
                                  <p className="text-sm text-text-primary font-mono">{update.productId}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-text-secondary">Location</p>
                                  <p className="text-sm text-text-primary">{update.location}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-text-secondary">Driver</p>
                                  <p className="text-sm text-text-primary">{update.driverName}</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-sm text-text-secondary">
                                <span>{update.timestamp.toLocaleString()}</span>
                                {update.estimatedDelivery && (
                                  <span>ETA: {update.estimatedDelivery.toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="BarChart3" size={32} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Logistics Analytics
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Advanced analytics and performance metrics coming soon. Track delivery times, route efficiency, and supply chain optimization.
                  </p>
                  <Button
                    variant="outline"
                    iconName="TrendingUp"
                    iconPosition="left"
                    iconSize={16}
                  >
                    View Sample Reports
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

export default DistributorDashboard;