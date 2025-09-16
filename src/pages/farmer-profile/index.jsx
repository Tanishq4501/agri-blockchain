import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import TranslateToggle from '../../components/ui/TranslateToggle';
import TranslatableText from '../../components/ui/TranslatableText';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});

  const userData = {
    name: 'John Mitchell',
    email: 'john.mitchell@greenfarm.com',
    role: 'farmer',
    avatar: null
  };

  const notifications = [];

  const mockProfileData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Mitchell',
      email: 'john.mitchell@greenfarm.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      address: '123 Green Valley Road, California, USA'
    },
    farmInfo: {
      farmName: 'Green Valley Farm',
      farmSize: '50 acres',
      farmType: 'Organic Vegetables',
      establishedYear: '2010',
      farmingMethods: ['Organic', 'Sustainable', 'Non-GMO'],
      primaryCrops: ['Tomatoes', 'Carrots', 'Lettuce', 'Peppers']
    },
    certifications: [
      {
        name: 'INRA Organic',
        issuedBy: 'INRA',
        issueDate: '2023-01-15',
        expiryDate: '2026-01-15',
        certificateNumber: 'ORG-2023-001',
        status: 'active'
      },
      {
        name: 'Fair Trade Certified',
        issuedBy: 'Fair Trade USA',
        issueDate: '2023-03-20',
        expiryDate: '2025-03-20',
        certificateNumber: 'FT-2023-002',
        status: 'active'
      }
    ],
    bankingInfo: {
      accountHolder: 'John Mitchell',
      bankName: 'Green Valley Bank',
      accountNumber: '****1234',
      routingNumber: '****5678',
      paymentMethods: ['Bank Transfer', 'Digital Wallet']
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        profileVisibility: 'public',
        contactInfo: 'verified-only'
      }
    }
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
    // Here you would typically save to API
    console.log('Profile saved:', profileData);
  };

  const getCertificationStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'expired': return 'bg-error/10 text-error border-error/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
                <TranslatableText as="h1" className="text-2xl font-bold text-text-primary" text="Profile" />
              </div>

              <div className="flex items-center space-x-4">
                <TranslateToggle />
                <NotificationIndicator
                  notifications={notifications}
                  unreadCount={0}
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
                    <p className="text-text-secondary">{profileData.farmInfo?.farmName}</p>
                    <p className="text-sm text-text-secondary">{profileData.personalInfo?.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <TranslatableText text="Cancel" />
                      </Button>
                      <Button onClick={handleSaveProfile} iconName="Save" iconPosition="left">
                        <TranslatableText text="Save Changes" />
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEditToggle} iconName="Edit" iconPosition="left">
                      <TranslatableText text="Edit Profile" />
                    </Button>
                  )}
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
                <TranslatableText text="Personal Information" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="First Name" />
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.firstName || ''}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                      }))}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.firstName}</p>
                  )}
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Last Name" />
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.lastName || ''}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                      }))}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.lastName}</p>
                  )}
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Email" />
                  <p className="text-text-primary">{profileData.personalInfo?.email}</p>
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Phone" />
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.phone || ''}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.phone}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Address" />
                  {isEditing ? (
                    <Input
                      value={profileData.personalInfo?.address || ''}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value }
                      }))}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.personalInfo?.address}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Farm Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Leaf" size={20} className="mr-2" />
                <TranslatableText text="Farm Information" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Farm Name" />
                  {isEditing ? (
                    <Input
                      value={profileData.farmInfo?.farmName || ''}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        farmInfo: { ...prev.farmInfo, farmName: e.target.value }
                      }))}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.farmInfo?.farmName}</p>
                  )}
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Farm Size" />
                  {isEditing ? (
                    <Input
                      value={profileData.farmInfo?.farmSize || ''}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        farmInfo: { ...prev.farmInfo, farmSize: e.target.value }
                      }))}
                    />
                  ) : (
                    <p className="text-text-primary">{profileData.farmInfo?.farmSize}</p>
                  )}
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Farm Type" />
                  <p className="text-text-primary">{profileData.farmInfo?.farmType}</p>
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Established" />
                  <p className="text-text-primary">{profileData.farmInfo?.establishedYear}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Farming Methods" />
                <div className="flex flex-wrap gap-2">
                  {profileData.farmInfo?.farmingMethods?.map((method, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      <TranslatableText text={method} />
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Primary Crops" />
                <div className="flex flex-wrap gap-2">
                  {profileData.farmInfo?.primaryCrops?.map((crop, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
                    >
                      <TranslatableText text={crop} />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Award" size={20} className="mr-2" />
                <TranslatableText text="Certifications" />
              </h3>
              <div className="grid gap-4">
                {profileData.certifications?.map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-primary">{cert.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCertificationStatusColor(cert.status)}`}>
                        <Icon name="Shield" size={12} className="mr-1" />
                        <TranslatableText text={cert.status} />
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary"><TranslatableText text="Issued by:" /> </span>
                        <span className="text-text-primary">{cert.issuedBy}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary"><TranslatableText text="Valid until:" /> </span>
                        <span className="text-text-primary">{cert.expiryDate}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary"><TranslatableText text="Certificate #:" /> </span>
                        <span className="text-text-primary font-mono">{cert.certificateNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Banking Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2" />
                <TranslatableText text="Banking Information" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Account Holder" />
                  <p className="text-text-primary">{profileData.bankingInfo?.accountHolder}</p>
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Bank Name" />
                  <p className="text-text-primary">{profileData.bankingInfo?.bankName}</p>
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Account Number" />
                  <p className="text-text-primary font-mono">{profileData.bankingInfo?.accountNumber}</p>
                </div>
                <div>
                  <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Routing Number" />
                  <p className="text-text-primary font-mono">{profileData.bankingInfo?.routingNumber}</p>
                </div>
              </div>
              <div className="mt-4">
                <TranslatableText as="label" className="block text-sm font-medium text-text-secondary mb-2" text="Payment Methods" />
                <div className="flex flex-wrap gap-2">
                  {profileData.bankingInfo?.paymentMethods?.map((method, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      <Icon name="CreditCard" size={12} className="mr-1" />
                      <TranslatableText text={method} />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerProfile;
