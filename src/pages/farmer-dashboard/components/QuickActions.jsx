import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNewProduceClick, onRegenerateQRClick }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  const recentProducts = [
    {
      id: 'PRD-2025-001',
      name: 'Organic Tomatoes',
      quantity: '500kg',
      harvestDate: '2025-01-10',
      status: 'active',
      qrGenerated: true
    },
    {
      id: 'PRD-2025-002',
      name: 'Sweet Corn',
      quantity: '300kg',
      harvestDate: '2025-01-08',
      status: 'sold',
      qrGenerated: true
    },
    {
      id: 'PRD-2025-003',
      name: 'Organic Potatoes',
      quantity: '800kg',
      harvestDate: '2025-01-05',
      status: 'active',
      qrGenerated: true
    },
    {
      id: 'PRD-2025-004',
      name: 'Carrots',
      quantity: '400kg',
      harvestDate: '2025-01-03',
      status: 'pending',
      qrGenerated: false
    }
  ];

  const quickActionItems = [
    {
      id: 1,
      title: 'Register New Produce',
      description: 'Add new harvest to your inventory',
      icon: 'Plus',
      color: 'from-primary to-success',
      action: onNewProduceClick,
      buttonText: 'Add Produce'
    },
    {
      id: 2,
      title: 'Generate QR Codes',
      description: 'Create QR codes for existing products',
      icon: 'QrCode',
      color: 'from-secondary to-blue-400',
      action: () => onRegenerateQRClick(selectedProduct),
      buttonText: 'Generate QR',
      hasDropdown: true
    },
    {
      id: 3,
      title: 'View Analytics',
      description: 'Check sales and performance metrics',
      icon: 'BarChart3',
      color: 'from-warning to-yellow-400',
      action: () => console.log('Navigate to analytics'),
      buttonText: 'View Reports'
    },
    {
      id: 4,
      title: 'Update Profile',
      description: 'Manage farm details and certifications',
      icon: 'User',
      color: 'from-purple-500 to-purple-400',
      action: () => console.log('Navigate to profile'),
      buttonText: 'Edit Profile'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Active' },
      sold: { color: 'bg-gray-100 text-gray-600 border-gray-200', label: 'Sold' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">Quick Actions</h2>
          <p className="text-sm text-text-secondary">Frequently used tools and shortcuts</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActionItems?.map((item) => (
          <div key={item?.id} className="glass-card p-6 hover-lift group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item?.color} rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item?.icon} size={24} color="white" strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {item?.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {item?.description}
                </p>
              </div>

              {/* Dropdown for QR Generation */}
              {item?.hasDropdown && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-text-secondary">
                    Select Product:
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e?.target?.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Choose a product...</option>
                    {recentProducts?.filter(product => product?.status === 'active' || product?.status === 'pending')?.map((product) => (
                        <option key={product?.id} value={product?.id}>
                          {product?.name} - {product?.quantity}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={item?.action}
                disabled={item?.hasDropdown && !selectedProduct}
                className="group-hover:border-primary group-hover:text-primary transition-colors duration-200"
              >
                {item?.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Products Quick View */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
              <Icon name="Package" size={16} color="white" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Recent Products</h3>
              <p className="text-sm text-text-secondary">Your latest registered produce</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentProducts?.slice(0, 4)?.map((product) => (
              <div key={product?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                    <Icon name="Leaf" size={16} color="white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{product?.name}</h4>
                    <div className="flex items-center space-x-3 text-sm text-text-secondary">
                      <span>{product?.quantity}</span>
                      <span>•</span>
                      <span>Harvested {formatDate(product?.harvestDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(product?.status)}
                  {product?.qrGenerated ? (
                    <Icon name="QrCode" size={16} className="text-success" strokeWidth={2} />
                  ) : (
                    <Icon name="AlertCircle" size={16} className="text-warning" strokeWidth={2} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;