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
import { Checkbox } from '../../components/ui/Checkbox';

const ConsumerProfile = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});

  const userData = {
    name: 'Anita Sharma (अनिता शर्मा)',
    email: 'anita.sharma@gmail.com',
    role: 'consumer',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'New FSSAI organic certification available for your favorite basmati rice (आपके पसंदीदा बासमती के लिए)',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    }
  ];

  const mockProfileData = {
    personalInfo: {
      firstName: 'Anita (अनिता)',
      lastName: 'Sharma (शर्मा)',
      email: 'anita.sharma@gmail.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1990-07-22',
      address: 'A-204, Green Valley Apartments, Bandra West, Mumbai, Maharashtra 400050'
    },
    preferences: {
      dietaryRestrictions: ['Vegetarian (शाकाहारी)', 'Jain Food'],
      allergens: ['Nuts (मेवे)', 'Dairy (डेयरी)'],
      sustainabilityPriority: 'high',
      localProductsPreference: true,
      organicPreference: true,
      priceRange: 'medium',
      shoppingFrequency: 'weekly'
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      priceAlerts: true,
      availabilityAlerts: true,
      sustainabilityUpdates: true,
      newCertifications: false
    },
    privacy: {
      profileVisibility: 'private',
      shareScansWithFriends: false,
      allowDataForResearch: true,
      locationTracking: false
    },
    scanningStats: {
      totalScans: 127,
      uniqueProducts: 45,
      favoriteProducts: 8,
      sustainabilityScore: 87,
      carbonFootprintSaved: '24.5 kg CO2',
      joinDate: '2023-08-15'
    },
    achievements: [
      {
        id: 'ECO_WARRIOR',
        name: 'Eco Warrior (पर्यावरण योद्धा)',
        description: 'Scanned 100+ sustainable products from Indian organic farms',
        earnedDate: '2024-01-10',
        icon: 'Leaf'
      },
      {
        id: 'TRANSPARENCY_CHAMPION',
        name: 'Transparency Champion (पारदर्शिता चैंपियन)',
        description: 'Verified 50+ FSSAI certified product origins',
        earnedDate: '2024-01-05',
        icon: 'Shield'
      },
      {
        id: 'LOCAL_SUPPORTER',
        name: 'Local Supporter (स्थानीय समर्थक)',
        description: 'Scanned 25+ products from Maharashtra farmers',
        earnedDate: '2023-12-20',
        icon: 'MapPin'
      }
    ]
  };

  useEffect(() => {
    setProfileData(mockProfileData);
    document.title = 'Profile - AgriTrace';
  }, []);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const dietaryOptions = ['Vegetarian (शाकाहारी)', 'Vegan', 'Jain Food (जैन भोजन)', 'Gluten-Free', 'Dairy-Free', 'Sattvic (सात्त्विक)'];
  const allergenOptions = ['Nuts', 'Shellfish', 'Eggs', 'Dairy', 'Soy', 'Wheat', 'Fish'];

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
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center">
                    <Icon name="User" size={40} color="white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      {profileData.personalInfo?.firstName} {profileData.personalInfo?.lastName}
                    </h2>
                    <p className="text-text-secondary">Conscious Consumer</p>
                    <p className="text-sm text-text-secondary">{profileData.personalInfo?.email}</p>
                    <p className="text-sm text-accent">
                      Member since {profileData.scanningStats?.joinDate && formatDate(profileData.scanningStats.joinDate)}
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

              {/* Scanning Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profileData.scanningStats?.totalScans}</p>
                  <p className="text-sm text-text-secondary">Total Scans</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{profileData.scanningStats?.uniqueProducts}</p>
                  <p className="text-sm text-text-secondary">Unique Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">{profileData.scanningStats?.favoriteProducts}</p>
                  <p className="text-sm text-text-secondary">Favorites</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{profileData.scanningStats?.sustainabilityScore}</p>
                  <p className="text-sm text-text-secondary">Sustainability Score</p>
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

            {/* Dietary Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Utensils" size={20} className="mr-2" />
                Dietary Preferences
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">Dietary Restrictions</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {dietaryOptions.map(option => (
                      <Checkbox
                        key={option}
                        checked={profileData.preferences?.dietaryRestrictions?.includes(option) || false}
                        onChange={(checked) => handleArrayPreferenceChange('preferences', 'dietaryRestrictions', option, checked)}
                        label={option}
                        disabled={!isEditing}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">Allergens</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allergenOptions.map(option => (
                      <Checkbox
                        key={option}
                        checked={profileData.preferences?.allergens?.includes(option) || false}
                        onChange={(checked) => handleArrayPreferenceChange('preferences', 'allergens', option, checked)}
                        label={option}
                        disabled={!isEditing}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Sustainability Priority</label>
                    {isEditing ? (
                      <Select
                        value={profileData.preferences?.sustainabilityPriority || 'medium'}
                        onChange={(e) => handlePreferenceChange('preferences', 'sustainabilityPriority', e.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                    ) : (
                      <p className="text-text-primary capitalize">{profileData.preferences?.sustainabilityPriority}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Shopping Frequency</label>
                    {isEditing ? (
                      <Select
                        value={profileData.preferences?.shoppingFrequency || 'weekly'}
                        onChange={(e) => handlePreferenceChange('preferences', 'shoppingFrequency', e.target.value)}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    ) : (
                      <p className="text-text-primary capitalize">{profileData.preferences?.shoppingFrequency}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Checkbox
                    checked={profileData.preferences?.localProductsPreference || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'localProductsPreference', checked)}
                    label="Prefer local products"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.preferences?.organicPreference || false}
                    onChange={(checked) => handlePreferenceChange('preferences', 'organicPreference', checked)}
                    label="Prefer organic products"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Bell" size={20} className="mr-2" />
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Notification Methods</h4>
                  <div className="space-y-3">
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
                  <div className="space-y-3">
                    <Checkbox
                      checked={profileData.notifications?.priceAlerts || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'priceAlerts', checked)}
                      label="Price drop alerts"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.availabilityAlerts || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'availabilityAlerts', checked)}
                      label="Product availability alerts"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.sustainabilityUpdates || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'sustainabilityUpdates', checked)}
                      label="Sustainability updates"
                      disabled={!isEditing}
                    />
                    <Checkbox
                      checked={profileData.notifications?.newCertifications || false}
                      onChange={(checked) => handlePreferenceChange('notifications', 'newCertifications', checked)}
                      label="New certification alerts"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Award" size={20} className="mr-2" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.achievements?.map((achievement, index) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center">
                        <Icon name={achievement.icon} size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{achievement.name}</h4>
                        <p className="text-xs text-text-secondary">
                          Earned {formatDate(achievement.earnedDate)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Shield" size={20} className="mr-2" />
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Profile Visibility</label>
                  {isEditing ? (
                    <Select
                      value={profileData.privacy?.profileVisibility || 'private'}
                      onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
                    >
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                      <option value="public">Public</option>
                    </Select>
                  ) : (
                    <p className="text-text-primary capitalize">{profileData.privacy?.profileVisibility}</p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Checkbox
                    checked={profileData.privacy?.shareScansWithFriends || false}
                    onChange={(checked) => handlePreferenceChange('privacy', 'shareScansWithFriends', checked)}
                    label="Share scan activity with friends"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.privacy?.allowDataForResearch || false}
                    onChange={(checked) => handlePreferenceChange('privacy', 'allowDataForResearch', checked)}
                    label="Allow anonymized data for sustainability research"
                    disabled={!isEditing}
                  />
                  <Checkbox
                    checked={profileData.privacy?.locationTracking || false}
                    onChange={(checked) => handlePreferenceChange('privacy', 'locationTracking', checked)}
                    label="Enable location tracking for local product recommendations"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsumerProfile;
