import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    'farmer@agritrace.com': { password: 'farmer123', role: 'farmer' },
    'distributor@agritrace.com': { password: 'distributor123', role: 'distributor' },
    'consumer@agritrace.com': { password: 'consumer123', role: 'consumer' },
    'retailer@agritrace.com': { password: 'retailer123', role: 'retailer' },
    'admin@agritrace.com': { password: 'admin123', role: 'admin' },
    'regulator@agritrace.com': { password: 'regulator123', role: 'regulator' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user exists in registered users
    const user = registeredUsers.find(u => u.email === formData?.email);
    
    if (!user) {
      setErrors({
        general: 'No account found with this email address. Please register first.'
      });
      setIsLoading(false);
      return;
    }

    // For now, we'll use a simple password check since we don't store passwords
    // In a real app, this would be handled by proper authentication
    if (formData?.password.length < 6) {
      setErrors({
        general: 'Invalid password. Please check your credentials and try again.'
      });
      setIsLoading(false);
      return;
    }

    // Store user session
    localStorage.setItem('userRole', user.role.toLowerCase());
    localStorage.setItem('userEmail', formData?.email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect based on role
    const roleRoutes = {
      farmer: '/farmer-dashboard',
      distributor: '/distributor-dashboard',
      consumer: '/consumer-dashboard',
      retailer: '/retailer-stock-management',
      admin: '/admin-dashboard',
      regulator: '/regulator-dashboard'
    };

    const userRole = user.role.toLowerCase();
    const redirectRoute = roleRoutes?.[userRole] || '/landing-page';
    
    setIsLoading(false);
    navigate(redirectRoute);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-error">Login Failed</p>
              <p className="text-sm text-error/80 mt-1">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-text-secondary hover:text-primary transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon 
              name={showPassword ? "EyeOff" : "Eye"} 
              size={20} 
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            className="text-sm"
          />
          
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          iconSize={20}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-text-secondary">Don't have an account?</span>
          </div>
        </div>

        {/* Create Account Button */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
          iconSize={20}
          onClick={() => navigate('/user-registration')}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;