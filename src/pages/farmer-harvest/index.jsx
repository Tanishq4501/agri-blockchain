import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const FarmerHarvest = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [harvestRecords, setHarvestRecords] = useState([]);

  const userData = {
    name: 'Ramesh Patel (रमेश पटेल)',
    email: 'ramesh.patel@organicfarm.com',
    role: 'farmer',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Harvest Reminder (फसल काटने की याददिलानी)',
      message: 'Alphonso mangoes in Orchard A are ready for harvest (बाग A में आम फसल काटने के लिए तैयार)',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    }
  ];

  const mockHarvestRecords = [
    {
      id: 'HR-2025-001',
      cropName: 'Organic Alphonso Mangoes (जैविक आम)',
      fieldLocation: 'Orchard A (बाग A)',
      harvestDate: '2025-01-10',
      quantity: 500,
      unit: 'kg',
      quality: 'Premium (प्रीमियम)',
      weather: 'Sunny, 28°C (धूप)',
      laborHours: 24,
      equipment: ['Harvesting Baskets (फसल टोकरी)', 'Sorting Tables (छँटाई मेज)'],
      notes: 'Excellent quality harvest. Perfect ripeness achieved (उत्कृष्ट गुणवत्ता की फसल)',
      batchNumber: 'MAN-B001',
      inspector: 'Priya Sharma (प्रिया शर्मा)',
      certificationStatus: 'FSSAI Organic + GI Tag'
    },
    {
      id: 'HR-2025-002',
      cropName: 'Organic Basmati Rice (जैविक बासमती)',
      fieldLocation: 'Field B (खेत B)',
      harvestDate: '2025-01-08',
      quantity: 1000,
      unit: 'kg',
      quality: 'Good (अच्छा)',
      weather: 'Clear, 25°C (साफ)',
      laborHours: 32,
      equipment: ['Mechanical Harvester (मशीन)', 'Threshing Machine (दाँवनी)'],
      notes: 'Good harvest yield. Aromatic long grain rice (अच्छी फसल, सुगंधित चावल)',
      batchNumber: 'RIC-B002',
      inspector: 'Gurpreet Singh (गुरप्रीत सिंह)',
      certificationStatus: 'FSSAI Organic Certified'
    },
    {
      id: 'HR-2025-003',
      cropName: 'Organic Turmeric (जैविक हल्दी)',
      fieldLocation: 'Field C (खेत C)',
      harvestDate: '2025-01-12',
      quantity: 200,
      unit: 'kg',
      quality: 'Premium (प्रीमियम)',
      weather: 'Dry, 30°C (सूखा)',
      laborHours: 18,
      equipment: ['Hand Tools (हाथ के उपकरण)', 'Drying Racks (सुखाने के रैक)'],
      notes: 'Perfect harvest conditions. High curcumin content achieved (उच्च करकयूमिन)',
      batchNumber: 'TUR-B003',
      inspector: 'Lakshmi Devi (लक्ष्मी देवी)',
      certificationStatus: 'FSSAI Organic + Ayurvedic Grade'
    }
  ];

  useEffect(() => {
    setHarvestRecords(mockHarvestRecords);
    document.title = 'Harvest Records - AgriTrace';
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

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Premium': return 'bg-success/10 text-success border-success/20';
      case 'Good': return 'bg-primary/10 text-primary border-primary/20';
      case 'Fair': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredRecords = harvestRecords.filter(record =>
    record.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fieldLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalQuantity = harvestRecords.reduce((sum, record) => sum + record.quantity, 0);
  const averageQuality = harvestRecords.filter(r => r.quality === 'Premium').length / harvestRecords.length * 100;

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
                <h1 className="text-2xl font-bold text-text-primary">Harvest Records (फसल रिकॉर्ड)</h1>
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
              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Harvests (कुल फसल)</p>
                    <p className="text-3xl font-bold text-primary">{harvestRecords.length}</p>
                  </div>
                  <Icon name="Calendar" size={24} className="text-primary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Quantity (कुल मात्रा)</p>
                    <p className="text-3xl font-bold text-success">{totalQuantity} kg</p>
                  </div>
                  <Icon name="Package" size={24} className="text-success" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Premium Quality (प्रीमियम गुणवत्ता)</p>
                    <p className="text-3xl font-bold text-secondary">{Math.round(averageQuality)}%</p>
                  </div>
                  <Icon name="Award" size={24} className="text-secondary" />
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-accent/5 to-warning/5 border border-accent/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">This Month (इस महीने)</p>
                    <p className="text-3xl font-bold text-accent">{harvestRecords.length}</p>
                  </div>
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search harvest records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button iconName="Plus" iconPosition="left">
                  New Harvest Record
                </Button>
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Records
                </Button>
              </div>
            </div>

            {/* Harvest Records */}
            <div className="grid gap-6">
              {filteredRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 hover-lift"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-lg flex items-center justify-center">
                        <Icon name="Sprout" size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">{record.cropName}</h3>
                        <p className="text-text-secondary">{record.fieldLocation} • {record.harvestDate}</p>
                        <p className="text-sm text-text-secondary">Batch: {record.batchNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getQualityColor(record.quality)}`}>
                        <Icon name="Star" size={12} className="mr-1" />
                        {record.quality}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Quantity</label>
                      <p className="text-text-primary font-semibold">{record.quantity} {record.unit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Weather</label>
                      <p className="text-text-primary">{record.weather}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Labor Hours</label>
                      <p className="text-text-primary">{record.laborHours}h</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Inspector</label>
                      <p className="text-text-primary">{record.inspector}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Certification</label>
                      <p className="text-text-primary text-sm">{record.certificationStatus}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-text-secondary mb-2 block">Equipment Used</label>
                    <div className="flex flex-wrap gap-2">
                      {record.equipment.map((item, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                        >
                          <Icon name="Tool" size={12} className="mr-1" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-text-secondary mb-2 block">Harvest Notes</label>
                    <p className="text-sm text-text-primary bg-muted/50 p-3 rounded-lg">{record.notes}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Hash" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary font-mono">{record.id}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                        Edit Record
                      </Button>
                      <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
                        Generate Report
                      </Button>
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

export default FarmerHarvest;
