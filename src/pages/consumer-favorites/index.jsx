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

const ConsumerFavorites = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

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

  const mockFavorites = [
    {
      id: 'FAV001',
      productName: 'Organic Alphonso Mangoes (जैविक आम)',
      brand: 'Patel Organic Farm',
      category: 'Fruits (फल)',
      addedDate: '2024-01-10T14:30:00Z',
      lastScanned: '2024-01-15T14:30:00Z',
      scanCount: 5,
      averagePrice: '₹450/kg',
      availability: 'in-stock',
      certifications: ['FSSAI Organic', 'GI Tag'],
      sustainabilityScore: 96,
      carbonFootprint: '0.3 kg CO2',
      origin: 'Ratnagiri, Maharashtra',
      seasonality: 'March-June (seasonal)',
      nutritionHighlights: ['High in Vitamin A (विटामिन A)', 'Rich in Fiber (फाइबर)'],
      alerts: [
        { type: 'price', message: 'Price dropped by 12% - seasonal discount (मौसमी छूट)' },
        { type: 'availability', message: 'Back in stock at 3 nearby stores (नजदीकी दुकानों में उपलब्ध)' }
      ]
    },
    {
      id: 'FAV002',
      productName: 'Organic Basmati Rice (जैविक बासमती चावल)',
      brand: 'Singh Organic Mills',
      category: 'Grains (अनाज)',
      addedDate: '2024-01-08T09:15:00Z',
      lastScanned: '2024-01-14T09:15:00Z',
      scanCount: 8,
      averagePrice: '₹180/kg',
      availability: 'in-stock',
      certifications: ['FSSAI Organic', 'Export Grade'],
      sustainabilityScore: 92,
      carbonFootprint: '0.8 kg CO2',
      origin: 'Amritsar, Punjab',
      seasonality: 'Year-round (साल भर)',
      nutritionHighlights: ['High Protein (उच्च प्रोटीन)', 'Aromatic Long Grain (सुगंधित)'],
      alerts: []
    },
    {
      id: 'FAV003',
      productName: 'Organic Turmeric Powder (जैविक हल्दी पाउडर)',
      brand: 'Devi Spices',
      category: 'Spices (मसाले)',
      addedDate: '2024-01-05T16:45:00Z',
      lastScanned: '2024-01-13T16:45:00Z',
      scanCount: 3,
      averagePrice: '₹120/100g',
      availability: 'limited',
      certifications: ['FSSAI Organic', 'Ayurvedic Grade'],
      sustainabilityScore: 89,
      carbonFootprint: '0.2 kg CO2',
      origin: 'Erode, Tamil Nadu',
      seasonality: 'Harvest season Oct-Feb (अक्टूबर-फरवरी)',
      nutritionHighlights: ['High Curcumin (करकयूमिन)', 'Anti-inflammatory (सूजन रोधी)'],
      alerts: [
        { type: 'availability', message: 'Limited stock - harvest season ending (सीमित स्टॉक)' }
      ]
    },
    {
      id: 'FAV004',
      productName: 'Organic Darjeeling Tea (जैविक दार्जिलिंग चाय)',
      brand: 'Sherpa Tea Estate',
      category: 'Beverages (पेय)',
      addedDate: '2024-01-02T11:20:00Z',
      lastScanned: '2024-01-12T11:20:00Z',
      scanCount: 2,
      averagePrice: '₹350/250g',
      availability: 'out-of-stock',
      certifications: ['FSSAI Organic', 'GI Tag', 'Fair Trade'],
      sustainabilityScore: 94,
      carbonFootprint: '0.1 kg CO2',
      origin: 'Darjeeling, West Bengal',
      seasonality: 'First flush Mar-Apr (पहली पत्ती)',
      nutritionHighlights: ['High Antioxidants (एंटीऑक्सीडेंट)', 'Natural Caffeine (प्राकृतिक कैफीन)'],
      alerts: [
        { type: 'availability', message: 'Out of stock - new harvest expected Mar 15 (नई फसल 15 मार्च को)' }
      ]
    }
  ];

  useEffect(() => {
    document.title = 'Favorites - AgriTrace';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'in-stock': return 'bg-success/10 text-success border-success/20';
      case 'limited': return 'bg-warning/10 text-warning border-warning/20';
      case 'out-of-stock': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case 'in-stock': return 'CheckCircle';
      case 'limited': return 'AlertTriangle';
      case 'out-of-stock': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  const getSustainabilityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const filteredFavorites = mockFavorites.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedDate) - new Date(a.addDate);
      case 'name':
        return a.productName.localeCompare(b.productName);
      case 'scans':
        return b.scanCount - a.scanCount;
      case 'sustainability':
        return b.sustainabilityScore - a.sustainabilityScore;
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleRemoveFavorite = (id) => {
    // Here you would typically update the favorites list
    console.log('Removing favorite:', id);
  };

  const handleScanProduct = (productName) => {
    navigate('/consumer-dashboard', { state: { searchProduct: productName } });
  };

  const categories = ['all', ...new Set(mockFavorites.map(item => item.category))];

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
                <h1 className="text-2xl font-bold text-text-primary">Favorites</h1>
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
                    <p className="text-sm font-medium text-text-secondary">Total Favorites</p>
                    <p className="text-2xl font-bold text-text-primary">{mockFavorites.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="Heart" size={24} className="text-primary" />
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
                    <p className="text-sm font-medium text-text-secondary">In Stock</p>
                    <p className="text-2xl font-bold text-success">
                      {mockFavorites.filter(f => f.availability === 'in-stock').length}
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
                    <p className="text-sm font-medium text-text-secondary">Avg. Sustainability (औसत स्थिरता)</p>
                    <p className="text-2xl font-bold text-accent">
                      {Math.round(mockFavorites.reduce((sum, f) => sum + f.sustainabilityScore, 0) / mockFavorites.length)}
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Icon name="Leaf" size={24} className="text-accent" />
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
                    <p className="text-sm font-medium text-text-secondary">Active Alerts (सक्रिय अलर्ट)</p>
                    <p className="text-2xl font-bold text-secondary">
                      {mockFavorites.reduce((sum, f) => sum + f.alerts.length, 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Icon name="Bell" size={24} className="text-secondary" />
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
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    iconName="Search"
                  />
                </div>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="min-w-[150px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-w-[150px]"
                >
                  <option value="recent">Recently Added</option>
                  <option value="name">By Name</option>
                  <option value="scans">Most Scanned</option>
                  <option value="sustainability">Sustainability Score</option>
                </Select>
              </div>
            </motion.div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedFavorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{favorite.productName}</h3>
                        <p className="text-text-secondary">{favorite.brand}</p>
                        <p className="text-sm text-text-secondary">{favorite.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAvailabilityColor(favorite.availability)}`}>
                        <Icon name={getAvailabilityIcon(favorite.availability)} size={12} className="mr-1" />
                        {favorite.availability.replace('-', ' ')}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        iconName="Heart"
                        className="text-error hover:bg-error/10"
                      />
                    </div>
                  </div>

                  {/* Alerts */}
                  {favorite.alerts.length > 0 && (
                    <div className="mb-4">
                      {favorite.alerts.map((alert, alertIndex) => (
                        <div 
                          key={alertIndex}
                          className="flex items-center space-x-2 p-2 bg-secondary/10 border border-secondary/20 rounded-lg mb-2"
                        >
                          <Icon name="Bell" size={14} className="text-secondary" />
                          <p className="text-sm text-secondary">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Average Price</p>
                      <p className="text-text-primary font-semibold">{favorite.averagePrice}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Times Scanned</p>
                      <p className="text-text-primary font-semibold">{favorite.scanCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Sustainability Score</p>
                      <p className={`font-semibold ${getSustainabilityColor(favorite.sustainabilityScore)}`}>
                        {favorite.sustainabilityScore}/100
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Carbon Footprint</p>
                      <p className="text-accent font-semibold">{favorite.carbonFootprint}</p>
                    </div>
                  </div>

                  {/* Certifications */}
                  {favorite.certifications.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-text-secondary mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {favorite.certifications.map((cert, certIndex) => (
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

                  {/* Nutrition Highlights */}
                  {favorite.nutritionHighlights.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-text-secondary mb-2">Nutrition Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {favorite.nutritionHighlights.map((highlight, highlightIndex) => (
                          <span 
                            key={highlightIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                          >
                            <Icon name="Zap" size={12} className="mr-1" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleScanProduct(favorite.productName)}
                      iconName="QrCode"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Scan Again
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MapPin"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Find Stores
                    </Button>
                  </div>

                  {/* Meta Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-text-secondary">
                    <div className="flex justify-between">
                      <span>Added: {formatDate(favorite.addedDate)}</span>
                      <span>Last scanned: {formatDate(favorite.lastScanned)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {sortedFavorites.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <Icon name="Heart" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No favorites found</h3>
                <p className="text-text-secondary mb-4">
                  {searchTerm || filterCategory !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Start scanning products to add them to your favorites!'
                  }
                </p>
                <Button
                  onClick={() => navigate('/consumer-dashboard')}
                  iconName="QrCode"
                  iconPosition="left"
                >
                  Scan Products
                </Button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsumerFavorites;
