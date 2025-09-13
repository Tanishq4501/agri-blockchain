import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LogisticsUpdateForm = ({ onSubmit, isLoading, scannedProduct }) => {
  const [formData, setFormData] = useState({
    location: '',
    status: '',
    estimatedDelivery: '',
    notes: ''
  });

  const statusOptions = [
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'at_warehouse', label: 'At Warehouse' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'returned', label: 'Returned' }
  ];

  // Auto-fill timestamp when component mounts or status changes
  useEffect(() => {
    const now = new Date();
    const timestamp = now?.toISOString()?.slice(0, 16); // Format for datetime-local input
    setFormData(prev => ({ ...prev, timestamp: timestamp }));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData?.location || !formData?.status) {
      return;
    }

    onSubmit?.({
      ...formData,
      productId: scannedProduct?.id,
      productName: scannedProduct?.name,
      timestamp: new Date()
    });

    // Reset form after submission
    setFormData({
      location: '',
      status: '',
      estimatedDelivery: '',
      notes: ''
    });
  };

  const handleQuickUpdate = (status) => {
    const quickFormData = {
      location: 'Current GPS Location',
      status: status,
      timestamp: new Date(),
      notes: `Quick update: ${status}`
    };

    onSubmit?.({
      ...quickFormData,
      productId: scannedProduct?.id,
      productName: scannedProduct?.name
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">
          Logistics Update
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={16} />
          <span>{new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
      {/* Product Context */}
      {scannedProduct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">
                {scannedProduct?.name}
              </h4>
              <p className="text-sm text-blue-700">
                ID: {scannedProduct?.id} • {scannedProduct?.quantity}
              </p>
            </div>
          </div>
        </motion.div>
      )}
      {/* Quick Action Buttons */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Quick Updates
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-left justify-start"
            iconName="MapPin"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleQuickUpdate('picked_up')}
            disabled={isLoading || !scannedProduct}
          >
            Picked Up
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-left justify-start"
            iconName="Truck"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleQuickUpdate('in_transit')}
            disabled={isLoading || !scannedProduct}
          >
            In Transit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-left justify-start"
            iconName="Building"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleQuickUpdate('at_warehouse')}
            disabled={isLoading || !scannedProduct}
          >
            At Warehouse
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-left justify-start"
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={14}
            onClick={() => handleQuickUpdate('delivered')}
            disabled={isLoading || !scannedProduct}
          >
            Delivered
          </Button>
        </div>
      </div>
      {/* Detailed Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Location
          </label>
          <Input
            type="text"
            placeholder="Enter current location or GPS coordinates"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            className="w-full"
            required
            iconName="MapPin"
            iconPosition="left"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Transit Status
          </label>
          <Select
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
            placeholder="Select status"
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Timestamp (Auto-filled)
          </label>
          <Input
            type="datetime-local"
            value={formData?.timestamp}
            onChange={(e) => handleInputChange('timestamp', e?.target?.value)}
            className="w-full"
            iconName="Clock"
            iconPosition="left"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Estimated Delivery
          </label>
          <Input
            type="datetime-local"
            value={formData?.estimatedDelivery}
            onChange={(e) => handleInputChange('estimatedDelivery', e?.target?.value)}
            className="w-full"
            iconName="Calendar"
            iconPosition="left"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Add any additional notes or comments"
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="default"
            className="w-full"
            iconName="Send"
            iconPosition="left"
            iconSize={18}
            disabled={isLoading || !formData?.location || !formData?.status}
          >
            {isLoading ? 'Updating Location...' : 'Update Logistics Status'}
          </Button>
        </motion.div>
      </form>
      {/* Current Location Helper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Location Tips</p>
            <p>Use GPS coordinates, landmark names, or detailed addresses for accurate tracking.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogisticsUpdateForm;