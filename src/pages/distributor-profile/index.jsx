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
import Checkbox from '../../components/ui/Checkbox';

const DistributorProfile = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});

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

  const mockProfileData = {
    personalInfo: {
      firstName: 'Mike',
      lastName: 'Rodriguez',
      email: 'mike.rodriguez@fastlogistics.com',
      phone: '+91 84688 29368',
      dateOfBirth: '1985-09-12',
      address: '789 Logistics Way, Oakland, CA 94607'
    },
    companyInfo: {
      companyName: 'Fast Logistics Solutions',
      businessType: 'Cold Chain Distribution',
      licenseNumber: 'DOT-123456789',
      establishedYear: '2015',
      employeeCount: '25-50',
      serviceAreas: ['California', 'Oregon', 'Nevada'],
      specializations: ['Refrigerated Transport', 'Organic Products', 'Fresh Produce']
    },
    certifications: [
      {
        name: 'DOT Commercial License',
        issuedBy: 'Department of Transportation',
        issueDate: '2023-01-15',
        expiryDate: '2025-01-15',
        certificateNumber: 'DOT-123456789',
        status: 'active'
      },
      {
        name: 'HACCP Certification',
        issuedBy: 'Food Safety Authority',
        issueDate: '2023-06-20',
        expiryDate: '2025-06-20',
        certificateNumber: 'HACCP-2023-456',
        status: 'active'
      },
      {
        name: 'Cold Chain Certification',
        issuedBy: 'International Cold Chain Association',
        issueDate: '2023-03-10',
        expiryDate: '2024-03-10',
        certificateNumber: 'CCC-2023-789',
        status: 'expiring-soon'
      }
    ],
    fleetInfo: {
      totalVehicles: 8,
      refrigeratedTrucks: 5,
      standardTrucks: 2,
      vans: 1,
      averageAge: '3.2 years',
      fuelType: 'Diesel/Electric Hybrid',
      gpsTracking: true,
      temperatureMonitoring: true
    },
    operationalStats: {
      totalDeliveries: 1247,
      onTimeDeliveryRate: '96.8%',
      averageDeliveryTime: '4.2 hours',
      fuelEfficiency: '9.2 mpg',
      carbonFootprintReduction: '15%',
      customerSatisfaction: '4.7/5',
      joinDate: '2022-03-15'
    },
    preferences: {
      routeOptimization: true,
      realTimeTracking: true,
      temperatureAlerts: true,
      trafficUpdates: true,
      fuelEfficiencyReports: true,
      sustainabilityMetrics: true
    },
    notifications: {
      email: true,
      sms: true,
      push: true,
      deliveryAlerts: true,
      routeUpdates: true,
      maintenanceReminders: true,
      performanceReports: false
    },
    privacy: {
      profileVisibility: 'business-partners',
      sharePerformanceMetrics: true,
      allowRouteOptimization: true,
      locationTracking: true
    }
  };

  useEffect(() => {
    // Use actual user data for profile
    if (userData) {
      setProfileData({
        firstName: userData.name?.split(' ')[0] || 'Michael',
        lastName: userData.name?.split(' ')[1] || 'Chen',
        email: userData.email || 'distributor@agritrace.com',
        phone: userData.phone || '+91 84688 29368',
        address: userData.address || '789 Distribution Center Blvd',
        city: userData.city || 'Los Angeles',
        state: userData.state || 'California',
        zipCode: userData.zipCode || '90210',
        country: userData.country || 'United States',
        companyName: userData.companyName || 'Fresh Logistics Co.',
        companySize: userData.companySize || '50-100 employees',
        serviceArea: userData.serviceArea || 'West Coast',
        yearsInBusiness: userData.yearsInBusiness || '8',
        specializations: userData.specializations || ['Cold Chain', 'Organic Products', 'Last-Mile Delivery'],
        certifications: userData.certifications || ['ISO 9001', 'HACCP', 'Organic Handling'],
        bio: userData.bio || 'Experienced logistics professional specializing in fresh produce distribution...'
      });
    } else {
      // Fallback to mock data if no user data
      setProfileData(mockProfileData);
    }
    document.title = 'Profile - AgriTrace';
  }, [userData]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const handlePreferenceChange = (category, key, value) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleArrayPreferenceChange = (category, key, item, checked) => {
    setProfileData(prev => {
      const currentArray = prev[category][key] || [];
      const newArray = checked 
        ? [...currentArray, item]
        : currentArray.filter(i => i !== item);
      
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: newArray
        }
      };
    });
  };

  const getCertificationStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'expiring-soon': return 'bg-warning/10 text-warning border-warning/20';
      case 'expired': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const serviceAreaOptions = ['California', 'Oregon', 'Nevada', 'Washington', 'Arizona', 'Utah'];
  const specializationOptions = ['Refrigerated Transport', 'Organic Products', 'Fresh Produce', 'Dairy Products', 'Frozen Foods', 'Pharmaceuticals'];

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
                <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
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
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name="Truck" size={40} color="white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      {profileData.personalInfo?.firstName} {profileData.personalInfo?.lastName}
                    </h2>
                    <p className="text-text-secondary">{profileData.companyInfo?.companyName}</p>
                    <p className="text-sm text-text-secondary">{profileData.personalInfo?.email}</p>
                    <p className="text-sm text-accent">
                      Partner since {profileData.operationalStats?.joinDate && formatDate(profileData.operationalStats.joinDate)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} iconName="Save" iconPosition="left">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEditToggle} iconName="Edit" iconPosition="left">
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Operational Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profileData.operationalStats?.totalDeliveries}</p>
                  <p className="text-sm text-text-secondary">Total Deliveries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{profileData.operationalStats?.onTimeDeliveryRate}</p>
                  <p className="text-sm text-text-secondary">On-Time Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">{profileData.operationalStats?.customerSatisfaction}</p>
                  <p className="text-sm text-text-secondary">Customer Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{profileData.operationalStats?.fuelEfficiency}</p>
                  <p className="text-sm text-text-secondary">Fuel Efficiency</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="User" size={20} className="mr-2" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.firstName || ''}
                      onChange={(e) => handlePreferenceChange('personalInfo', 'firstName', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Last Name</label>
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.lastName || ''}
                      onChange={(e) => handlePreferenceChange('personalInfo', 'lastName', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <p className="text-text-primary">{profileData.personalInfo?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Phone</label>
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.phone || ''}
                      onChange={(e) => handlePreferenceChange('personalInfo', 'phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.phone}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-2">Address</label>
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.address || ''}
                      onChange={(e) => handlePreferenceChange('personalInfo', 'address', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.address}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Building" size={20} className="mr-2" />
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Company Name</label>
                  {isEditing ? (
                    <Input
                      value={profileData.companyInfo?.companyName || ''}
                      onChange={(e) => handlePreferenceChange('companyInfo', 'companyName', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.companyInfo?.companyName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Business Type</label>
                  {isEditing ? (
                    <Input
                      value={profileData.companyInfo?.businessType || ''}
                      onChange={(e) => handlePreferenceChange('companyInfo', 'businessType', e.target.value)}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.companyInfo?.businessType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">License Number</label>
                  <p className="text-text-primary font-mono">{profileData.companyInfo?.licenseNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Established</label>
                  <p className="text-text-primary">{profileData.companyInfo?.establishedYear}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Employee Count</label>
                  <p className="text-text-primary">{profileData.companyInfo?.employeeCount}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">Service Areas</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.companyInfo?.serviceAreas?.map((area, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.companyInfo?.specializations?.map((spec, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      <Icon name="Star" size={12} className="mr-1" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Fleet Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Truck" size={20} className="mr-2" />
                Fleet Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Total Vehicles</p>
                  <p className="text-2xl font-bold text-primary">{profileData.fleetInfo?.totalVehicles}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary">Refrigerated Trucks</p>
                  <p className="text-2xl font-bold text-secondary">{profileData.fleetInfo?.refrigeratedTrucks}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary">Standard Trucks</p>
                  <p className="text-2xl font-bold text-success">{profileData.fleetInfo?.standardTrucks}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary">Vans</p>
                  <p className="text-2xl font-bold text-accent">{profileData.fleetInfo?.vans}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary">Average Age</p>
                  <p className="text-text-primary font-semibold">{profileData.fleetInfo?.averageAge}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary">Fuel Type</p>
                  <p className="text-text-primary font-semibold">{profileData.fleetInfo?.fuelType}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Checkbox
                  checked={profileData.fleetInfo?.gpsTracking || false}
                  onChange={(checked) => handlePreferenceChange('fleetInfo', 'gpsTracking', checked)}
                  label="GPS Tracking enabled"
                  disabled={!isEditing}
                />
                <Checkbox
                  checked={profileData.fleetInfo?.temperatureMonitoring || false}
                  onChange={(checked) => handlePreferenceChange('fleetInfo', 'temperatureMonitoring', checked)}
                  label="Temperature monitoring enabled"
                  disabled={!isEditing}
                />
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Award" size={20} className="mr-2" />
                Certifications
              </h3>
              <div className="grid gap-4">
                {profileData.certifications?.map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-primary">{cert.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCertificationStatusColor(cert.status)}`}>
                        <Icon name="Shield" size={12} className="mr-1" />
                        {cert.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Issued by: </span>
                        <span className="text-text-primary">{cert.issuedBy}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Valid until: </span>
                        <span className="text-text-primary">{cert.expiryDate}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Certificate #: </span>
                        <span className="text-text-primary font-mono">{cert.certificateNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Settings" size={20} className="mr-2" />
                Operational Preferences
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox
                    checked={profileData.preferences?.routeOptimization || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'routeOptimization', checked)}
                    label="Enable automatic route optimization"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.preferences?.realTimeTracking || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'realTimeTracking', checked)}
                    label="Real-time vehicle tracking"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.preferences?.temperatureAlerts || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'temperatureAlerts', checked)}
                    label="Temperature deviation alerts"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.preferences?.trafficUpdates || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'trafficUpdates', checked)}
                    label="Traffic and route updates"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.preferences?.fuelEfficiencyReports || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'fuelEfficiencyReports', checked)}
                    label="Fuel efficiency reporting"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.preferences?.sustainabilityMetrics || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'sustainabilityMetrics', checked)}
                    label="Sustainability metrics tracking"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Bell" size={20} className="mr-2" />
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Notification Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Checkbox
                      checked={profileData.notifications?.email || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'email', checked)}
                      label="Email notifications"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.sms || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'sms', checked)}
                      label="SMS notifications"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.push || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'push', checked)}
                      label="Push notifications"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Alert Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Checkbox
                      checked={profileData.notifications?.deliveryAlerts || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'deliveryAlerts', checked)}
                      label="Delivery status alerts"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.routeUpdates || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'routeUpdates', checked)}
                      label="Route optimization updates"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.maintenanceReminders || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'maintenanceReminders', checked)}
                      label="Vehicle maintenance reminders"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.performanceReports || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'performanceReports', checked)}
                      label="Weekly performance reports"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistributorProfile;
