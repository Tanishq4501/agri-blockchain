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

const AdminSettings = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});

  const userData = {
    name: 'Admin User',
    email: 'admin@agritrace.com',
    role: 'admin',
    avatar: null
  };

  const notifications = [];

  const mockSettings = {
    general: {
      systemName: 'AgriTrace',
      systemVersion: '2.1.0',
      maintenanceMode: false,
      allowRegistrations: true,
      requireEmailVerification: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5
    },
    security: {
      twoFactorAuth: true,
      passwordMinLength: 8,
      passwordComplexity: true,
      sessionEncryption: true,
      auditLogging: true,
      dataRetention: 365
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      alertThreshold: 85,
      reportFrequency: 'weekly'
    },
    integrations: {
      apiRateLimit: 1000,
      webhookEnabled: true,
      thirdPartySync: true,
      backupFrequency: 'daily',
      storageProvider: 'aws'
    }
  };

  useEffect(() => {
    setSettings(mockSettings);
    document.title = 'System Settings - AgriTrace';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' }
  ];

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
                <h1 className="text-2xl font-bold text-text-primary">System Settings</h1>
              </div>

              <div className="flex items-center space-x-4">
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
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card mb-8"
            >
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'general' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-text-primary">General Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">System Name</label>
                        <Input
                          value={settings.general?.systemName || ''}
                          onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">System Version</label>
                        <Input
                          value={settings.general?.systemVersion || ''}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Session Timeout (minutes)</label>
                        <Input
                          type="number"
                          value={settings.general?.sessionTimeout || ''}
                          onChange={(e) => handleSettingChange('general', 'sessionTimeout', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Max Login Attempts</label>
                        <Input
                          type="number"
                          value={settings.general?.maxLoginAttempts || ''}
                          onChange={(e) => handleSettingChange('general', 'maxLoginAttempts', parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Checkbox
                        checked={settings.general?.maintenanceMode || false}
                        onChange={(checked) => handleSettingChange('general', 'maintenanceMode', checked)}
                        label="Maintenance Mode"
                      />
                      <Checkbox
                        checked={settings.general?.allowRegistrations || false}
                        onChange={(checked) => handleSettingChange('general', 'allowRegistrations', checked)}
                        label="Allow New User Registrations"
                      />
                      <Checkbox
                        checked={settings.general?.requireEmailVerification || false}
                        onChange={(checked) => handleSettingChange('general', 'requireEmailVerification', checked)}
                        label="Require Email Verification"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Password Min Length</label>
                        <Input
                          type="number"
                          value={settings.security?.passwordMinLength || ''}
                          onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Data Retention (days)</label>
                        <Input
                          type="number"
                          value={settings.security?.dataRetention || ''}
                          onChange={(e) => handleSettingChange('security', 'dataRetention', parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Checkbox
                        checked={settings.security?.twoFactorAuth || false}
                        onChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                        label="Enable Two-Factor Authentication"
                      />
                      <Checkbox
                        checked={settings.security?.passwordComplexity || false}
                        onChange={(checked) => handleSettingChange('security', 'passwordComplexity', checked)}
                        label="Enforce Password Complexity"
                      />
                      <Checkbox
                        checked={settings.security?.sessionEncryption || false}
                        onChange={(checked) => handleSettingChange('security', 'sessionEncryption', checked)}
                        label="Session Encryption"
                      />
                      <Checkbox
                        checked={settings.security?.auditLogging || false}
                        onChange={(checked) => handleSettingChange('security', 'auditLogging', checked)}
                        label="Enable Audit Logging"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-text-primary">Notification Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Alert Threshold (%)</label>
                        <Input
                          type="number"
                          value={settings.notifications?.alertThreshold || ''}
                          onChange={(e) => handleSettingChange('notifications', 'alertThreshold', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Report Frequency</label>
                        <Select
                          value={settings.notifications?.reportFrequency || ''}
                          onChange={(e) => handleSettingChange('notifications', 'reportFrequency', e.target.value)}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Checkbox
                        checked={settings.notifications?.emailEnabled || false}
                        onChange={(checked) => handleSettingChange('notifications', 'emailEnabled', checked)}
                        label="Enable Email Notifications"
                      />
                      <Checkbox
                        checked={settings.notifications?.smsEnabled || false}
                        onChange={(checked) => handleSettingChange('notifications', 'smsEnabled', checked)}
                        label="Enable SMS Notifications"
                      />
                      <Checkbox
                        checked={settings.notifications?.pushEnabled || false}
                        onChange={(checked) => handleSettingChange('notifications', 'pushEnabled', checked)}
                        label="Enable Push Notifications"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'integrations' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-text-primary">Integration Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">API Rate Limit (per hour)</label>
                        <Input
                          type="number"
                          value={settings.integrations?.apiRateLimit || ''}
                          onChange={(e) => handleSettingChange('integrations', 'apiRateLimit', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Backup Frequency</label>
                        <Select
                          value={settings.integrations?.backupFrequency || ''}
                          onChange={(e) => handleSettingChange('integrations', 'backupFrequency', e.target.value)}
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Storage Provider</label>
                        <Select
                          value={settings.integrations?.storageProvider || ''}
                          onChange={(e) => handleSettingChange('integrations', 'storageProvider', e.target.value)}
                        >
                          <option value="aws">Amazon S3</option>
                          <option value="gcp">Google Cloud</option>
                          <option value="azure">Azure Storage</option>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Checkbox
                        checked={settings.integrations?.webhookEnabled || false}
                        onChange={(checked) => handleSettingChange('integrations', 'webhookEnabled', checked)}
                        label="Enable Webhook Integration"
                      />
                      <Checkbox
                        checked={settings.integrations?.thirdPartySync || false}
                        onChange={(checked) => handleSettingChange('integrations', 'thirdPartySync', checked)}
                        label="Third-Party Data Synchronization"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Save Button */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <Button
                  onClick={handleSaveSettings}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Settings
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
