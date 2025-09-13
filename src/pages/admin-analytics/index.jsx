import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const userData = {
    name: 'Admin User',
    email: 'admin@agritrace.com',
    role: 'admin',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'Weekly analytics report generated successfully',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      message: 'Unusual spike in scan activity detected',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    }
  ];

  const mockAnalytics = {
    overview: {
      totalUsers: 15247,
      activeUsers: 12856,
      totalScans: 2847392,
      verifiedProducts: 45672,
      carbonFootprintSaved: '1,247 tons CO2',
      sustainabilityScore: 87.3,
      growthRate: 23.5,
      retentionRate: 78.2
    },
    userMetrics: {
      farmers: { count: 4521, growth: 15.2, activity: 89.3 },
      consumers: { count: 7834, growth: 28.7, activity: 76.5 },
      distributors: { count: 1892, growth: 12.4, activity: 94.1 },
      retailers: { count: 756, growth: 19.8, activity: 82.7 },
      regulators: { count: 244, growth: 8.3, activity: 91.2 }
    },
    scanMetrics: {
      dailyScans: 8547,
      weeklyScans: 59829,
      monthlyScans: 247382,
      verificationRate: 94.7,
      averageResponseTime: '1.2s',
      errorRate: 0.8
    },
    geographicData: [
      { region: 'California', users: 3247, scans: 587432, growth: 18.5 },
      { region: 'Oregon', users: 1892, scans: 324567, growth: 22.1 },
      { region: 'Washington', users: 1456, scans: 234891, growth: 15.7 },
      { region: 'Nevada', users: 892, scans: 156743, growth: 28.3 },
      { region: 'Arizona', users: 734, scans: 123456, growth: 12.9 }
    ],
    topProducts: [
      { name: 'Organic Tomatoes', scans: 45672, verification: 96.8, farms: 234 },
      { name: 'Free-Range Eggs', scans: 38291, verification: 94.2, farms: 189 },
      { name: 'Organic Carrots', scans: 32847, verification: 97.1, farms: 156 },
      { name: 'Fresh Lettuce', scans: 29384, verification: 93.5, farms: 198 },
      { name: 'Organic Milk', scans: 25673, verification: 95.7, farms: 87 }
    ],
    sustainabilityMetrics: {
      carbonReduction: 1247,
      waterSaved: 2847,
      wasteReduced: 892,
      localSourcing: 67.3,
      organicPercentage: 78.9,
      renewableEnergy: 45.2
    },
    performanceMetrics: {
      systemUptime: 99.97,
      averageLoadTime: 0.8,
      apiResponseTime: 120,
      databaseQueries: 2847392,
      errorRate: 0.03,
      userSatisfaction: 4.7
    }
  };

  useEffect(() => {
    document.title = 'System Analytics - AgriTrace';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getGrowthColor = (growth) => {
    if (growth > 20) return 'text-success';
    if (growth > 10) return 'text-warning';
    return 'text-error';
  };

  const handleExportReport = () => {
    console.log('Exporting analytics report...');
    alert('Analytics report export feature would be implemented here');
  };

  const handleScheduleReport = () => {
    console.log('Scheduling report...');
    alert('Report scheduling feature would be implemented here');
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
                <h1 className="text-2xl font-bold text-text-primary">System Analytics</h1>
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
          <div className="max-w-7xl mx-auto">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-4">
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="min-w-[120px]"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </Select>
                  <Select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="overview">Overview</option>
                    <option value="users">User Metrics</option>
                    <option value="scans">Scan Activity</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="performance">Performance</option>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleScheduleReport}
                    iconName="Calendar"
                    iconPosition="left"
                    size="sm"
                  >
                    Schedule Report
                  </Button>
                  <Button
                    onClick={handleExportReport}
                    iconName="Download"
                    iconPosition="left"
                    size="sm"
                  >
                    Export Report
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Users</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatNumber(mockAnalytics.overview.totalUsers)}
                    </p>
                    <p className={`text-sm font-medium ${getGrowthColor(mockAnalytics.overview.growthRate)}`}>
                      +{mockAnalytics.overview.growthRate}% growth
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="Users" size={24} className="text-primary" />
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
                    <p className="text-sm font-medium text-text-secondary">Total Scans</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatNumber(mockAnalytics.overview.totalScans)}
                    </p>
                    <p className="text-sm font-medium text-success">
                      {mockAnalytics.scanMetrics.verificationRate}% verified
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Icon name="QrCode" size={24} className="text-secondary" />
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
                    <p className="text-sm font-medium text-text-secondary">Verified Products</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatNumber(mockAnalytics.overview.verifiedProducts)}
                    </p>
                    <p className="text-sm font-medium text-success">
                      {mockAnalytics.overview.sustainabilityScore}% sustainable
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
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">CO2 Saved</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {mockAnalytics.overview.carbonFootprintSaved}
                    </p>
                    <p className="text-sm font-medium text-accent">
                      Environmental impact
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Icon name="Leaf" size={24} className="text-accent" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* User Role Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Icon name="PieChart" size={20} className="mr-2" />
                User Distribution by Role
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(mockAnalytics.userMetrics).map(([role, data], index) => (
                  <div key={role} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon 
                        name={role === 'farmers' ? 'Sprout' : 
                              role === 'consumers' ? 'User' :
                              role === 'distributors' ? 'Truck' :
                              role === 'retailers' ? 'Store' : 'Shield'} 
                        size={24} 
                        color="white" 
                      />
                    </div>
                    <h4 className="font-semibold text-text-primary capitalize">{role}</h4>
                    <p className="text-2xl font-bold text-primary">{formatNumber(data.count)}</p>
                    <p className={`text-sm font-medium ${getGrowthColor(data.growth)}`}>
                      +{data.growth}% growth
                    </p>
                    <p className="text-xs text-text-secondary">
                      {data.activity}% active
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Geographic Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Icon name="Map" size={20} className="mr-2" />
                Geographic Distribution
              </h3>
              <div className="space-y-4">
                {mockAnalytics.geographicData.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                        <Icon name="MapPin" size={16} color="white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{region.region}</h4>
                        <p className="text-sm text-text-secondary">
                          {formatNumber(region.users)} users • {formatNumber(region.scans)} scans
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${getGrowthColor(region.growth)}`}>
                        +{region.growth}%
                      </p>
                      <p className="text-xs text-text-secondary">growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Icon name="TrendingUp" size={20} className="mr-2" />
                Top Scanned Products
              </h3>
              <div className="space-y-4">
                {mockAnalytics.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{product.name}</h4>
                        <p className="text-sm text-text-secondary">
                          {formatNumber(product.scans)} scans • {product.farms} farms
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">{product.verification}%</p>
                      <p className="text-xs text-text-secondary">verified</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sustainability Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Icon name="Leaf" size={20} className="mr-2" />
                Sustainability Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-success/10 rounded-lg">
                  <Icon name="Zap" size={32} className="text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent">{mockAnalytics.sustainabilityMetrics.carbonReduction}</p>
                  <p className="text-sm text-text-secondary">Tons CO2 Reduced</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg">
                  <Icon name="Droplets" size={32} className="text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-secondary">{mockAnalytics.sustainabilityMetrics.waterSaved}</p>
                  <p className="text-sm text-text-secondary">Gallons Water Saved</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-success/10 to-primary/10 rounded-lg">
                  <Icon name="Recycle" size={32} className="text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-success">{mockAnalytics.sustainabilityMetrics.wasteReduced}</p>
                  <p className="text-sm text-text-secondary">Lbs Waste Reduced</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">{mockAnalytics.sustainabilityMetrics.localSourcing}%</p>
                  <p className="text-sm text-text-secondary">Local Sourcing</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-success">{mockAnalytics.sustainabilityMetrics.organicPercentage}%</p>
                  <p className="text-sm text-text-secondary">Organic Products</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-accent">{mockAnalytics.sustainabilityMetrics.renewableEnergy}%</p>
                  <p className="text-sm text-text-secondary">Renewable Energy</p>
                </div>
              </div>
            </motion.div>

            {/* System Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Icon name="Activity" size={20} className="mr-2" />
                System Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">System Uptime</span>
                    <Icon name="Server" size={16} className="text-success" />
                  </div>
                  <p className="text-2xl font-bold text-success">{mockAnalytics.performanceMetrics.systemUptime}%</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Avg Load Time</span>
                    <Icon name="Clock" size={16} className="text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary">{mockAnalytics.performanceMetrics.averageLoadTime}s</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">API Response</span>
                    <Icon name="Zap" size={16} className="text-secondary" />
                  </div>
                  <p className="text-2xl font-bold text-secondary">{mockAnalytics.performanceMetrics.apiResponseTime}ms</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Error Rate</span>
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                  </div>
                  <p className="text-2xl font-bold text-warning">{mockAnalytics.performanceMetrics.errorRate}%</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">User Satisfaction</span>
                    <Icon name="Star" size={16} className="text-accent" />
                  </div>
                  <p className="text-2xl font-bold text-accent">{mockAnalytics.performanceMetrics.userSatisfaction}/5</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">DB Queries</span>
                    <Icon name="Database" size={16} className="text-success" />
                  </div>
                  <p className="text-2xl font-bold text-success">{formatNumber(mockAnalytics.performanceMetrics.databaseQueries)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;
