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

const ConsumerHistory = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const userData = {
    name: 'Priya Sharma (प्रिया शर्मा)',
    email: 'priya.sharma@email.com',
    role: 'consumer',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'New FSSAI organic certification available for your favorite products (आपके पसंदीदा उत्पादों के लिए नया जैविक प्रमाणन)',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    }
  ];

  const mockScanHistory = [
    {
      id: 'SCAN001',
      productName: 'Organic Alphonso Mangoes (जैविक आम)',
      brand: 'Patel Organic Farm',
      scanDate: '2024-01-15T14:30:00Z',
      location: 'Reliance Fresh, Bandra',
      qrCode: 'QR123456789',
      verificationStatus: 'verified',
      certifications: ['FSSAI Organic', 'GI Tag'],
      origin: 'Ratnagiri, Maharashtra',
      harvestDate: '2024-01-10',
      expiryDate: '2024-01-20',
      price: '₹450/kg',
      carbonFootprint: '0.3 kg CO2',
      journey: [
        { stage: 'Harvested (फसल काटी)', date: '2024-01-10', location: 'Patel Farm, Ratnagiri' },
        { stage: 'Processed (प्रसंस्करण)', date: '2024-01-11', location: 'Maharashtra Processing Center' },
        { stage: 'Shipped (भेजा गया)', date: '2024-01-12', location: 'Mumbai Distribution Hub' },
        { stage: 'Received (प्राप्त)', date: '2024-01-14', location: 'Reliance Fresh Bandra' }
      ]
    },
    {
      id: 'SCAN002',
      productName: 'Organic Basmati Rice (जैविक बासमती चावल)',
      brand: 'Singh Organic Mills',
      scanDate: '2024-01-14T09:15:00Z',
      location: 'Big Bazaar, Andheri',
      qrCode: 'QR987654321',
      verificationStatus: 'verified',
      certifications: ['FSSAI Organic', 'Export Grade'],
      origin: 'Amritsar, Punjab',
      harvestDate: '2024-01-12',
      expiryDate: '2025-01-12',
      price: '₹180/kg',
      carbonFootprint: '0.8 kg CO2',
      journey: [
        { stage: 'Harvested (फसल काटी)', date: '2024-01-12', location: 'Singh Farm, Amritsar' },
        { stage: 'Processed (प्रसंस्करण)', date: '2024-01-12', location: 'Punjab Rice Mill' },
        { stage: 'Packaged (पैकेजिंग)', date: '2024-01-13', location: 'Punjab Processing Hub' },
        { stage: 'Delivered (वितरित)', date: '2024-01-14', location: 'Big Bazaar Andheri' }
      ]
    },
    {
      id: 'SCAN003',
      productName: 'Organic Turmeric Powder (जैविक हल्दी पाउडर)',
      brand: 'Devi Spices',
      scanDate: '2024-01-13T16:45:00Z',
      location: 'Nature\'s Basket, Powai',
      qrCode: 'QR456789123',
      verificationStatus: 'pending',
      certifications: ['FSSAI Organic'],
      origin: 'Erode, Tamil Nadu',
      harvestDate: '2024-01-13',
      expiryDate: '2025-01-13',
      price: '₹120/100g',
      carbonFootprint: '0.2 kg CO2',
      journey: [
        { stage: 'Harvested (फसल काटी)', date: '2024-01-13', location: 'Devi Farm, Erode' },
        { stage: 'Processed (प्रसंस्करण)', date: '2024-01-13', location: 'Tamil Nadu Spice Mill' }
      ]
    },
    {
      id: 'SCAN004',
      productName: 'Darjeeling Tea (दार्जिलिंग चाय)',
      brand: 'Mountain Tea Estate',
      scanDate: '2024-01-12T11:20:00Z',
      location: 'Spencer\'s, Kolkata',
      qrCode: 'QR789123456',
      verificationStatus: 'failed',
      certifications: [],
      origin: 'Unknown',
      harvestDate: 'Unknown',
      expiryDate: '2025-01-12',
      price: '₹350/250g',
      carbonFootprint: 'Unknown',
      journey: []
    }
  ];

  useEffect(() => {
    document.title = 'My Scans - AgriTrace';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'failed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  const filteredScans = mockScanHistory.filter(scan => {
    const matchesSearch = scan.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scan.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || scan.verificationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedScans = [...filteredScans].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.scanDate) - new Date(a.scanDate);
      case 'oldest':
        return new Date(a.scanDate) - new Date(b.scanDate);
      case 'name':
        return a.productName.localeCompare(b.productName);
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRescan = (qrCode) => {
    navigate('/consumer-dashboard', { state: { qrCode } });
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
                <h1 className="text-2xl font-bold text-text-primary">My Scans</h1>
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
          <div className="max-w-6xl mx-auto">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Scans</p>
                    <p className="text-2xl font-bold text-text-primary">{mockScanHistory.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="QrCode" size={24} className="text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Verified Products</p>
                    <p className="text-2xl font-bold text-success">
                      {mockScanHistory.filter(s => s.verificationStatus === 'verified').length}
                    </p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-full">
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">This Month</p>
                    <p className="text-2xl font-bold text-secondary">
                      {mockScanHistory.filter(s => 
                        new Date(s.scanDate).getMonth() === new Date().getMonth()
                      ).length}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Icon name="Calendar" size={24} className="text-secondary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Avg. CO2 Saved (औसत CO2 बचत)</p>
                    <p className="text-2xl font-bold text-accent">2.1kg</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Icon name="Leaf" size={24} className="text-accent" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search products or brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    iconName="Search"
                  />
                </div>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="min-w-[150px]"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-w-[150px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">By Name</option>
                </Select>
              </div>
            </motion.div>

            {/* Scan History List */}
            <div className="space-y-6">
              {sortedScans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{scan.productName}</h3>
                        <p className="text-text-secondary">{scan.brand}</p>
                        <p className="text-sm text-text-secondary">
                          Scanned on {formatDate(scan.scanDate)} at {scan.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(scan.verificationStatus)}`}>
                        <Icon name={getStatusIcon(scan.verificationStatus)} size={12} className="mr-1" />
                        {scan.verificationStatus}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRescan(scan.qrCode)}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Rescan
                      </Button>
                    </div>
                  </div>

                  {scan.verificationStatus === 'verified' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Origin</p>
                        <p className="text-text-primary">{scan.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Harvest Date</p>
                        <p className="text-text-primary">{scan.harvestDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Price</p>
                        <p className="text-text-primary font-semibold">{scan.price}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Carbon Footprint</p>
                        <p className="text-accent font-semibold">{scan.carbonFootprint}</p>
                      </div>
                    </div>
                  )}

                  {scan.certifications.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-text-secondary mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {scan.certifications.map((cert, certIndex) => (
                          <span 
                            key={certIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
                          >
                            <Icon name="Award" size={12} className="mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {scan.journey.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-text-secondary mb-3">Supply Chain Journey</p>
                      <div className="flex flex-wrap gap-4">
                        {scan.journey.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">{step.stage}</p>
                              <p className="text-xs text-text-secondary">{step.date} • {step.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {sortedScans.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No scans found</h3>
                <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsumerHistory;
