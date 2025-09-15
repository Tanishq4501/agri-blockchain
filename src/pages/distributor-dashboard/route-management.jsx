import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [newRoute, setNewRoute] = useState({
    name: '',
    startLocation: '',
    endLocation: '',
    driver: '',
    vehicle: '',
    priority: 'medium'
  });

  // Mock route data
  const mockRoutes = [
    {
      id: 'RT-001',
      name: 'Valley Fresh Route',
      startLocation: 'Green Valley Farm, CA',
      endLocation: 'Fresh Market Co., CA',
      distance: '45 miles',
      estimatedTime: '1h 30m',
      status: 'active',
      driver: 'Mike Thompson',
      vehicle: 'Truck-001 (Refrigerated)',
      priority: 'high',
      progress: 75,
      shipments: [
        { id: 'TOM-2025-001', product: 'Organic Tomatoes', quantity: '500kg', status: 'in_transit' },
        { id: 'CAR-2025-002', product: 'Fresh Carrots', quantity: '300kg', status: 'in_transit' }
      ],
      waypoints: [
        { location: 'Green Valley Farm', time: '08:00 AM', status: 'completed' },
        { location: 'Processing Center', time: '09:30 AM', status: 'completed' },
        { location: 'Distribution Hub', time: '11:00 AM', status: 'current' },
        { location: 'Fresh Market Co.', time: '12:30 PM', status: 'pending' }
      ],
      weather: { condition: 'Sunny', temperature: '24°C' },
      fuel: { current: 75, capacity: 100 },
      lastUpdate: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 'RT-002',
      name: 'Organic Express',
      startLocation: 'Sunrise Organic Farm, OR',
      endLocation: 'Whole Foods Market, CA',
      distance: '120 miles',
      estimatedTime: '3h 15m',
      status: 'scheduled',
      driver: 'Sarah Wilson',
      vehicle: 'Truck-002 (Standard)',
      priority: 'medium',
      progress: 0,
      shipments: [
        { id: 'LET-2025-003', product: 'Organic Lettuce', quantity: '200kg', status: 'loaded' },
        { id: 'SPN-2025-004', product: 'Baby Spinach', quantity: '150kg', status: 'loaded' }
      ],
      waypoints: [
        { location: 'Sunrise Organic Farm', time: '02:00 PM', status: 'pending' },
        { location: 'Oregon Border Checkpoint', time: '03:30 PM', status: 'pending' },
        { location: 'California Distribution', time: '05:00 PM', status: 'pending' },
        { location: 'Whole Foods Market', time: '06:30 PM', status: 'pending' }
      ],
      weather: { condition: 'Partly Cloudy', temperature: '22°C' },
      fuel: { current: 95, capacity: 100 },
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'RT-003',
      name: 'Local Delivery Circuit',
      startLocation: 'Regional Distribution Center',
      endLocation: 'Multiple Local Stores',
      distance: '85 miles',
      estimatedTime: '4h 45m',
      status: 'completed',
      driver: 'Alex Turner',
      vehicle: 'Van-001 (Small)',
      priority: 'low',
      progress: 100,
      shipments: [
        { id: 'MIX-2025-005', product: 'Mixed Vegetables', quantity: '400kg', status: 'delivered' }
      ],
      waypoints: [
        { location: 'Distribution Center', time: '06:00 AM', status: 'completed' },
        { location: 'Store A', time: '07:30 AM', status: 'completed' },
        { location: 'Store B', time: '09:00 AM', status: 'completed' },
        { location: 'Store C', time: '10:30 AM', status: 'completed' }
      ],
      weather: { condition: 'Clear', temperature: '20°C' },
      fuel: { current: 45, capacity: 80 },
      lastUpdate: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ];

  const drivers = [
    { value: 'mike_thompson', label: 'Mike Thompson' },
    { value: 'sarah_wilson', label: 'Sarah Wilson' },
    { value: 'alex_turner', label: 'Alex Turner' },
    { value: 'john_doe', label: 'John Doe' }
  ];

  const vehicles = [
    { value: 'truck_001', label: 'Truck-001 (Refrigerated)' },
    { value: 'truck_002', label: 'Truck-002 (Standard)' },
    { value: 'van_001', label: 'Van-001 (Small)' },
    { value: 'van_002', label: 'Van-002 (Medium)' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  useEffect(() => {
    setRoutes(mockRoutes);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'scheduled': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'completed': return 'bg-primary/10 text-primary border-primary/20';
      case 'delayed': return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Truck';
      case 'scheduled': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'delayed': return 'AlertTriangle';
      case 'cancelled': return 'XCircle';
      default: return 'Circle';
    }
  };

  const handleCreateRoute = (e) => {
    e.preventDefault();
    const route = {
      id: `RT-${String(routes.length + 1).padStart(3, '0')}`,
      ...newRoute,
      distance: `${Math.floor(Math.random() * 100) + 20} miles`,
      estimatedTime: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
      status: 'scheduled',
      progress: 0,
      shipments: [],
      waypoints: [
        { location: newRoute.startLocation, time: '08:00 AM', status: 'pending' },
        { location: newRoute.endLocation, time: '12:00 PM', status: 'pending' }
      ],
      weather: { condition: 'Clear', temperature: '23°C' },
      fuel: { current: 95, capacity: 100 },
      lastUpdate: new Date()
    };
    setRoutes([route, ...routes]);
    setNewRoute({ name: '', startLocation: '', endLocation: '', driver: '', vehicle: '', priority: 'medium' });
    setIsCreatingRoute(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Route Management</h2>
          <p className="text-text-secondary mt-1">Plan and monitor delivery routes</p>
        </div>
        <Button
          onClick={() => setIsCreatingRoute(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Create Route
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Truck" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active Routes</p>
              <p className="text-xl font-bold text-text-primary">
                {routes.filter(r => r.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Scheduled</p>
              <p className="text-xl font-bold text-text-primary">
                {routes.filter(r => r.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Completed Today</p>
              <p className="text-xl font-bold text-text-primary">
                {routes.filter(r => r.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Distance</p>
              <p className="text-xl font-bold text-text-primary">
                {routes.reduce((acc, r) => acc + parseInt(r.distance), 0)} mi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Route Modal */}
      {isCreatingRoute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">Create New Route</h3>
            <form onSubmit={handleCreateRoute} className="space-y-4">
              <Input
                placeholder="Route name"
                value={newRoute.name}
                onChange={(e) => setNewRoute(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <Input
                placeholder="Start location"
                value={newRoute.startLocation}
                onChange={(e) => setNewRoute(prev => ({ ...prev, startLocation: e.target.value }))}
                required
              />
              <Input
                placeholder="End location"
                value={newRoute.endLocation}
                onChange={(e) => setNewRoute(prev => ({ ...prev, endLocation: e.target.value }))}
                required
              />
              <Select
                value={newRoute.driver}
                onChange={(value) => setNewRoute(prev => ({ ...prev, driver: value }))}
                options={[{ value: '', label: 'Select Driver' }, ...drivers]}
                required
              />
              <Select
                value={newRoute.vehicle}
                onChange={(value) => setNewRoute(prev => ({ ...prev, vehicle: value }))}
                options={[{ value: '', label: 'Select Vehicle' }, ...vehicles]}
                required
              />
              <Select
                value={newRoute.priority}
                onChange={(value) => setNewRoute(prev => ({ ...prev, priority: value }))}
                options={priorityOptions}
              />
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Create Route</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreatingRoute(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover-lift cursor-pointer"
            onClick={() => setSelectedRoute(route)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Icon name={getStatusIcon(route.status)} size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{route.name}</h3>
                  <p className="text-sm text-text-secondary">{route.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(route.priority)}`}>
                  {route.priority}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-secondary">Distance</p>
                  <p className="font-medium text-text-primary">{route.distance}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Est. Time</p>
                  <p className="font-medium text-text-primary">{route.estimatedTime}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-text-secondary mb-1">Route</p>
                <p className="font-medium text-text-primary">{route.startLocation} → {route.endLocation}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-secondary">Driver</p>
                  <p className="font-medium text-text-primary">{route.driver}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Vehicle</p>
                  <p className="font-medium text-text-primary">{route.vehicle}</p>
                </div>
              </div>

              {route.status === 'active' && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Progress</span>
                    <span className="text-sm font-medium text-text-primary">{route.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${route.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={14} className="text-text-secondary" />
                    <span className="text-text-secondary">{route.shipments.length} shipments</span>
                  </div>
                  <span className="text-text-secondary">
                    Updated {route.lastUpdate.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Route Details Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">{selectedRoute.name}</h3>
                <p className="text-text-secondary">{selectedRoute.id}</p>
              </div>
              <Button
                variant="ghost"
                iconName="X"
                onClick={() => setSelectedRoute(null)}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Route Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Status:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedRoute.status)}`}>
                        {selectedRoute.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Priority:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(selectedRoute.priority)}`}>
                        {selectedRoute.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Distance:</span>
                      <span className="font-medium">{selectedRoute.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Est. Time:</span>
                      <span className="font-medium">{selectedRoute.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Driver:</span>
                      <span className="font-medium">{selectedRoute.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Vehicle:</span>
                      <span className="font-medium">{selectedRoute.vehicle}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Vehicle Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <Icon name="Fuel" size={20} className="mx-auto mb-1 text-primary" />
                      <p className="font-medium">{selectedRoute.fuel.current}%</p>
                      <p className="text-xs text-text-secondary">Fuel Level</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/5 rounded-lg">
                      <Icon name="Cloud" size={20} className="mx-auto mb-1 text-secondary" />
                      <p className="font-medium">{selectedRoute.weather.temperature}</p>
                      <p className="text-xs text-text-secondary">{selectedRoute.weather.condition}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Shipments</h4>
                  <div className="space-y-2">
                    {selectedRoute.shipments.map((shipment) => (
                      <div key={shipment.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-text-primary">{shipment.product}</p>
                            <p className="text-sm text-text-secondary">{shipment.id} • {shipment.quantity}</p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                            {shipment.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Waypoints Timeline */}
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Route Timeline</h4>
                <div className="space-y-4">
                  {selectedRoute.waypoints.map((waypoint, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      {index !== selectedRoute.waypoints.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-12 bg-gray-200"></div>
                      )}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        waypoint.status === 'completed' ? 'bg-success/10 border-success text-success' :
                        waypoint.status === 'current' ? 'bg-primary/10 border-primary text-primary' :
                        'bg-gray-100 border-gray-300 text-gray-500'
                      }`}>
                        <Icon 
                          name={
                            waypoint.status === 'completed' ? 'CheckCircle' :
                            waypoint.status === 'current' ? 'MapPin' :
                            'Clock'
                          } 
                          size={20} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-text-primary">{waypoint.location}</h5>
                          <span className="text-sm text-text-secondary">{waypoint.time}</span>
                        </div>
                        <p className="text-sm text-text-secondary capitalize">{waypoint.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setSelectedRoute(null)}>
                Close
              </Button>
              <Button iconName="Edit" iconPosition="left">
                Edit Route
              </Button>
              {selectedRoute.status === 'scheduled' && (
                <Button iconName="Play" iconPosition="left" variant="success">
                  Start Route
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;
