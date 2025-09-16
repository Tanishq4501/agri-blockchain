import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DynamicFormFields = ({ selectedRole, formData, onChange, errors }) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const cropOptions = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'corn', label: 'Corn' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'onions', label: 'Onions' },
    { value: 'carrots', label: 'Carrots' },
    { value: 'lettuce', label: 'Lettuce' },
    { value: 'apples', label: 'Apples' },
    { value: 'oranges', label: 'Oranges' }
  ];

  const businessTypeOptions = [
    { value: 'logistics', label: 'Logistics Company' },
    { value: 'transport', label: 'Transportation Service' },
    { value: 'warehouse', label: 'Warehouse Management' },
    { value: 'cold_chain', label: 'Cold Chain Specialist' }
  ];

  const storeTypeOptions = [
    { value: 'grocery', label: 'Grocery Store' },
    { value: 'supermarket', label: 'Supermarket' },
    { value: 'wholesale', label: 'Wholesale Market' },
    { value: 'organic', label: 'Organic Store' },
    { value: 'farmers_market', label: 'Farmers Market' }
  ];

  const departmentOptions = [
    { value: 'agriculture', label: 'Department of Agriculture' },
    { value: 'food_safety', label: 'Food Safety Authority' },
    { value: 'commerce', label: 'Department of Commerce' },
    { value: 'health', label: 'Health Department' }
  ];

  if (!selectedRole) return null;

  return (
    <div className="space-y-6">
      {selectedRole === 'farmer' && (
        <>
          <Input
            label="Farm Name"
            type="text"
            placeholder="Enter your farm name"
            value={formData?.farmName || ''}
            onChange={(e) => handleInputChange('farmName', e?.target?.value)}
            error={errors?.farmName}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Farm Size (acres)"
              type="number"
              placeholder="e.g., 50"
              value={formData?.farmSize || ''}
              onChange={(e) => handleInputChange('farmSize', e?.target?.value)}
              error={errors?.farmSize}
              required
            />
            <Select
              label="Primary Crop"
              placeholder="Select primary crop"
              options={cropOptions}
              value={formData?.primaryCrop || ''}
              onChange={(value) => handleInputChange('primaryCrop', value)}
              error={errors?.primaryCrop}
              required
            />
          </div>
          <Input
            label="Farming License Number"
            type="text"
            placeholder="Enter license number"
            value={formData?.licenseNumber || ''}
            onChange={(e) => handleInputChange('licenseNumber', e?.target?.value)}
            error={errors?.licenseNumber}
            description="Your agricultural license or registration number"
          />
        </>
      )}
      {selectedRole === 'distributor' && (
        <>
          <Input
            label="Company Name"
            type="text"
            placeholder="Enter company name"
            value={formData?.companyName || ''}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            error={errors?.companyName}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Business Type"
              placeholder="Select business type"
              options={businessTypeOptions}
              value={formData?.businessType || ''}
              onChange={(value) => handleInputChange('businessType', value)}
              error={errors?.businessType}
              required
            />
            <Input
              label="Fleet Size"
              type="number"
              placeholder="Number of vehicles"
              value={formData?.fleetSize || ''}
              onChange={(e) => handleInputChange('fleetSize', e?.target?.value)}
              error={errors?.fleetSize}
            />
          </div>
          <Input
            label="Business License"
            type="text"
            placeholder="Enter business license number"
            value={formData?.businessLicense || ''}
            onChange={(e) => handleInputChange('businessLicense', e?.target?.value)}
            error={errors?.businessLicense}
            required
          />
        </>
      )}
      {selectedRole === 'retailer' && (
        <>
          <Input
            label="Store Name"
            type="text"
            placeholder="Enter store name"
            value={formData?.storeName || ''}
            onChange={(e) => handleInputChange('storeName', e?.target?.value)}
            error={errors?.storeName}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Store Type"
              placeholder="Select store type"
              options={storeTypeOptions}
              value={formData?.storeType || ''}
              onChange={(value) => handleInputChange('storeType', value)}
              error={errors?.storeType}
              required
            />
            <Input
              label="Annual Revenue (INR)"
              type="number"
              placeholder="e.g., 500000"
              value={formData?.annualRevenue || ''}
              onChange={(e) => handleInputChange('annualRevenue', e?.target?.value)}
              error={errors?.annualRevenue}
            />
          </div>
          <Input
            label="Business Registration"
            type="text"
            placeholder="Enter registration number"
            value={formData?.businessRegistration || ''}
            onChange={(e) => handleInputChange('businessRegistration', e?.target?.value)}
            error={errors?.businessRegistration}
            required
          />
        </>
      )}
      {selectedRole === 'admin' && (
        <>
          <Input
            label="Employee ID"
            type="text"
            placeholder="Enter employee ID"
            value={formData?.employeeId || ''}
            onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
            error={errors?.employeeId}
            required
          />
          <Input
            label="Department"
            type="text"
            placeholder="Enter department name"
            value={formData?.department || ''}
            onChange={(e) => handleInputChange('department', e?.target?.value)}
            error={errors?.department}
            required
          />
          <Input
            label="Authorization Code"
            type="text"
            placeholder="Enter admin authorization code"
            value={formData?.authCode || ''}
            onChange={(e) => handleInputChange('authCode', e?.target?.value)}
            error={errors?.authCode}
            description="Contact system administrator for authorization code"
            required
          />
        </>
      )}
      {selectedRole === 'regulator' && (
        <>
          <Input
            label="Official ID"
            type="text"
            placeholder="Enter official ID number"
            value={formData?.officialId || ''}
            onChange={(e) => handleInputChange('officialId', e?.target?.value)}
            error={errors?.officialId}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Department"
              placeholder="Select department"
              options={departmentOptions}
              value={formData?.regulatorDepartment || ''}
              onChange={(value) => handleInputChange('regulatorDepartment', value)}
              error={errors?.regulatorDepartment}
              required
            />
            <Input
              label="Jurisdiction"
              type="text"
              placeholder="e.g., State of California"
              value={formData?.jurisdiction || ''}
              onChange={(e) => handleInputChange('jurisdiction', e?.target?.value)}
              error={errors?.jurisdiction}
              required
            />
          </div>
          <Input
            label="Regulatory Credentials"
            type="text"
            placeholder="Enter credential number"
            value={formData?.credentials || ''}
            onChange={(e) => handleInputChange('credentials', e?.target?.value)}
            error={errors?.credentials}
            description="Your regulatory authority credentials"
            required
          />
        </>
      )}
    </div>
  );
};

export default DynamicFormFields;