import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import StockSummaryCards from './components/StockSummaryCards';
import QuickActionButtons from './components/QuickActionButtons';
import StockTable from './components/StockTable';
import QRScannerPanel from './components/QRScannerPanel';
import AlertNotifications from './components/AlertNotifications';
import Icon from '../../components/AppIcon';

const RetailerStockManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Handle logout logic
  };

  const handleBatchVerify = () => {
    console.log('Starting batch verification...');
    // Handle batch verification
  };

  const handleConfigureAlerts = () => {
    console.log('Opening alert configuration...');
    // Handle alert configuration
  };

  const handleExportInventory = () => {
    console.log('Exporting inventory data...');
    // Handle inventory export
  };

  const handleOpenScanner = () => {
    setScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setScannerOpen(false);
  };

  const handleScanResult = (result) => {
    console.log('Scan result:', result);
    // Handle scan result
  };

  const handleVerifyProduct = (productIds) => {
    console.log('Verifying products:', productIds);
    // Handle product verification
  };

  const handleViewDetails = (product) => {
    console.log('Viewing product details:', product);
    // Handle view product details
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // Handle notification click
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
    // Handle mark as read
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
    // Handle mark all as read
  };

  return (
    <>
      <Helmet>
        <title>Stock Management - AgriTrace Retailer Portal</title>
        <meta name="description" content="Manage your retail inventory, verify product authenticity, and track stock levels with AgriTrace's comprehensive stock management system." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <RoleBasedSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          userRole="retailer"
          userName="Sarah Johnson"
          userEmail="sarah@retailstore.com"
        />

        {/* Main Content */}
        <div className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 shadow-soft sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Page Title */}
                <div className="flex items-center space-x-4">
                  <div className="lg:hidden">
                    <button
                      onClick={handleToggleSidebar}
                      className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="Menu" size={20} strokeWidth={2} />
                    </button>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-text-primary">Stock Management</h1>
                    <p className="text-sm text-text-secondary hidden sm:block">
                      Manage inventory and verify product authenticity
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-4">
                  <NotificationIndicator
                    onNotificationClick={handleNotificationClick}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                  />
                  <ProfileDropdown
                    userName="Sarah Johnson"
                    userEmail="sarah@retailstore.com"
                    userRole="retailer"
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Summary Cards */}
              <StockSummaryCards />

              {/* Alert Notifications */}
              <AlertNotifications />

              {/* Quick Actions */}
              <QuickActionButtons
                onBatchVerify={handleBatchVerify}
                onConfigureAlerts={handleConfigureAlerts}
                onExportInventory={handleExportInventory}
                onOpenScanner={handleOpenScanner}
              />

              {/* Stock Table */}
              <StockTable
                onVerifyProduct={handleVerifyProduct}
                onViewDetails={handleViewDetails}
              />
            </div>
          </main>
        </div>

        {/* QR Scanner Panel */}
        <QRScannerPanel
          isOpen={scannerOpen}
          onClose={handleCloseScanner}
          onScanResult={handleScanResult}
        />
      </div>
    </>
  );
};

export default RetailerStockManagement;