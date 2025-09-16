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
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const FarmerProducts = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [products, setProducts] = useState([]);

  // Mock user data
  const userData = {
    name: 'John Mitchell',
    email: 'john.mitchell@greenfarm.com',
    role: 'farmer',
    avatar: null
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Product Verified',
      message: 'Your organic tomatoes batch has been verified',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false
    }
  ];

  // Mock products data
  const mockProducts = [
    {
      id: 'TOM-2025-001',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      quantity: 500,
      unit: 'kg',
      harvestDate: '2025-01-10',
      expiryDate: '2025-01-25',
      status: 'verified',
      price: 4.50,
      certifications: ['Organic', 'Non-GMO'],
      qrGenerated: true,
      location: 'Greenhouse A',
      batchNumber: 'TOM-B001'
    },
    {
      id: 'CAR-2025-002',
      name: 'Fresh Carrots',
      category: 'Vegetables',
      quantity: 300,
      unit: 'kg',
      harvestDate: '2025-01-08',
      expiryDate: '2025-02-08',
      status: 'pending',
      price: 3.20,
      certifications: ['Organic'],
      qrGenerated: false,
      location: 'Field B',
      batchNumber: 'CAR-B002'
    },
    {
      id: 'LET-2025-003',
      name: 'Organic Lettuce',
      category: 'Leafy Greens',
      quantity: 150,
      unit: 'kg',
      harvestDate: '2025-01-12',
      expiryDate: '2025-01-19',
      status: 'shipped',
      price: 6.00,
      certifications: ['Organic', 'Fair Trade'],
      qrGenerated: true,
      location: 'Greenhouse C',
      batchNumber: 'LET-B003'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Verification' },
    { value: 'verified', label: 'Verified' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' }
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
                <TranslatableText as="h1" className="text-2xl font-bold text-text-primary" text="My Products" />
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

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Total Products" />
                    <p className="text-3xl font-bold text-primary">{products.length}</p>
                  </div>
                  <Icon name="Package" size={24} className="text-primary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/10">
                <div className="flex items-center justify-between">
                  <div>
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Verified" />
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
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Shipped" />
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
                    <TranslatableText as="p" className="text-sm font-medium text-text-secondary" text="Pending" />
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
                    onValueChange={setStatusFilter}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button iconName="Plus" iconPosition="left">
                  <TranslatableText text="Add Product" />
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
                        <TranslatableText as="h3" className="text-xl font-semibold text-text-primary" text={product.name} />
                        <p className="text-text-secondary">{product.category} • {product.quantity} {product.unit}</p>
                        <p className="text-sm text-text-secondary"><TranslatableText text="Batch:" /> {product.batchNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                        <Icon name={getStatusIcon(product.status)} size={12} className="mr-1" />
                        <TranslatableText text={product.status} />
                      </span>
                      {product.qrGenerated && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <Icon name="QrCode" size={12} className="mr-1" />
                          <TranslatableText text="QR Ready" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Harvest Date" />
                      <p className="text-text-primary">{product.harvestDate}</p>
                    </div>
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Expiry Date" />
                      <p className="text-text-primary">{product.expiryDate}</p>
                    </div>
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text={`Price per ${product.unit}`} />
                      <p className="text-text-primary">${product.price}</p>
                    </div>
                    <div>
                      <TranslatableText as="label" className="text-sm font-medium text-text-secondary" text="Location" />
                      <p className="text-text-primary">{product.location}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <TranslatableText as="label" className="text-sm font-medium text-text-secondary mb-2 block" text="Certifications" />
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                        >
                          <Icon name="Award" size={12} className="mr-1" />
                          <TranslatableText text={cert} />
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
                        <TranslatableText text="View Details" />
                      </Button>
                      <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                        <TranslatableText text="Edit" />
                      </Button>
                      {!product.qrGenerated && (
                        <Button size="sm" iconName="QrCode" iconPosition="left">
                          <TranslatableText text="Generate QR" />
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
