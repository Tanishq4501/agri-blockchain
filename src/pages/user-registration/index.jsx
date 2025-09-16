import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import RoleSelector from './components/RoleSelector';
import DynamicFormFields from './components/DynamicFormFields';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import TermsModal from './components/TermsModal';
import { registerUser } from '../../services/backendService';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Role validation
    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    // Basic field validation
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData?.state?.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    // Role-specific validation
    if (formData?.role === 'farmer') {
      if (!formData?.farmName?.trim()) {
        newErrors.farmName = 'Farm name is required';
      }
      if (!formData?.farmSize) {
        newErrors.farmSize = 'Farm size is required';
      }
      if (!formData?.primaryCrop) {
        newErrors.primaryCrop = 'Primary crop is required';
      }
    }

    if (formData?.role === 'distributor') {
      if (!formData?.companyName?.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData?.businessType) {
        newErrors.businessType = 'Business type is required';
      }
      if (!formData?.businessLicense?.trim()) {
        newErrors.businessLicense = 'Business license is required';
      }
    }

    if (formData?.role === 'retailer') {
      if (!formData?.storeName?.trim()) {
        newErrors.storeName = 'Store name is required';
      }
      if (!formData?.storeType) {
        newErrors.storeType = 'Store type is required';
      }
      if (!formData?.businessRegistration?.trim()) {
        newErrors.businessRegistration = 'Business registration is required';
      }
    }

    if (formData?.role === 'admin') {
      if (!formData?.employeeId?.trim()) {
        newErrors.employeeId = 'Employee ID is required';
      }
      if (!formData?.department?.trim()) {
        newErrors.department = 'Department is required';
      }
      if (!formData?.authCode?.trim()) {
        newErrors.authCode = 'Authorization code is required';
      }
    }

    if (formData?.role === 'regulator') {
      if (!formData?.officialId?.trim()) {
        newErrors.officialId = 'Official ID is required';
      }
      if (!formData?.regulatorDepartment) {
        newErrors.regulatorDepartment = 'Department is required';
      }
      if (!formData?.jurisdiction?.trim()) {
        newErrors.jurisdiction = 'Jurisdiction is required';
      }
      if (!formData?.credentials?.trim()) {
        newErrors.credentials = 'Regulatory credentials are required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare user data for backend API
      // Format phone number to match backend validation
      let formattedPhone = formData?.phone || '';
      // Remove all non-digit characters except + at the beginning
      if (formattedPhone) {
        if (formattedPhone.startsWith('+')) {
          formattedPhone = '+' + formattedPhone.replace(/\D/g, '');
        } else {
          formattedPhone = formattedPhone.replace(/\D/g, '');
        }
        // Ensure it starts with + if not already
        if (!formattedPhone.startsWith('+') && formattedPhone.length > 0) {
          formattedPhone = '+' + formattedPhone;
        }
      }
      
      // Map frontend role IDs to backend role names
      const roleMap = {
        'farmer': 'Farmer',
        'distributor': 'Distributor',
        'retailer': 'Retailer',
        'consumer': 'Consumer',
        'admin': 'Admin',
        'regulator': 'Regulator'
      };
      
      const userData = {
        userID: `${formData?.role}-${Date.now()}`, // Generate unique userID
        role: roleMap[formData?.role] || formData?.role, // Map to backend role name
        name: `${formData?.firstName} ${formData?.lastName}`,
        contactInfo: {
          email: formData?.email,
          phone: formattedPhone,
          address: {
            street: formData?.address,
            city: formData?.city,
            state: formData?.state,
            country: formData?.country,
            zipCode: formData?.zipCode
          }
        }
      };
      

      // Call backend API to register user
      const result = await registerUser(userData);
      console.log('Backend API response:', result);
      
      if (result?.status === 'success') {
        // Registration successful - redirect to appropriate dashboard
        const dashboardRoutes = {
          farmer: '/farmer-dashboard',
          distributor: '/distributor-dashboard',
          consumer: '/consumer-verification',
          retailer: '/retailer-stock-management',
          admin: '/admin-dashboard',
          regulator: '/regulator-dashboard'
        };

        // Use the original formData role (lowercase) for navigation
        const targetRoute = dashboardRoutes?.[formData?.role] || '/user-login';
        console.log('Registration successful, attempting to navigate to:', targetRoute);
        console.log('Role used for navigation:', formData?.role);
        navigate(targetRoute);
        console.log('Navigation called');
      } else {
        console.log('Registration failed with result:', result);
        // Registration failed
        let errorMessage = result?.message || 'Registration failed. Please try again.';
        if (result?.details && Array.isArray(result?.details)) {
          errorMessage += ': ' + result?.details?.join(', ');
        }
        setErrors({ submit: errorMessage });
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error?.message) {
        setErrors({ submit: `Registration failed: ${error?.message}` });
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/landing-page" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center shadow-soft">
                <Icon name="Leaf" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary tracking-tight">AgriTrace</span>
                <span className="text-xs text-text-secondary -mt-1">Supply Chain Trust</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary hidden sm:block">
                Already have an account?
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/user-login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Create Your Account
            </h1>
            <p className="text-text-secondary">
              Join the trusted agricultural supply chain network
            </p>
          </div>

          {/* Registration Form */}
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Role Selection */}
              <RoleSelector
                selectedRole={formData?.role}
                onRoleChange={(role) => handleInputChange('role', role)}
                error={errors?.role}
              />

              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData?.firstName}
                    onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                    error={errors?.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData?.lastName}
                    onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                    error={errors?.lastName}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData?.password}
                      onChange={(e) => handleInputChange('password', e?.target?.value)}
                      error={errors?.password}
                      required
                    />
                    <PasswordStrengthIndicator password={formData?.password} />
                  </div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData?.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                    error={errors?.confirmPassword}
                    required
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                />
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary border-b border-gray-200 pb-2">
                  Address Information
                </h3>
                
                <Input
                  label="Street Address"
                  type="text"
                  placeholder="Enter your street address"
                  value={formData?.address}
                  onChange={(e) => handleInputChange('address', e?.target?.value)}
                  error={errors?.address}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text"
                    placeholder="Enter city"
                    value={formData?.city}
                    onChange={(e) => handleInputChange('city', e?.target?.value)}
                    error={errors?.city}
                    required
                  />
                  <Input
                    label="State"
                    type="text"
                    placeholder="Enter state"
                    value={formData?.state}
                    onChange={(e) => handleInputChange('state', e?.target?.value)}
                    error={errors?.state}
                    required
                  />
                  <Input
                    label="ZIP Code"
                    type="text"
                    placeholder="12345"
                    value={formData?.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                    error={errors?.zipCode}
                    required
                  />
                </div>
              </div>

              {/* Role-specific Fields */}
              <DynamicFormFields
                selectedRole={formData?.role}
                formData={formData}
                onChange={handleInputChange}
                errors={errors}
              />

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <Checkbox
                  label={
                    <span className="text-sm">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="text-primary hover:underline font-medium"
                      >
                        Terms and Conditions
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="text-primary hover:underline font-medium"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  }
                  checked={formData?.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                  error={errors?.agreeToTerms}
                  required
                />
              </div>

              {/* Submit Error */}
              {errors?.submit && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-error text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-2" />
                    {errors?.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={20}
                disabled={!formData?.agreeToTerms}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-text-secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/user-login" 
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};

export default UserRegistration;