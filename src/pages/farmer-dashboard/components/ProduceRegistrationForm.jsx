import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import QRCodeModal from './QRCodeModal';
import TranslatableText from '../../../components/ui/TranslatableText';
import { registerCrop, attachDoc } from '../../../services/blockchainService';
import { addCropPrice, uploadDocument } from '../../../services/backendService';

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
    description: '',
    documents: []
  });
  
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropOptions = [
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'onions', label: 'Onions' },
    { value: 'carrots', label: 'Carrots' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'apples', label: 'Apples' },
    { value: 'oranges', label: 'Oranges' }
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

  const handleDocumentUpload = async (e) => {
    const files = e.target.files;
    
    console.log('Files selected:', files.length);
    
    if (files.length === 0) return;
    
    // Process each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      console.log('Processing file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      try {
        // Read file content as base64
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            console.log('File read successfully, uploading to IPFS...');
            const base64Content = event.target.result.split(',')[1]; // Remove data URL prefix
            
            // Upload to IPFS via backend
            const uploadResult = await uploadDocument({
              content: base64Content,
              filename: file.name,
              docType: 'certificate'
            });
            
            console.log('Upload result:', uploadResult);
            
            if (uploadResult.status === 'success') {
              // Add to uploaded documents state
              const docInfo = {
                name: file.name,
                hash: uploadResult.data.hash,
                gatewayUrl: uploadResult.data.gatewayUrl,
                size: uploadResult.data.size,
                uploadedAt: uploadResult.data.uploadedAt
              };
              
              console.log('Document uploaded successfully:', docInfo);
              
              setUploadedDocuments(prev => [...prev, docInfo]);
              setFormData(prev => ({
                ...prev,
                documents: [...prev.documents, docInfo]
              }));
            } else {
              console.error('Document upload failed:', uploadResult.message || uploadResult.error);
              alert(`Document upload failed: ${uploadResult.message || uploadResult.error}`);
            }
          } catch (uploadError) {
            console.error('Error during upload:', uploadError);
            alert(`Error uploading document: ${uploadError.message}`);
          }
        };
        
        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          alert('Error reading file');
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing file:', error);
        alert(`Error processing file: ${error.message}`);
      }
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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Register crop on blockchain (without document hashes initially)
        const blockchainResult = await registerCrop(formData);
        
        if (blockchainResult.success) {
          // Attach documents to the registered crop
          if (formData.documents && formData.documents.length > 0) {
            try {
              // Attach each document
              for (const doc of formData.documents) {
                await attachDoc(blockchainResult.data.cropID, doc.hash, 'certificate');
              }
              
              console.log('Documents attached successfully');
            } catch (docError) {
              console.warn('Error attaching documents:', docError);
            }
          }
          
          // Store price history in backend database
          try {
            const priceResult = await addCropPrice(blockchainResult.data.cropID, {
              price: parseFloat(formData.expectedPrice),
              notes: `Initial price for ${formData.cropType} ${formData.variety || ''}`.trim()
            });
            
            if (!priceResult.success) {
              console.warn('Failed to store price history in backend:', priceResult.error);
            }
          } catch (priceError) {
            console.warn('Error storing price history in backend:', priceError);
          }
          
          // Call the original onSubmit with the blockchain result
          onSubmit({ ...formData, blockchainData: blockchainResult.data });
        } else {
          // Handle error
          console.error('Blockchain registration failed:', blockchainResult.error);
          // You might want to show an error message to the user
        }
      } catch (error) {
        console.error('Error during blockchain registration:', error);
        // Handle error
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
          <Icon name="Plus" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <TranslatableText as="h2" className="text-xl font-bold text-text-primary" text="Register New Produce" />
          <TranslatableText as="p" className="text-sm text-text-secondary" text="Add your harvest details to generate QR code" />
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
            label="Expected Price (INR)"
            type="number"
            name="expectedPrice"
            placeholder="Price per unit"
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
          label="Farm Location"
          type="text"
          name="location"
          placeholder="City, State/Province, Country"
          value={formData?.location}
          onChange={handleInputChange}
          error={errors?.location}
          required
          description="Complete address for traceability"
        />

        {/* Farm Size */}
        <Input
          label="Farm Size (acres)"
          type="number"
          name="farmSize"
          placeholder="Total farm area"
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

        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Upload Documents
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="documentUpload"
              className="hidden"
              onChange={handleDocumentUpload}
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <label 
              htmlFor="documentUpload"
              className="cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
            >
              <Icon name="Upload" size={16} color="white" />
              <TranslatableText as="span" text="Choose Files" />
            </label>
            <p className="text-sm text-text-secondary">
              Upload certificates, invoices, or other documents (PDF, JPG, PNG, DOC)
            </p>
          </div>
          
          {/* Uploaded Documents Preview */}
          {uploadedDocuments.length > 0 && (
            <div className="mt-4">
              <TranslatableText as="h4" className="text-sm font-medium text-text-primary mb-2" text="Uploaded Documents:" />
              <div className="space-y-2">
                {uploadedDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} color="gray" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                        <p className="text-xs text-text-secondary">{doc.size} bytes</p>
                      </div>
                    </div>
                    <a 
                      href={doc.gatewayUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      View on IPFS
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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
            loading={isSubmitting}
            iconName="QrCode"
            iconPosition="left"
            iconSize={18}
            className="min-w-48"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering on Blockchain...' : 'Register & Generate QR'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProduceRegistrationForm;