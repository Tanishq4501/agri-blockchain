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
import { 
  QrCode, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  Calendar,
  MapPin,
  User,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Truck,
  Shield
} from 'lucide-react';

const RetailerVerify = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationResults, setVerificationResults] = useState([]);
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Mock user data
  const userData = {
    name: "Priya Sharma (प्रिया शर्मा)",
    email: "priya@freshbazar.com",
    role: "retailer",
    avatar: "/api/placeholder/40/40"
  };

  // Mock verification data
  useEffect(() => {
    setVerificationResults([
      {
        id: 1,
        productCode: "AGT-TOM-001234",
        productName: "Organic Tomatoes (जैविक टमाटर)",
        batch: "BT-2024-001",
        supplier: "Hariyali Krishi Farm (हरियाली कृषि फार्म)",
        farmer: "Ramesh Patel (रमेश पटेल)",
        harvestDate: "2024-01-15",
        expiryDate: "2024-01-25",
        location: "Maharashtra, India",
        status: "verified",
        certifications: ["Organic (जैविक)", "Non-GMO"],
        verifiedAt: "2024-01-18 10:30 AM",
        quantity: "50 kg",
        temperature: "4°C",
        humidity: "85%"
      },
      {
        id: 2,
        productCode: "AGT-APP-005678",
        productName: "Red Apples (लाल सेब)",
        batch: "BT-2024-002",
        supplier: "Kashmir Apple Orchards (कश्मीर सेब बागान)",
        farmer: "Suresh Kumar (सुरेश कुमार)",
        harvestDate: "2024-01-12",
        expiryDate: "2024-02-12",
        location: "Kashmir, India",
        status: "verified",
        certifications: ["Organic (जैविक)"],
        verifiedAt: "2024-01-18 09:15 AM",
        quantity: "100 kg",
        temperature: "2°C",
        humidity: "90%"
      },
      {
        id: 3,
        productCode: "AGT-CAR-009876",
        productName: "Baby Carrots (छोटी गाजर)",
        batch: "BT-2024-003",
        supplier: "Fresh Fields Cooperative (फ्रेश फील्ड्स सहकारी)",
        farmer: "Vikram Singh (विक्रम सिंह)",
        harvestDate: "2024-01-10",
        expiryDate: "2024-01-30",
        location: "Punjab, India",
        status: "warning",
        certifications: ["Organic (जैविक)", "Pesticide-Free (कीटनाशक मुक्त)"],
        verifiedAt: "2024-01-18 11:45 AM",
        quantity: "25 kg",
        temperature: "3°C",
        humidity: "88%",
        warning: "Approaching expiry date (समाप्ति तिथि निकट)"
      },
      {
        id: 4,
        productCode: "AGT-LET-112233",
        productName: "Romaine Lettuce (रोमेन सलाद)",
        batch: "BT-2024-004",
        supplier: "Sunny Greens India (सनी ग्रीन्स इंडिया)",
        farmer: "Anjali Devi (अंजली देवी)",
        harvestDate: "2024-01-16",
        expiryDate: "2024-01-22",
        location: "Haryana, India",
        status: "pending",
        certifications: ["Organic (जैविक)"],
        verifiedAt: "2024-01-18 12:00 PM",
        quantity: "30 kg",
        temperature: "1°C",
        humidity: "95%"
      }
    ]);
  }, []);

  const handleScanProduct = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScannedCode("AGT-TOM-001234");
      // Auto-search for the scanned product
      setSearchTerm("AGT-TOM-001234");
    }, 2000);
  };

  const handleVerifyProduct = (productId) => {
    setVerificationResults(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, status: 'verified', verifiedAt: new Date().toLocaleString() }
          : product
      )
    );
  };

  const filteredResults = verificationResults.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'pending': return Clock;
      default: return Package;
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Inventory Verification</h1>
              <p className="text-gray-600">Verify product authenticity and track supply chain</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator count={3} />
              <ProfileDropdown user={userData} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Quick Scan Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Product Scan</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="उत्पाद कोड दर्ज करें या QR कोड स्कैन करें"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleScanProduct}
                disabled={isScanning}
                className="flex items-center space-x-2"
              >
                <QrCode className="w-4 h-4" />
                <span>{isScanning ? 'Scanning...' : 'Scan QR Code'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setSearchTerm(scannedCode)}
                disabled={!scannedCode}
              >
                Verify Product
              </Button>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="उत्पाद नाम, कोड या आपूर्तिकर्ता द्वारा खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="sm:w-48"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="warning">Warning</option>
                <option value="pending">Pending</option>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            </div>
          </motion.div>

          {/* Verification Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Verification Results ({filteredResults.length})
            </h2>
            
            <div className="grid gap-4">
              {filteredResults.map((product) => {
                const StatusIcon = getStatusIcon(product.status);
                return (
                  <div
                    key={product.id}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Package className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.productName}</h3>
                          <p className="text-sm text-gray-600">Code: {product.productCode}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(product.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{product.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Supplier</p>
                        <p className="text-sm font-medium text-gray-900">{product.supplier}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Farmer</p>
                        <p className="text-sm font-medium text-gray-900">{product.farmer}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Harvest Date</p>
                        <p className="text-sm font-medium text-gray-900 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {product.harvestDate}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="text-sm font-medium text-gray-900">{product.quantity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Storage Temp</p>
                        <p className="text-sm font-medium text-gray-900">{product.temperature}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Humidity</p>
                        <p className="text-sm font-medium text-gray-900">{product.humidity}</p>
                      </div>
                    </div>

                    {product.certifications && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-2">
                          {product.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center"
                            >
                              <Shield className="w-3 h-3 mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.warning && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <p className="text-sm text-amber-800">{product.warning}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Verified: {product.verifiedAt}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>View Details</span>
                        </Button>
                        {product.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleVerifyProduct(product.id)}
                            className="flex items-center space-x-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Verify</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default RetailerVerify;
