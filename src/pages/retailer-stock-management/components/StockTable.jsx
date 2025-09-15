import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useLanguage } from '../../../utils/translations';

const StockTable = ({ onVerifyProduct, onViewDetails }) => {
  const { isHindi, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState([]);

  const stockData = [
    {
      id: 1,
      productName: "Organic Tomatoes (जैविक टमाटर)",
      originFarm: "Hariyali Krishi Farm (हरियाली कृषि फार्म)",
      quantity: "150 kg",
      expirationDate: "2025-01-20",
      verificationStatus: "verified",
      authenticity: "authentic",
      batchId: "TOM-2025-001",
      lastVerified: "2025-01-13",
      price: "₹45.00/kg"
    },
    {
      id: 2,
      productName: "Fresh Spinach (ताजा पालक)",
      originFarm: "Suryodaya Organic (सूर्योदय ऑर्गेनिक)",
      quantity: "75 kg",
      expirationDate: "2025-01-16",
      verificationStatus: "pending",
      authenticity: "pending",
      batchId: "SPN-2025-002",
      lastVerified: "2025-01-10",
      price: "₹62.00/kg"
    },
    {
      id: 3,
      productName: "Bell Peppers (शिमला मिर्च)",
      originFarm: "Parvat Drishya Farm (पर्वत दृश्य फार्म)",
      quantity: "200 kg",
      expirationDate: "2025-01-25",
      verificationStatus: "verified",
      authenticity: "suspicious",
      batchId: "PEP-2025-003",
      lastVerified: "2025-01-12",
      price: "₹58.00/kg"
    },
    {
      id: 4,
      productName: "Organic Carrots (जैविक गाजर)",
      originFarm: "Fasal Chandra Farm (फसल चंद्र फार्म)",
      quantity: "120 kg",
      expirationDate: "2025-02-01",
      verificationStatus: "verified",
      authenticity: "authentic",
      batchId: "CAR-2025-004",
      lastVerified: "2025-01-13",
      price: "₹39.00/kg"
    },
    {
      id: 5,
      productName: "Fresh Cabbage (ताजा पत्ता गोभी)",
      originFarm: "Hariyali Krishi Farm (हरियाली कृषि फार्म)",
      quantity: "85 kg",
      expirationDate: "2025-01-18",
      verificationStatus: "failed",
      authenticity: "invalid",
      batchId: "CAB-2025-005",
      lastVerified: "2025-01-11",
      price: "₹41.00/kg"
    },
    {
      id: 6,
      productName: "Onions (प्याज)",
      originFarm: "Nashik Kisan Sahakari (नासिक किसान सहकारी)",
      quantity: "300 kg",
      expirationDate: "2025-02-15",
      verificationStatus: "verified",
      authenticity: "authentic",
      batchId: "ONI-2025-006",
      lastVerified: "2025-01-14",
      price: "₹28.00/kg"
    },
    {
      id: 7,
      productName: "Potatoes (आलू)",
      originFarm: "Punjab Aloo Utpadak (पंजाब आलू उत्पादक)",
      quantity: "250 kg",
      expirationDate: "2025-03-01",
      verificationStatus: "verified",
      authenticity: "authentic",
      batchId: "POT-2025-007",
      lastVerified: "2025-01-15",
      price: "₹22.00/kg"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle', label: 'Verified' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'Clock', label: 'Pending' },
      failed: { color: 'bg-error/10 text-error border-error/20', icon: 'XCircle', label: 'Failed' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" strokeWidth={2} />
        {config?.label}
      </span>
    );
  };

  const getAuthenticityBadge = (authenticity) => {
    const authenticityConfig = {
      authentic: { color: 'bg-success/10 text-success border-success/20', icon: 'Shield', label: 'Authentic' },
      suspicious: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'AlertTriangle', label: 'Suspicious' },
      invalid: { color: 'bg-error/10 text-error border-error/20', icon: 'ShieldX', label: 'Invalid' },
      pending: { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: 'HelpCircle', label: 'Pending' }
    };
    
    const config = authenticityConfig?.[authenticity] || authenticityConfig?.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" strokeWidth={2} />
        {config?.label}
      </span>
    );
  };

  const isExpiringSoon = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return stockData?.filter(item =>
      item?.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.originFarm?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.batchId?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }, [searchTerm]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredData?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems?.filter(id => id !== itemId));
    }
  };

  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return filteredData;

    return [...filteredData]?.sort((a, b) => {
      if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-gray-400" strokeWidth={2} />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
        strokeWidth={2} 
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{isHindi ? 'स्टॉक इन्वेंटरी' : 'Stock Inventory'}</h2>
            <p className="text-sm text-text-secondary mt-1">
              {filteredData?.length} {isHindi ? 'उत्पाद' : 'products'} • {selectedItems?.length} {isHindi ? 'चयनित' : 'selected'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder={isHindi ? 'उत्पाद, फार्म या बैच आईडी खोजें...' : 'Search products, farms, or batch IDs...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-80"
            />
            
            {selectedItems?.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                iconName="Shield"
                iconPosition="left"
                iconSize={16}
                onClick={() => onVerifyProduct(selectedItems)}
              >
                {isHindi ? `चयनित सत्यापित करें (${selectedItems?.length})` : `Verify Selected (${selectedItems?.length})`}
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <Checkbox
                  checked={selectedItems?.length === filteredData?.length && filteredData?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('productName')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>{isHindi ? 'उत्पाद' : 'Product'}</span>
                  <SortIcon column="productName" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('originFarm')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>{isHindi ? 'मूल फार्म' : 'Origin Farm'}</span>
                  <SortIcon column="originFarm" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>{isHindi ? 'मात्रा' : 'Quantity'}</span>
                  <SortIcon column="quantity" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('expirationDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>{isHindi ? 'समाप्ति' : 'Expiration'}</span>
                  <SortIcon column="expirationDate" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {isHindi ? 'सत्यापन' : 'Verification'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {isHindi ? 'प्रामाणिकता' : 'Authenticity'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {isHindi ? 'कार्य' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData?.map((item) => (
              <tr
                key={item?.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => handleSelectItem(item?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">{item?.productName}</span>
                    <span className="text-xs text-text-secondary">{item?.batchId}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-primary">{item?.originFarm}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">{item?.quantity}</span>
                    <span className="text-xs text-text-secondary">{item?.price}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`text-sm ${isExpiringSoon(item?.expirationDate) ? 'text-warning font-medium' : 'text-text-primary'}`}>
                      {new Date(item.expirationDate)?.toLocaleDateString()}
                    </span>
                    {isExpiringSoon(item?.expirationDate) && (
                      <span className="text-xs text-warning flex items-center mt-1">
                        <Icon name="AlertTriangle" size={12} className="mr-1" strokeWidth={2} />
                        Expiring Soon
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(item?.verificationStatus)}
                </td>
                <td className="px-6 py-4">
                  {getAuthenticityBadge(item?.authenticity)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => onViewDetails(item)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Shield"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => onVerifyProduct([item?.id])}
                    >
                      Verify
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {sortedData?.map((item) => (
          <div key={item?.id} className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedItems?.includes(item?.id)}
                  onChange={(e) => handleSelectItem(item?.id, e?.target?.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-text-primary">{item?.productName}</h3>
                  <p className="text-xs text-text-secondary mt-1">{item?.batchId}</p>
                  <p className="text-xs text-text-secondary">{item?.originFarm}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{item?.quantity}</p>
                <p className="text-xs text-text-secondary">{item?.price}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {getStatusBadge(item?.verificationStatus)}
                  {getAuthenticityBadge(item?.authenticity)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${isExpiringSoon(item?.expirationDate) ? 'text-warning font-medium' : 'text-text-secondary'}`}>
                    Expires: {new Date(item.expirationDate)?.toLocaleDateString()}
                  </span>
                  {isExpiringSoon(item?.expirationDate) && (
                    <Icon name="AlertTriangle" size={12} className="text-warning" strokeWidth={2} />
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={16}
                  onClick={() => onViewDetails(item)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Shield"
                  iconSize={16}
                  onClick={() => onVerifyProduct([item?.id])}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredData?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-gray-300 mx-auto mb-4" strokeWidth={1} />
          <h3 className="text-lg font-medium text-text-primary mb-2">No products found</h3>
          <p className="text-text-secondary">
            {searchTerm ? 'Try adjusting your search terms' : 'Your inventory will appear here'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockTable;