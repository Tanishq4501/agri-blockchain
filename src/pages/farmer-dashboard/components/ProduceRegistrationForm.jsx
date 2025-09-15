import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProduceRegistrationForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    cropType: '',
    variety: '',
    quantity: '',
    unit: 'kg',
    harvestDate: '',
    location: '',
    farmSize: '',
    organicCertified: false,
    qualityCertifications: [],
    expectedPrice: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const cropOptions = [
    { value: 'tomatoes', label: 'Tomatoes (टमाटर)' },
    { value: 'potatoes', label: 'Potatoes (आलू)' },
    { value: 'onions', label: 'Onions (प्याज)' },
    { value: 'carrots', label: 'Carrots (गाजर)' },
    { value: 'wheat', label: 'Wheat (गेहूं)' },
    { value: 'rice', label: 'Rice (चावल)' },
    { value: 'corn', label: 'Corn (मक्का)' },
    { value: 'soybeans', label: 'Soybeans (सोयाबीन)' },
    { value: 'apples', label: 'Apples (सेब)' },
    { value: 'oranges', label: 'Oranges (संतरा)' },
    { value: 'spinach', label: 'Spinach (पालक)' },
    { value: 'cabbage', label: 'Cabbage (पत्ता गोभी)' },
    { value: 'cauliflower', label: 'Cauliflower (फूल गोभी)' },
    { value: 'okra', label: 'Okra (भिंडी)' },
    { value: 'eggplant', label: 'Eggplant (बैंगन)' }
  ];

  const unitOptions = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'tons', label: 'Tons' },
    { value: 'pounds', label: 'Pounds (lbs)' },
    { value: 'bushels', label: 'Bushels' },
    { value: 'crates', label: 'Crates' }
  ];

  const certificationOptions = [
    { value: 'organic', label: 'Organic Certified' },
    { value: 'gmp', label: 'Good Manufacturing Practice' },
    { value: 'haccp', label: 'HACCP Certified' },
    { value: 'iso22000', label: 'ISO 22000' },
    { value: 'fairtrade', label: 'Fair Trade Certified' },
    { value: 'rainforest', label: 'Rainforest Alliance' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.cropType) newErrors.cropType = 'Crop type is required';
    if (!formData?.quantity) newErrors.quantity = 'Quantity is required';
    if (formData?.quantity && isNaN(formData?.quantity)) newErrors.quantity = 'Quantity must be a number';
    if (!formData?.harvestDate) newErrors.harvestDate = 'Harvest date is required';
    if (!formData?.location) newErrors.location = 'Location is required';
    if (!formData?.expectedPrice) newErrors.expectedPrice = 'Expected price is required';
    if (formData?.expectedPrice && isNaN(formData?.expectedPrice)) newErrors.expectedPrice = 'Price must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
          <Icon name="Plus" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">Register New Produce</h2>
          <p className="text-sm text-text-secondary">Add your harvest details to generate QR code</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crop Type */}
          <Select
            label="Crop Type"
            placeholder="Select crop type"
            options={cropOptions}
            value={formData?.cropType}
            onChange={(value) => handleSelectChange('cropType', value)}
            error={errors?.cropType}
            required
            searchable
          />

          {/* Variety */}
          <Input
            label="Variety"
            type="text"
            name="variety"
            placeholder="e.g., Cherry, Roma, Beefsteak"
            value={formData?.variety}
            onChange={handleInputChange}
            description="Specific variety or cultivar"
          />

          {/* Quantity */}
          <Input
            label="Quantity"
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData?.quantity}
            onChange={handleInputChange}
            error={errors?.quantity}
            required
            min="0"
            step="0.01"
          />

          {/* Unit */}
          <Select
            label="Unit"
            options={unitOptions}
            value={formData?.unit}
            onChange={(value) => handleSelectChange('unit', value)}
          />

          {/* Harvest Date */}
          <Input
            label="Harvest Date"
            type="date"
            name="harvestDate"
            value={formData?.harvestDate}
            onChange={handleInputChange}
            error={errors?.harvestDate}
            required
            max={new Date()?.toISOString()?.split('T')?.[0]}
          />

          {/* Expected Price */}
          <Input
            label="Expected Price (प्रति किलो कीमत ₹)"
            type="number"
            name="expectedPrice"
            placeholder="Price per kg in Rupees"
            value={formData?.expectedPrice}
            onChange={handleInputChange}
            error={errors?.expectedPrice}
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Location */}
        <Input
          label="Farm Location (फार्म का स्थान)"
          type="text"
          name="location"
          placeholder="Village, District, State, India"
          value={formData?.location}
          onChange={handleInputChange}
          error={errors?.location}
          required
          description="Complete address for traceability"
        />

        {/* Farm Size */}
        <Input
          label="Farm Size (फार्म का आकार - एकड़)"
          type="number"
          name="farmSize"
          placeholder="Total farm area in acres"
          value={formData?.farmSize}
          onChange={handleInputChange}
          min="0"
          step="0.1"
        />

        {/* Quality Certifications */}
        <Select
          label="Quality Certifications"
          placeholder="Select certifications"
          options={certificationOptions}
          value={formData?.qualityCertifications}
          onChange={(value) => handleSelectChange('qualityCertifications', value)}
          multiple
          description="Select all applicable certifications"
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Additional Details
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Any additional information about the produce..."
            value={formData?.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            iconName="QrCode"
            iconPosition="left"
            iconSize={18}
            className="min-w-48"
          >
            {isLoading ? 'Generating QR Code...' : 'Register & Generate QR'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProduceRegistrationForm;