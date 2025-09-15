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
import LanguageToggle from '../../components/ui/LanguageToggle';
import GeminiToggle from '../../components/ui/GeminiToggle';
import { useLanguage } from '../../utils/translations';
import { useGeminiTranslation } from '../../hooks/useGeminiTranslation';

const FarmerProducts = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const { translateText, isGeminiEnabled, toggleGemini, isTranslating } = useGeminiTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [products, setProducts] = useState([]);

  // Mock user data
  const userData = {
    name: 'Ramesh Patel (रमेश पटेल)',
    email: 'ramesh.patel@organicfarm.com',
    role: 'farmer',
    avatar: null
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Product Verified (उत्पाद सत्यापित)',
      message: 'Your organic Alphonso mangoes batch has been FSSAI verified (आपके जैविक आम का बैच सत्यापित)',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false
    }
  ];

  // Mock products data
  const mockProducts = [
    {
      id: 'MAN-2025-001',
      name: 'Organic Alphonso Mangoes (जैविक आम)',
      category: 'Fruits (फल)',
      quantity: 500,
      unit: 'kg',
      harvestDate: '2025-01-10',
      expiryDate: '2025-01-25',
      status: 'verified',
      price: 450,
      certifications: ['FSSAI Organic', 'GI Tag'],
      qrGenerated: true,
      location: 'Orchard A (बाग A)',
      batchNumber: 'MAN-B001'
    },
    {
      id: 'RIC-2025-002',
      name: 'Organic Basmati Rice (जैविक बासमती)',
      category: 'Grains (अनाज)',
      quantity: 1000,
      unit: 'kg',
      harvestDate: '2025-01-08',
      expiryDate: '2026-01-08',
      status: 'pending',
      price: 180,
      certifications: ['FSSAI Organic'],
      qrGenerated: false,
      location: 'Field B (खेत B)',
      batchNumber: 'RIC-B002'
    },
    {
      id: 'TUR-2025-003',
      name: 'Organic Turmeric (जैविक हल्दी)',
      category: 'Spices (मसाले)',
      quantity: 200,
      unit: 'kg',
      harvestDate: '2025-01-12',
      expiryDate: '2026-01-12',
      status: 'shipped',
      price: 1200,
      certifications: ['FSSAI Organic', 'Ayurvedic Grade'],
      qrGenerated: true,
      location: 'Field C (खेत C)',
      batchNumber: 'TUR-B003'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status (सभी स्थिति)' },
    { value: 'pending', label: 'Pending Verification (सत्यापन पेंडिंग)' },
    { value: 'verified', label: 'Verified (सत्यापित)' },
    { value: 'shipped', label: 'Shipped (भेजा गया)' },
    { value: 'delivered', label: 'Delivered (वितरित)' }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    document.title = 'My Products - AgriTrace';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-success/10 text-success border-success/20';
      case 'shipped': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'delivered': return 'bg-primary/10 text-primary border-primary/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'shipped': return 'Truck';
      case 'delivered': return 'Package';
      case 'pending': return 'Clock';
      default: return 'AlertCircle';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
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
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-text-primary">{isHindi ? (isGeminiEnabled ? translateText('मेरे उत्पाद') : 'मेरे उत्पाद') : (isGeminiEnabled ? translateText('My Products') : 'My Products')}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <LanguageToggle isHindi={isHindi} onToggle={toggleLanguage} />
                <GeminiToggle isEnabled={isGeminiEnabled} onToggle={toggleGemini} isTranslating={isTranslating} />
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

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{isHindi ? (isGeminiEnabled ? translateText('कुल उत्पाद') : 'कुल उत्पाद') : (isGeminiEnabled ? translateText('Total Products') : 'Total Products')}</p>
                    <p className="text-3xl font-bold text-primary">{products.length}</p>
                  </div>
                  <Icon name="Package" size={24} className="text-primary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{isHindi ? (isGeminiEnabled ? translateText('सत्यापित') : 'सत्यापित') : (isGeminiEnabled ? translateText('Verified') : 'Verified')}</p>
                    <p className="text-3xl font-bold text-success">
                      {products.filter(p => p.status === 'verified').length}
                    </p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{isHindi ? (isGeminiEnabled ? translateText('भेजा गया') : 'भेजा गया') : (isGeminiEnabled ? translateText('Shipped') : 'Shipped')}</p>
                    <p className="text-3xl font-bold text-secondary">
                      {products.filter(p => p.status === 'shipped').length}
                    </p>
                  </div>
                  <Icon name="Truck" size={24} className="text-secondary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-warning/5 to-accent/5 border border-warning/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{isHindi ? (isGeminiEnabled ? translateText('पेंडिंग') : 'पेंडिंग') : (isGeminiEnabled ? translateText('Pending') : 'Pending')}</p>
                    <p className="text-3xl font-bold text-warning">
                      {products.filter(p => p.status === 'pending').length}
                    </p>
                  </div>
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                  />
                </div>
                <Button iconName="Plus" iconPosition="left">
                  Add Product
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 hover-lift"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                        <Icon name="Leaf" size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">{product.name}</h3>
                        <p className="text-text-secondary">{product.category} • {product.quantity} {product.unit}</p>
                        <p className="text-sm text-text-secondary">Batch: {product.batchNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                        <Icon name={getStatusIcon(product.status)} size={12} className="mr-1" />
                        {product.status}
                      </span>
                      {product.qrGenerated && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <Icon name="QrCode" size={12} className="mr-1" />
                          QR Ready
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Harvest Date</label>
                      <p className="text-text-primary">{product.harvestDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Expiry Date</label>
                      <p className="text-text-primary">{product.expiryDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Price per {product.unit}</label>
                      <p className="text-text-primary">₹{product.price}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Location</label>
                      <p className="text-text-primary">{product.location}</p>
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
                      <Icon name="Hash" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary font-mono">{product.id}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                        Edit
                      </Button>
                      {!product.qrGenerated && (
                        <Button size="sm" iconName="QrCode" iconPosition="left">
                          Generate QR
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerProducts;
