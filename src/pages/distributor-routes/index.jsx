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

const DistributorRoutes = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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
      message: 'Route RT-001 has traffic delays - ETA updated',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'info',
      message: 'New optimized route available for tomorrow',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    }
  ];

  const mockRoutes = [
    {
      id: 'RT-001',
      name: 'Bay Area Fresh Produce Route',
      status: 'active',
      driver: 'Carlos Martinez',
      vehicle: 'Truck-001 (Refrigerated)',
      startTime: '2024-01-15T06:00:00Z',
      estimatedEndTime: '2024-01-15T18:00:00Z',
      actualEndTime: null,
      totalDistance: '245 miles',
      estimatedDuration: '12 hours',
      fuelEfficiency: '8.5 mpg',
      carbonFootprint: '28.8 kg CO2',
      stops: [
        {
          id: 'STOP-001',
          name: 'Green Valley Farm',
          address: '123 Farm Road, Salinas, CA',
          type: 'pickup',
          status: 'completed',
          scheduledTime: '2024-01-15T06:00:00Z',
          actualTime: '2024-01-15T06:05:00Z',
          products: ['Organic Tomatoes - 500 lbs', 'Fresh Lettuce - 200 heads'],
          duration: '30 minutes'
        },
        {
          id: 'STOP-002',
          name: 'Whole Foods Market - Downtown',
          address: '456 Market St, San Francisco, CA',
          type: 'delivery',
          status: 'in-progress',
          scheduledTime: '2024-01-15T14:00:00Z',
          actualTime: null,
          products: ['Organic Tomatoes - 300 lbs'],
          duration: '45 minutes'
        },
        {
          id: 'STOP-003',
          name: 'Whole Foods Market - Mission',
          address: '789 Mission St, San Francisco, CA',
          type: 'delivery',
          status: 'pending',
          scheduledTime: '2024-01-15T16:00:00Z',
          actualTime: null,
          products: ['Organic Tomatoes - 200 lbs', 'Fresh Lettuce - 200 heads'],
          duration: '45 minutes'
        }
      ],
      currentLocation: 'Highway 101, approaching San Francisco',
      alerts: [
        { type: 'traffic', message: 'Heavy traffic on Highway 101 - 30 min delay expected' }
      ]
    },
    {
      id: 'RT-002',
      name: 'Oregon Dairy Distribution',
      status: 'completed',
      driver: 'Lisa Chen',
      vehicle: 'Van-003 (Refrigerated)',
      startTime: '2024-01-14T08:00:00Z',
      estimatedEndTime: '2024-01-14T16:00:00Z',
      actualEndTime: '2024-01-14T15:30:00Z',
      totalDistance: '180 miles',
      estimatedDuration: '8 hours',
      fuelEfficiency: '12.2 mpg',
      carbonFootprint: '14.8 kg CO2',
      stops: [
        {
          id: 'STOP-004',
          name: 'Happy Hen Farm',
          address: '321 Rural Route, Portland, OR',
          type: 'pickup',
          status: 'completed',
          scheduledTime: '2024-01-14T08:00:00Z',
          actualTime: '2024-01-14T08:00:00Z',
          products: ['Free-Range Eggs - 1000 dozen'],
          duration: '20 minutes'
        },
        {
          id: 'STOP-005',
          name: 'Local Grocery Chain - Store 1',
          address: '654 Main St, Portland, OR',
          type: 'delivery',
          status: 'completed',
          scheduledTime: '2024-01-14T10:00:00Z',
          actualTime: '2024-01-14T09:45:00Z',
          products: ['Free-Range Eggs - 500 dozen'],
          duration: '30 minutes'
        },
        {
          id: 'STOP-006',
          name: 'Local Grocery Chain - Store 2',
          address: '987 Oak Ave, Portland, OR',
          type: 'delivery',
          status: 'completed',
          scheduledTime: '2024-01-14T14:00:00Z',
          actualTime: '2024-01-14T13:45:00Z',
          products: ['Free-Range Eggs - 500 dozen'],
          duration: '30 minutes'
        }
      ],
      currentLocation: 'Completed',
      alerts: []
    },
    {
      id: 'RT-003',
      name: 'LA Organic Produce Circuit',
      status: 'scheduled',
      driver: 'David Kim',
      vehicle: 'Truck-002 (Refrigerated)',
      startTime: '2024-01-16T05:00:00Z',
      estimatedEndTime: '2024-01-16T17:00:00Z',
      actualEndTime: null,
      totalDistance: '320 miles',
      estimatedDuration: '12 hours',
      fuelEfficiency: '8.8 mpg',
      carbonFootprint: '36.4 kg CO2',
      stops: [
        {
          id: 'STOP-007',
          name: 'Sunshine Farms',
          address: '555 Valley Road, Fresno, CA',
          type: 'pickup',
          status: 'scheduled',
          scheduledTime: '2024-01-16T05:00:00Z',
          actualTime: null,
          products: ['Organic Carrots - 800 lbs', 'Fresh Spinach - 300 bunches'],
          duration: '45 minutes'
        },
        {
          id: 'STOP-008',
          name: 'Farmer\'s Market Hub',
          address: '111 Market Plaza, Los Angeles, CA',
          type: 'delivery',
          status: 'scheduled',
          scheduledTime: '2024-01-16T12:00:00Z',
          actualTime: null,
          products: ['Organic Carrots - 400 lbs', 'Fresh Spinach - 150 bunches'],
          duration: '60 minutes'
        },
        {
          id: 'STOP-009',
          name: 'Natural Foods Co-op',
          address: '222 Wellness Blvd, Los Angeles, CA',
          type: 'delivery',
          status: 'scheduled',
          scheduledTime: '2024-01-16T15:00:00Z',
          actualTime: null,
          products: ['Organic Carrots - 400 lbs', 'Fresh Spinach - 150 bunches'],
          duration: '45 minutes'
        }
      ],
      currentLocation: 'Not started',
      alerts: []
    }
  ];

  useEffect(() => {
    document.title = 'Routes - AgriTrace';
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
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'active': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'scheduled': return 'bg-warning/10 text-warning border-warning/20';
      case 'delayed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'active': return 'Navigation';
      case 'scheduled': return 'Clock';
      case 'delayed': return 'AlertTriangle';
      default: return 'Map';
    }
  };

  const getStopStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'in-progress': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'scheduled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredRoutes = mockRoutes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || route.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.startTime) - new Date(a.startTime);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
        return parseFloat(b.totalDistance) - parseFloat(a.totalDistance);
      default:
        return 0;
    }
  });

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleOptimizeRoute = (routeId) => {
    console.log('Optimizing route:', routeId);
    alert('Route optimization feature would be implemented here');
  };

  const handleTrackRoute = (routeId) => {
    console.log('Tracking route:', routeId);
    alert('Real-time tracking feature would be implemented here');
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
                <h1 className="text-2xl font-bold text-text-primary">Routes</h1>
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
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Routes</p>
                    <p className="text-2xl font-bold text-text-primary">{mockRoutes.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="Map" size={24} className="text-primary" />
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
                    <p className="text-sm font-medium text-text-secondary">Active Routes</p>
                    <p className="text-2xl font-bold text-secondary">
                      {mockRoutes.filter(r => r.status === 'active').length}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Icon name="Navigation" size={24} className="text-secondary" />
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
                    <p className="text-sm font-medium text-text-secondary">Avg. Efficiency</p>
                    <p className="text-2xl font-bold text-success">
                      {(mockRoutes.reduce((sum, r) => sum + parseFloat(r.fuelEfficiency), 0) / mockRoutes.length).toFixed(1)} mpg
                    </p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-full">
                    <Icon name="Fuel" size={24} className="text-success" />
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
                    <p className="text-sm font-medium text-text-secondary">CO2 Today</p>
                    <p className="text-2xl font-bold text-accent">
                      {mockRoutes
                        .filter(r => new Date(r.startTime).toDateString() === new Date().toDateString())
                        .reduce((sum, r) => sum + parseFloat(r.carbonFootprint), 0)
                        .toFixed(1)} kg
                    </p>
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
                    placeholder="Search routes, drivers, or route IDs..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="delayed">Delayed</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-w-[150px]"
                >
                  <option value="date">By Date</option>
                  <option value="name">By Name</option>
                  <option value="distance">By Distance</option>
                </Select>
              </div>
            </motion.div>

            {/* Routes List */}
            <div className="space-y-6">
              {sortedRoutes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  {/* Route Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Map" size={24} color="white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-text-primary">{route.name}</h3>
                          <span className="text-sm text-text-secondary font-mono">{route.id}</span>
                        </div>
                        <p className="text-text-secondary">Driver: {route.driver}</p>
                        <p className="text-sm text-text-secondary">Vehicle: {route.vehicle}</p>
                        <p className="text-sm text-text-secondary">
                          Started: {formatDateTime(route.startTime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
                        <Icon name={getStatusIcon(route.status)} size={12} className="mr-1" />
                        {route.status}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTrackRoute(route.id)}
                        iconName="MapPin"
                        iconPosition="left"
                      >
                        Track
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleOptimizeRoute(route.id)}
                        iconName="Zap"
                        iconPosition="left"
                      >
                        Optimize
                      </Button>
                    </div>
                  </div>

                  {/* Alerts */}
                  {route.alerts.length > 0 && (
                    <div className="mb-4">
                      {route.alerts.map((alert, alertIndex) => (
                        <div 
                          key={alertIndex}
                          className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg mb-2"
                        >
                          <Icon name="AlertTriangle" size={16} className="text-warning" />
                          <p className="text-sm text-warning font-medium">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Route Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Distance</p>
                      <p className="text-text-primary font-semibold">{route.totalDistance}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Duration</p>
                      <p className="text-text-primary font-semibold">{route.estimatedDuration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Fuel Efficiency</p>
                      <p className="text-success font-semibold">{route.fuelEfficiency}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Carbon Footprint</p>
                      <p className="text-accent font-semibold">{route.carbonFootprint}</p>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-text-secondary mb-2">Current Location</p>
                    <p className="text-text-primary">{route.currentLocation}</p>
                  </div>

                  {/* Route Stops */}
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-3">Route Stops ({route.stops.length})</p>
                    <div className="space-y-3">
                      {route.stops.map((stop, stopIndex) => (
                        <div key={stop.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-200 mt-1">
                            <span className="text-xs font-semibold text-text-primary">{stopIndex + 1}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-text-primary">{stop.name}</h4>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStopStatusColor(stop.status)}`}>
                                  {stop.status}
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  stop.type === 'pickup' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                                }`}>
                                  <Icon name={stop.type === 'pickup' ? 'ArrowUp' : 'ArrowDown'} size={10} className="mr-1" />
                                  {stop.type}
                                </span>
                              </div>
                              <span className="text-xs text-text-secondary">{stop.duration}</span>
                            </div>
                            <p className="text-sm text-text-secondary mb-2">{stop.address}</p>
                            <div className="flex items-center justify-between text-xs text-text-secondary">
                              <span>
                                Scheduled: {formatDateTime(stop.scheduledTime)}
                                {stop.actualTime && ` • Actual: ${formatDateTime(stop.actualTime)}`}
                              </span>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-text-secondary mb-1">Products:</p>
                              <div className="flex flex-wrap gap-1">
                                {stop.products.map((product, productIndex) => (
                                  <span 
                                    key={productIndex}
                                    className="inline-block px-2 py-0.5 bg-white rounded text-xs text-text-primary border"
                                  >
                                    {product}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {sortedRoutes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <Icon name="Map" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No routes found</h3>
                <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistributorRoutes;
