import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const DistributorScan = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [logisticsUpdate, setLogisticsUpdate] = useState({
    location: '',
    status: '',
    temperature: '',
    humidity: '',
    notes: '',
    timestamp: new Date().toISOString().slice(0, 16)
  });

  const userData = {
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@fastlogistics.com',
    role: 'distributor',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'warning',
      message: 'Shipment SH-2024-001 requires temperature check',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'info',
      message: 'New delivery route optimized for efficiency',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    }
  ];

  const mockProductData = {
    'QR123456789': {
      productName: 'Organic Tomatoes',
      brand: 'Green Valley Farm',
      batchId: 'GT-2024-001',
      harvestDate: '2024-01-10',
      expiryDate: '2024-01-20',
      origin: 'Green Valley Farm, California',
      certifications: ['USDA Organic', 'Non-GMO'],
      currentStatus: 'in-transit',
      temperature: '2-4°C',
      humidity: '85-90%',
      weight: '500 lbs',
      destination: 'Whole Foods Market, San Francisco',
      shipmentId: 'SH-2024-001',
      trackingNumber: 'TRK789123456',
      logisticsHistory: [
        {
          timestamp: '2024-01-15T06:00:00Z',
          location: 'Green Valley Farm, CA',
          status: 'picked-up',
          temperature: '3.2°C',
          humidity: '87%',
          updatedBy: 'Carlos Martinez'
        },
        {
          timestamp: '2024-01-15T08:30:00Z',
          location: 'Highway 101, San Jose',
          status: 'in-transit',
          temperature: '2.8°C',
          humidity: '86%',
          updatedBy: 'Carlos Martinez'
        }
      ]
    },
    'QR987654321': {
      productName: 'Free-Range Eggs',
      brand: 'Happy Hen Farm',
      batchId: 'HH-2024-002',
      harvestDate: '2024-01-12',
      expiryDate: '2024-01-28',
      origin: 'Happy Hen Farm, Oregon',
      certifications: ['Free-Range', 'Cage-Free'],
      currentStatus: 'delivered',
      temperature: '4-7°C',
      humidity: '80-85%',
      weight: '1000 dozen',
      destination: 'Local Grocery Chain, Portland',
      shipmentId: 'SH-2024-002',
      trackingNumber: 'TRK456789123',
      logisticsHistory: [
        {
          timestamp: '2024-01-14T08:00:00Z',
          location: 'Happy Hen Farm, OR',
          status: 'picked-up',
          temperature: '5.1°C',
          humidity: '82%',
          updatedBy: 'Lisa Chen'
        },
        {
          timestamp: '2024-01-14T13:45:00Z',
          location: 'Local Grocery Chain, Portland',
          status: 'delivered',
          temperature: '5.2°C',
          humidity: '80%',
          updatedBy: 'Lisa Chen'
        }
      ]
    }
  };

  useEffect(() => {
    document.title = 'Scan Products - AgriTrace';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const handleScan = async () => {
    if (!qrCode.trim()) return;

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const productData = mockProductData[qrCode.trim()];
      if (productData) {
        setScanResult(productData);
        setLogisticsUpdate(prev => ({
          ...prev,
          location: `Current Location - ${new Date().toLocaleString()}`
        }));
      } else {
        setScanResult({ error: 'Product not found or invalid QR code' });
      }
      setIsScanning(false);
    }, 1500);
  };

  const handleLogisticsSubmit = () => {
    if (!scanResult || scanResult.error) return;

    const newUpdate = {
      ...logisticsUpdate,
      updatedBy: userData.name,
      timestamp: new Date().toISOString()
    };

    // Here you would typically send to API
    console.log('Logistics update submitted:', newUpdate);
    
    // Reset form
    setLogisticsUpdate({
      location: '',
      status: '',
      temperature: '',
      humidity: '',
      notes: '',
      timestamp: new Date().toISOString().slice(0, 16)
    });

    // Show success message or update UI
    alert('Logistics update submitted successfully!');
  };

  const handleCameraClick = () => {
    // In a real app, this would open camera
    alert('Camera functionality would be implemented here');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-success/10 text-success border-success/20';
      case 'in-transit': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'picked-up': return 'bg-warning/10 text-warning border-warning/20';
      case 'delayed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                <h1 className="text-2xl font-bold text-text-primary">Scan Products</h1>
              </div>

              <div className="flex items-center space-x-4">
                <NotificationIndicator
                  notifications={notifications}
                  unreadCount={notifications.filter(n => !n.read).length}
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
          <div className="max-w-4xl mx-auto">
            {/* QR Code Scanner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="QrCode" size={20} className="mr-2" />
                QR Code Scanner
              </h2>
              
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter QR code or scan with camera"
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    />
                  </div>
                  <Button
                    onClick={handleCameraClick}
                    variant="outline"
                    iconName="Camera"
                    iconPosition="left"
                  >
                    Camera
                  </Button>
                  <Button
                    onClick={handleScan}
                    disabled={!qrCode.trim() || isScanning}
                    iconName={isScanning ? "Loader" : "Search"}
                    iconPosition="left"
                  >
                    {isScanning ? 'Scanning...' : 'Scan'}
                  </Button>
                </div>

                {/* Quick Scan Options */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-text-secondary">Quick scan:</span>
                  <button
                    onClick={() => setQrCode('QR123456789')}
                    className="text-sm text-primary hover:underline"
                  >
                    QR123456789
                  </button>
                  <button
                    onClick={() => setQrCode('QR987654321')}
                    className="text-sm text-primary hover:underline"
                  >
                    QR987654321
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Scan Result */}
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 mb-8"
              >
                {scanResult.error ? (
                  <div className="text-center py-8">
                    <Icon name="XCircle" size={48} className="text-error mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-error mb-2">Scan Failed</h3>
                    <p className="text-text-secondary">{scanResult.error}</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={24} color="white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-text-primary">{scanResult.productName}</h3>
                          <p className="text-text-secondary">{scanResult.brand}</p>
                          <p className="text-sm text-text-secondary">Batch: {scanResult.batchId}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(scanResult.currentStatus)}`}>
                        <Icon name="Truck" size={12} className="mr-1" />
                        {scanResult.currentStatus.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Origin</p>
                        <p className="text-text-primary">{scanResult.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Harvest Date</p>
                        <p className="text-text-primary">{scanResult.harvestDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Expiry Date</p>
                        <p className="text-text-primary">{scanResult.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Weight</p>
                        <p className="text-text-primary">{scanResult.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Temperature Range</p>
                        <p className="text-text-primary">{scanResult.temperature}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Humidity Range</p>
                        <p className="text-text-primary">{scanResult.humidity}</p>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Shipment ID</p>
                        <p className="text-text-primary font-mono">{scanResult.shipmentId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Tracking Number</p>
                        <p className="text-text-primary font-mono">{scanResult.trackingNumber}</p>
                      </div>
                    </div>

                    {/* Certifications */}
                    {scanResult.certifications.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-medium text-text-secondary mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-2">
                          {scanResult.certifications.map((cert, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
                            >
                              <Icon name="Award" size={12} className="mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Logistics History */}
                    <div>
                      <p className="text-sm font-medium text-text-secondary mb-3">Logistics History</p>
                      <div className="space-y-3">
                        {scanResult.logisticsHistory.map((entry, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-text-primary">{entry.status.replace('-', ' ')}</p>
                                <p className="text-xs text-text-secondary">{formatDateTime(entry.timestamp)}</p>
                              </div>
                              <p className="text-sm text-text-secondary mb-1">{entry.location}</p>
                              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                                <span>Temp: {entry.temperature}</span>
                                <span>Humidity: {entry.humidity}</span>
                                <span>By: {entry.updatedBy}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Logistics Update Form */}
            {scanResult && !scanResult.error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="MapPin" size={20} className="mr-2" />
                  Update Logistics Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Current Location</label>
                    <Input
                      placeholder="Enter current location"
                      value={logisticsUpdate.location}
                      onChange={(e) => setLogisticsUpdate(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
                    <Select
                      value={logisticsUpdate.status}
                      onChange={(e) => setLogisticsUpdate(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="">Select status</option>
                      <option value="picked-up">Picked Up</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="delayed">Delayed</option>
                      <option value="temperature-alert">Temperature Alert</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Temperature (°C)</label>
                    <Input
                      placeholder="e.g., 2.5"
                      value={logisticsUpdate.temperature}
                      onChange={(e) => setLogisticsUpdate(prev => ({ ...prev, temperature: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Humidity (%)</label>
                    <Input
                      placeholder="e.g., 85"
                      value={logisticsUpdate.humidity}
                      onChange={(e) => setLogisticsUpdate(prev => ({ ...prev, humidity: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Notes (Optional)</label>
                    <Input
                      placeholder="Additional notes or observations"
                      value={logisticsUpdate.notes}
                      onChange={(e) => setLogisticsUpdate(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Timestamp</label>
                    <Input
                      type="datetime-local"
                      value={logisticsUpdate.timestamp}
                      onChange={(e) => setLogisticsUpdate(prev => ({ ...prev, timestamp: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setLogisticsUpdate({
                      location: '',
                      status: '',
                      temperature: '',
                      humidity: '',
                      notes: '',
                      timestamp: new Date().toISOString().slice(0, 16)
                    })}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleLogisticsSubmit}
                    disabled={!logisticsUpdate.location || !logisticsUpdate.status}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Submit Update
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistributorScan;
