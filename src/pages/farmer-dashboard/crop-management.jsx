import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const CropManagement = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    plantingDate: '',
    expectedHarvest: '',
    area: '',
    status: 'planted'
  });

  // Mock crop data
  const mockCrops = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      variety: 'Cherry Tomatoes',
      plantingDate: '2024-12-01',
      expectedHarvest: '2025-02-15',
      actualHarvest: null,
      area: 2.5,
      status: 'growing',
      healthScore: 92,
      yieldEstimate: 850,
      notes: 'Excellent growth, regular watering schedule maintained',
      weather: { temperature: 24, humidity: 65, rainfall: 12 },
      tasks: [
        { id: 1, task: 'Watering', dueDate: '2025-01-15', completed: true },
        { id: 2, task: 'Fertilizing', dueDate: '2025-01-20', completed: false },
        { id: 3, task: 'Pest inspection', dueDate: '2025-01-22', completed: false }
      ]
    },
    {
      id: 2,
      name: 'Organic Carrots',
      variety: 'Purple Haze',
      plantingDate: '2024-11-15',
      expectedHarvest: '2025-01-30',
      actualHarvest: null,
      area: 1.8,
      status: 'ready',
      healthScore: 88,
      yieldEstimate: 420,
      notes: 'Ready for harvest, good root development observed',
      weather: { temperature: 22, humidity: 58, rainfall: 8 },
      tasks: [
        { id: 4, task: 'Harvest preparation', dueDate: '2025-01-25', completed: true },
        { id: 5, task: 'Quality check', dueDate: '2025-01-28', completed: false }
      ]
    },
    {
      id: 3,
      name: 'Organic Lettuce',
      variety: 'Butterhead',
      plantingDate: '2024-10-20',
      expectedHarvest: '2024-12-15',
      actualHarvest: '2024-12-18',
      area: 0.8,
      status: 'harvested',
      healthScore: 95,
      yieldEstimate: 180,
      actualYield: 175,
      notes: 'Successful harvest, excellent quality achieved',
      weather: { temperature: 18, humidity: 72, rainfall: 15 },
      tasks: []
    }
  ];

  const statusOptions = [
    { value: 'planted', label: 'Planted' },
    { value: 'growing', label: 'Growing' },
    { value: 'ready', label: 'Ready to Harvest' },
    { value: 'harvested', label: 'Harvested' }
  ];

  useEffect(() => {
    setCrops(mockCrops);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'planted': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'growing': return 'bg-primary/10 text-primary border-primary/20';
      case 'ready': return 'bg-warning/10 text-warning border-warning/20';
      case 'harvested': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'planted': return 'Seed';
      case 'growing': return 'Sprout';
      case 'ready': return 'Apple';
      case 'harvested': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const handleAddCrop = (e) => {
    e.preventDefault();
    const crop = {
      id: crops.length + 1,
      ...newCrop,
      area: parseFloat(newCrop.area),
      healthScore: Math.floor(Math.random() * 20) + 80,
      yieldEstimate: Math.floor(Math.random() * 500) + 200,
      notes: 'Newly planted crop',
      weather: { temperature: 23, humidity: 60, rainfall: 10 },
      tasks: []
    };
    setCrops([crop, ...crops]);
    setNewCrop({ name: '', variety: '', plantingDate: '', expectedHarvest: '', area: '', status: 'planted' });
    setIsAddingCrop(false);
  };

  const handleTaskToggle = (cropId, taskId) => {
    setCrops(crops.map(crop => 
      crop.id === cropId 
        ? {
            ...crop,
            tasks: crop.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : crop
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Crop Management</h2>
          <p className="text-text-secondary mt-1">Monitor and manage your crop lifecycle</p>
        </div>
        <Button
          onClick={() => setIsAddingCrop(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add New Crop
        </Button>
      </div>

      {/* Add Crop Modal */}
      {isAddingCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">Add New Crop</h3>
            <form onSubmit={handleAddCrop} className="space-y-4">
              <Input
                placeholder="Crop name"
                value={newCrop.name}
                onChange={(e) => setNewCrop(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <Input
                placeholder="Variety"
                value={newCrop.variety}
                onChange={(e) => setNewCrop(prev => ({ ...prev, variety: e.target.value }))}
                required
              />
              <Input
                type="date"
                placeholder="Planting date"
                value={newCrop.plantingDate}
                onChange={(e) => setNewCrop(prev => ({ ...prev, plantingDate: e.target.value }))}
                required
              />
              <Input
                type="date"
                placeholder="Expected harvest"
                value={newCrop.expectedHarvest}
                onChange={(e) => setNewCrop(prev => ({ ...prev, expectedHarvest: e.target.value }))}
                required
              />
              <Input
                type="number"
                step="0.1"
                placeholder="Area (acres)"
                value={newCrop.area}
                onChange={(e) => setNewCrop(prev => ({ ...prev, area: e.target.value }))}
                required
              />
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Add Crop</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddingCrop(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Crop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {crops.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover-lift cursor-pointer"
            onClick={() => setSelectedCrop(crop)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                  <Icon name={getStatusIcon(crop.status)} size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{crop.name}</h3>
                  <p className="text-sm text-text-secondary">{crop.variety}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(crop.status)}`}>
                {crop.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-secondary">Area</p>
                  <p className="font-medium text-text-primary">{crop.area} acres</p>
                </div>
                <div>
                  <p className="text-text-secondary">Health Score</p>
                  <p className="font-medium text-primary">{crop.healthScore}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-secondary">Planted</p>
                  <p className="font-medium text-text-primary">{new Date(crop.plantingDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Expected Harvest</p>
                  <p className="font-medium text-text-primary">{new Date(crop.expectedHarvest).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Yield Estimate</span>
                  <span className="text-sm font-medium text-text-primary">{crop.yieldEstimate} kg</span>
                </div>
              </div>

              {crop.tasks.length > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-text-secondary mb-2">Pending Tasks</p>
                  <div className="space-y-1">
                    {crop.tasks.filter(task => !task.completed).slice(0, 2).map(task => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span className="text-xs text-text-secondary">{task.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">{selectedCrop.name}</h3>
                <p className="text-text-secondary">{selectedCrop.variety}</p>
              </div>
              <Button
                variant="ghost"
                iconName="X"
                onClick={() => setSelectedCrop(null)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crop Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Crop Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Status:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedCrop.status)}`}>
                        {selectedCrop.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Area:</span>
                      <span className="font-medium">{selectedCrop.area} acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Health Score:</span>
                      <span className="font-medium text-primary">{selectedCrop.healthScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Yield Estimate:</span>
                      <span className="font-medium">{selectedCrop.yieldEstimate} kg</span>
                    </div>
                    {selectedCrop.actualYield && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Actual Yield:</span>
                        <span className="font-medium text-success">{selectedCrop.actualYield} kg</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Weather Conditions</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-primary/5 rounded-lg">
                      <Icon name="Thermometer" size={16} className="mx-auto mb-1 text-primary" />
                      <p className="font-medium">{selectedCrop.weather.temperature}°C</p>
                      <p className="text-xs text-text-secondary">Temp</p>
                    </div>
                    <div className="text-center p-2 bg-secondary/5 rounded-lg">
                      <Icon name="Droplets" size={16} className="mx-auto mb-1 text-secondary" />
                      <p className="font-medium">{selectedCrop.weather.humidity}%</p>
                      <p className="text-xs text-text-secondary">Humidity</p>
                    </div>
                    <div className="text-center p-2 bg-accent/5 rounded-lg">
                      <Icon name="CloudRain" size={16} className="mx-auto mb-1 text-accent" />
                      <p className="font-medium">{selectedCrop.weather.rainfall}mm</p>
                      <p className="text-xs text-text-secondary">Rainfall</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Tasks & Activities</h4>
                  <div className="space-y-2">
                    {selectedCrop.tasks.map(task => (
                      <div
                        key={task.id}
                        className={`flex items-center space-x-3 p-2 rounded-lg border ${
                          task.completed ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'
                        }`}
                      >
                        <button
                          onClick={() => handleTaskToggle(selectedCrop.id, task.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            task.completed ? 'bg-success border-success' : 'border-gray-300'
                          }`}
                        >
                          {task.completed && <Icon name="Check" size={12} color="white" />}
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                            {task.task}
                          </p>
                          <p className="text-xs text-text-secondary">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Notes</h4>
                  <p className="text-sm text-text-secondary bg-muted/50 p-3 rounded-lg">
                    {selectedCrop.notes}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setSelectedCrop(null)}>
                Close
              </Button>
              <Button iconName="Edit" iconPosition="left">
                Edit Crop
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CropManagement;
