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
import LanguageToggle from '../../components/ui/LanguageToggle';
import GeminiToggle from '../../components/ui/GeminiToggle';
import { useLanguage } from '../../utils/translations';
import { useGeminiTranslation } from '../../hooks/useGeminiTranslation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Truck,
  Clock,
  CheckCircle,
  Edit3,
  Save,
  X,
  Camera,
  Store,
  Globe,
  Users
} from 'lucide-react';

const RetailerProfile = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const { translateText, isGeminiEnabled, toggleGemini, isTranslating } = useGeminiTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({});
  const [businessData, setBusinessData] = useState({});
  const [preferences, setPreferences] = useState({});

  // Mock user data
  const userData = {
    name: "Priya Sharma (प्रिया शर्मा)",
    email: "priya@freshbazar.com",
    role: "retailer",
    avatar: "/api/placeholder/40/40"
  };

  // Mock profile data
  useEffect(() => {
    setProfileData({
      firstName: "Priya (प्रिया)",
      lastName: "Sharma (शर्मा)",
      email: "priya@freshbazar.com",
      phone: "+91 98765 43210",
      address: "Shop No. 15, Gandhi Market",
      city: "Mumbai (मुंबई)",
      state: "Maharashtra (महाराष्ट्र)",
      zipCode: "400001",
      country: "India (भारत)",
      joinDate: "2023-06-15",
      lastLogin: "2024-01-18 09:30 AM",
      avatar: "/api/placeholder/120/120"
    });

    setBusinessData({
      businessName: "Fresh Bazar Grocery (फ्रेश बाजार ग्रोसरी)",
      businessType: "Grocery Store (किराना दुकान)",
      licenseNumber: "BL-2023-MH-001234",
      taxId: "GSTIN27ABCDE1234F1Z5",
      website: "www.freshbazar-grocery.in",
      establishedYear: "2015",
      employeeCount: "25-50",
      annualRevenue: "₹15-40 Lakh",
      businessAddress: "Shop No. 15, Gandhi Market, Mumbai, Maharashtra 400001",
      businessPhone: "+91 98765 43210",
      businessEmail: "info@freshbazar-grocery.in",
      certifications: ["Organic Retailer (जैविक खुदरा विक्रेता)", "Food Safety Certified (खाद्य सुरक्षा प्रमाणित)", "FSSAI Licensed"],
      operatingHours: {
        monday: "7:00 AM - 10:00 PM",
        tuesday: "7:00 AM - 10:00 PM",
        wednesday: "7:00 AM - 10:00 PM",
        thursday: "7:00 AM - 10:00 PM",
        friday: "7:00 AM - 10:00 PM",
        saturday: "7:00 AM - 10:00 PM",
        sunday: "8:00 AM - 9:00 PM"
      }
    });

    setPreferences({
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      orderAlerts: true,
      inventoryAlerts: true,
      priceAlerts: true,
      weeklyReports: true,
      monthlyReports: true,
      language: "hindi",
      timezone: "IST",
      currency: "INR",
      dateFormat: "DD/MM/YYYY"
    });
  }, []);

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset changes logic would go here
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <RoleBasedSidebar
        userRole="retailer"
        isCollapsed={isSidebarCollapsed}
        onToggle={setIsSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your personal and business information</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator count={3} />
              <ProfileDropdown user={userData} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 p-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-gray-600">{businessData.businessName}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {profileData.joinDate}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Last login {profileData.lastLogin}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Personal Info Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        value={profileData.firstName}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                      <Input
                        label="Last Name"
                        value={profileData.lastName}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                      <Input
                        label="Phone Number"
                        value={profileData.phone}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                      <Input
                        label="Address"
                        value={profileData.address}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="md:col-span-2"
                      />
                      <Input
                        label="City"
                        value={profileData.city}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      />
                      <Input
                        label="State"
                        value={profileData.state}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                      />
                      <Input
                        label="ZIP Code"
                        value={profileData.zipCode}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                      />
                      <Input
                        label="Country"
                        value={profileData.country}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {/* Business Info Tab */}
                {activeTab === 'business' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Business Name"
                        value={businessData.businessName}
                        disabled={!isEditing}
                        onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                      />
                      <Select
                        label="Business Type"
                        value={businessData.businessType}
                        disabled={!isEditing}
                        onChange={(e) => setBusinessData({...businessData, businessType: e.target.value})}
                      >
                        <option value="Grocery Store">Grocery Store (किराना दुकान)</option>
                        <option value="Supermarket">Supermarket (सुपरमार्केट)</option>
                        <option value="Convenience Store">Convenience Store (सुविधा स्टोर)</option>
                        <option value="Specialty Store">Specialty Store (विशेष दुकान)</option>
                      </Select>
                      <Input
                        label="License Number"
                        value={businessData.licenseNumber}
                        disabled={!isEditing}
                        onChange={(e) => setBusinessData({...businessData, licenseNumber: e.target.value})}
                      />
                      <Input
                        label="Tax ID"
                        value={businessData.taxId}
                        disabled={!isEditing}
                        onChange={(e) => setBusinessData({...businessData, taxId: e.target.value})}
                      />
                      <Input
                        label="Website"
                        value={businessData.website}
                        disabled={!isEditing}
                        onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                      />
                      <Input
                        label="Established Year"
                        value={businessData.establishedYear}
                        disabled={!isEditing}
                        onChange={(e) => setBusinessData({...businessData, establishedYear: e.target.value})}
                      />
                    </div>

                    <div className="mt-8">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {businessData.certifications?.map((cert, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center"
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                    <div className="space-y-4">
                      <Checkbox
                        label="Email Notifications"
                        checked={preferences.emailNotifications}
                        onChange={(checked) => setPreferences({...preferences, emailNotifications: checked})}
                        disabled={!isEditing}
                      />
                      <Checkbox
                        label="SMS Notifications"
                        checked={preferences.smsNotifications}
                        onChange={(checked) => setPreferences({...preferences, smsNotifications: checked})}
                        disabled={!isEditing}
                      />
                      <Checkbox
                        label="Marketing Emails"
                        checked={preferences.marketingEmails}
                        onChange={(checked) => setPreferences({...preferences, marketingEmails: checked})}
                        disabled={!isEditing}
                      />
                      <Checkbox
                        label="Order Alerts"
                        checked={preferences.orderAlerts}
                        onChange={(checked) => setPreferences({...preferences, orderAlerts: checked})}
                        disabled={!isEditing}
                      />
                      <Checkbox
                        label="Inventory Alerts"
                        checked={preferences.inventoryAlerts}
                        onChange={(checked) => setPreferences({...preferences, inventoryAlerts: checked})}
                        disabled={!isEditing}
                      />
                    </div>

                    <h4 className="text-md font-semibold text-gray-900 mt-8">Regional Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Language"
                        value={preferences.language}
                        disabled={!isEditing}
                        onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi (हिंदी)</option>
                        <option value="marathi">Marathi (मराठी)</option>
                        <option value="gujarati">Gujarati (गुजराती)</option>
                      </Select>
                      <Select
                        label="Timezone"
                        value={preferences.timezone}
                        disabled={!isEditing}
                        onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                      >
                        <option value="IST">Indian Standard Time</option>
                        <option value="PST">Pacific Standard Time</option>
                        <option value="EST">Eastern Standard Time</option>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Password</h4>
                        <p className="text-sm text-gray-600 mb-3">Last changed 30 days ago</p>
                        <Button variant="outline" size="sm">Change Password</Button>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                        <Button variant="outline" size="sm">Enable 2FA</Button>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Login Sessions</h4>
                        <p className="text-sm text-gray-600 mb-3">Manage your active login sessions</p>
                        <Button variant="outline" size="sm">View Sessions</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RetailerProfile;
