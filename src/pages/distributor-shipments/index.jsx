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

const DistributorShipments = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  const mockShipments = [
    {
      id: 'SH-2024-001',
      trackingNumber: 'TRK789123456',
      origin: 'Green Valley Farm, CA',
      destination: 'Whole Foods Market, San Francisco',
      status: 'in-transit',
      priority: 'high',
      products: [
        { name: 'Organic Tomatoes', quantity: '500 lbs', temperature: '2-4°C' },
        { name: 'Fresh Lettuce', quantity: '200 heads', temperature: '0-2°C' }
      ],
      departureDate: '2024-01-15T06:00:00Z',
      estimatedArrival: '2024-01-15T18:00:00Z',
      actualArrival: null,
      driver: 'Carlos Martinez',
      vehicle: 'Truck-001 (Refrigerated)',
      distance: '450 miles',
      currentLocation: 'Highway 101, San Jose',
      temperature: '2.1°C',
      humidity: '85%',
      alerts: [
        { type: 'temperature', message: 'Temperature slightly above optimal range' }
      ],
      timeline: [
        { stage: 'Picked up', time: '2024-01-15T06:00:00Z', location: 'Green Valley Farm, CA' },
        { stage: 'In transit', time: '2024-01-15T06:30:00Z', location: 'Highway 101, San Jose' }
      ]
    },
    {
      id: 'SH-2024-002',
      trackingNumber: 'TRK456789123',
      origin: 'Happy Hen Farm, OR',
      destination: 'Local Grocery Chain, Portland',
      status: 'delivered',
      priority: 'medium',
      products: [
        { name: 'Free-Range Eggs', quantity: '1000 dozen', temperature: '4-7°C' }
      ],
      departureDate: '2024-01-14T08:00:00Z',
      estimatedArrival: '2024-01-14T14:00:00Z',
      actualArrival: '2024-01-14T13:45:00Z',
      driver: 'Lisa Chen',
      vehicle: 'Van-003 (Refrigerated)',
      distance: '120 miles',
      currentLocation: 'Local Grocery Chain, Portland',
      temperature: '5.2°C',
      humidity: '80%',
      alerts: [],
      timeline: [
        { stage: 'Picked up', time: '2024-01-14T08:00:00Z', location: 'Happy Hen Farm, OR' },
        { stage: 'In transit', time: '2024-01-14T08:30:00Z', location: 'I-5 North' },
        { stage: 'Delivered', time: '2024-01-14T13:45:00Z', location: 'Local Grocery Chain, Portland' }
      ]
    },
    {
      id: 'SH-2024-003',
      trackingNumber: 'TRK123456789',
      origin: 'Sunshine Farms, CA',
      destination: 'Farmer\'s Market Hub, LA',
      status: 'pending',
      priority: 'low',
      products: [
        { name: 'Organic Carrots', quantity: '800 lbs', temperature: '0-2°C' },
        { name: 'Fresh Spinach', quantity: '300 bunches', temperature: '0-2°C' }
      ],
      departureDate: '2024-01-16T05:00:00Z',
      estimatedArrival: '2024-01-16T15:00:00Z',
      actualArrival: null,
      driver: 'David Kim',
      vehicle: 'Truck-002 (Refrigerated)',
      distance: '380 miles',
      currentLocation: 'Sunshine Farms, CA',
      temperature: null,
      humidity: null,
      alerts: [],
      timeline: [
        { stage: 'Scheduled', time: '2024-01-15T12:00:00Z', location: 'Sunshine Farms, CA' }
      ]
    },
    {
      id: 'SH-2024-004',
      trackingNumber: 'TRK987654321',
      origin: 'Organic Valley Co-op, WI',
      destination: 'Natural Foods Store, Chicago',
      status: 'delayed',
      priority: 'high',
      products: [
        { name: 'Organic Milk', quantity: '500 gallons', temperature: '2-4°C' },
        { name: 'Organic Cheese', quantity: '200 lbs', temperature: '2-4°C' }
      ],
      departureDate: '2024-01-14T10:00:00Z',
      estimatedArrival: '2024-01-15T16:00:00Z',
      actualArrival: null,
      driver: 'Jennifer Walsh',
      vehicle: 'Truck-004 (Refrigerated)',
      distance: '520 miles',
      currentLocation: 'I-94, Milwaukee',
      temperature: '3.8°C',
      humidity: '82%',
      alerts: [
        { type: 'delay', message: 'Traffic delays - arrival pushed to 8 PM' }
      ],
      timeline: [
        { stage: 'Picked up', time: '2024-01-14T10:00:00Z', location: 'Organic Valley Co-op, WI' },
        { stage: 'Delayed', time: '2024-01-15T14:00:00Z', location: 'I-94, Milwaukee' }
      ]
    }
  ];

  useEffect(() => {
    document.title = 'Shipments - AgriTrace';
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
      case 'delivered': return 'bg-success/10 text-success border-success/20';
      case 'in-transit': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'delayed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'CheckCircle';
      case 'in-transit': return 'Truck';
      case 'pending': return 'Clock';
      case 'delayed': return 'AlertTriangle';
      default: return 'Package';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || shipment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedShipments = [...filteredShipments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.departureDate) - new Date(a.departureDate);
      case 'oldest':
        return new Date(a.departureDate) - new Date(b.departureDate);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
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

  const handleTrackShipment = (trackingNumber) => {
    console.log('Tracking shipment:', trackingNumber);
  };

  const handleUpdateShipment = (shipmentId) => {
    navigate('/distributor-dashboard', { state: { updateShipment: shipmentId } });
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
                <h1 className="text-2xl font-bold text-text-primary">Shipments</h1>
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
                    <p className="text-sm font-medium text-text-secondary">Total Shipments</p>
                    <p className="text-2xl font-bold text-text-primary">{mockShipments.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="Package" size={24} className="text-primary" />
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
                    <p className="text-sm font-medium text-text-secondary">In Transit</p>
                    <p className="text-2xl font-bold text-secondary">
                      {mockShipments.filter(s => s.status === 'in-transit').length}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Icon name="Truck" size={24} className="text-secondary" />
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
                    <p className="text-sm font-medium text-text-secondary">Delivered Today</p>
                    <p className="text-2xl font-bold text-success">
                      {mockShipments.filter(s => 
                        s.status === 'delivered' && 
                        s.actualArrival && 
                        new Date(s.actualArrival).toDateString() === new Date().toDateString()
                      ).length}
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
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Alerts</p>
                    <p className="text-2xl font-bold text-error">
                      {mockShipments.reduce((sum, s) => sum + s.alerts.length, 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-error/10 rounded-full">
                    <Icon name="AlertTriangle" size={24} className="text-error" />
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
                    placeholder="Search shipments, tracking numbers, or destinations..."
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
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-w-[150px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority">By Priority</option>
                </Select>
              </div>
            </motion.div>

            {/* Shipments List */}
            <div className="space-y-6">
              {sortedShipments.map((shipment, index) => (
                <motion.div
                  key={shipment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  {/* Shipment Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Truck" size={24} color="white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-text-primary">{shipment.id}</h3>
                          <span className={`text-sm font-medium ${getPriorityColor(shipment.priority)}`}>
                            {shipment.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <p className="text-text-secondary font-mono text-sm">{shipment.trackingNumber}</p>
                        <p className="text-sm text-text-secondary">
                          {shipment.origin} → {shipment.destination}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Driver: {shipment.driver} • Vehicle: {shipment.vehicle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                        <Icon name={getStatusIcon(shipment.status)} size={12} className="mr-1" />
                        {shipment.status.replace('-', ' ')}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTrackShipment(shipment.trackingNumber)}
                        iconName="MapPin"
                        iconPosition="left"
                      >
                        Track
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdateShipment(shipment.id)}
                        iconName="Edit"
                        iconPosition="left"
                      >
                        Update
                      </Button>
                    </div>
                  </div>

                  {/* Alerts */}
                  {shipment.alerts.length > 0 && (
                    <div className="mb-4">
                      {shipment.alerts.map((alert, alertIndex) => (
                        <div 
                          key={alertIndex}
                          className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg mb-2"
                        >
                          <Icon name="AlertTriangle" size={16} className="text-error" />
                          <p className="text-sm text-error font-medium">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shipment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Departure</p>
                      <p className="text-text-primary">{formatDateTime(shipment.departureDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">
                        {shipment.actualArrival ? 'Arrived' : 'ETA'}
                      </p>
                      <p className="text-text-primary">
                        {shipment.actualArrival 
                          ? formatDateTime(shipment.actualArrival)
                          : formatDateTime(shipment.estimatedArrival)
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Distance</p>
                      <p className="text-text-primary">{shipment.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Current Location</p>
                      <p className="text-text-primary">{shipment.currentLocation}</p>
                    </div>
                  </div>

                  {/* Environmental Conditions */}
                  {shipment.temperature && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Temperature</p>
                        <p className="text-text-primary font-semibold">{shipment.temperature}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">Humidity</p>
                        <p className="text-text-primary font-semibold">{shipment.humidity}</p>
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-secondary mb-2">Products</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {shipment.products.map((product, productIndex) => (
                        <div 
                          key={productIndex}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-text-primary">{product.name}</p>
                            <p className="text-xs text-text-secondary">{product.quantity}</p>
                          </div>
                          <span className="text-xs text-secondary font-medium">{product.temperature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-3">Timeline</p>
                    <div className="flex flex-wrap gap-4">
                      {shipment.timeline.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{event.stage}</p>
                            <p className="text-xs text-text-secondary">
                              {formatDateTime(event.time)} • {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {sortedShipments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No shipments found</h3>
                <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistributorShipments;
