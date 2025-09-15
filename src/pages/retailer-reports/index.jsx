import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import LanguageToggle from '../../components/ui/LanguageToggle';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useLanguage } from '../../utils/translations';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  IndianRupee,
  Package, 
  Users,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  ShoppingCart
} from 'lucide-react';

const RetailerReports = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('sales');
  const [salesData, setSalesData] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Mock user data
  const userData = {
    name: "Priya Sharma (प्रिया शर्मा)",
    email: "priya@freshbazar.com",
    role: "retailer",
    avatar: "/api/placeholder/40/40"
  };

  // Mock sales data
  useEffect(() => {
    setSalesData({
      totalRevenue: 1254000,
      totalOrders: 1847,
      avgOrderValue: 678.90,
      totalCustomers: 892,
      revenueChange: 12.5,
      ordersChange: 8.3,
      customersChange: 15.2,
      avgOrderChange: -2.1
    });

    setTopProducts([
      {
        id: 1,
        name: "Organic Tomatoes (जैविक टमाटर)",
        category: "Vegetables (सब्जियां)",
        sold: 245,
        revenue: 12255.00,
        profit: 3676.50,
        margin: 30,
        trend: "up"
      },
      {
        id: 2,
        name: "Red Apples (लाल सेब)",
        category: "Fruits (फल)",
        sold: 189,
        revenue: 9450.00,
        profit: 2835.00,
        margin: 30,
        trend: "up"
      },
      {
        id: 3,
        name: "Baby Carrots (छोटी गाजर)",
        category: "Vegetables (सब्जियां)",
        sold: 156,
        revenue: 6240.00,
        profit: 1560.00,
        margin: 25,
        trend: "down"
      },
      {
        id: 4,
        name: "Spinach (पालक)",
        category: "Vegetables (सब्जियां)",
        sold: 134,
        revenue: 5360.00,
        profit: 1340.00,
        margin: 25,
        trend: "up"
      },
      {
        id: 5,
        name: "Bananas (केले)",
        category: "Fruits (फल)",
        sold: 298,
        revenue: 4470.00,
        profit: 894.00,
        margin: 20,
        trend: "stable"
      }
    ]);

    setRecentTransactions([
      {
        id: 1,
        orderId: "ORD-2024-001",
        customer: "Rajesh Kumar (राजेश कुमार)",
        items: 5,
        total: 895.00,
        status: "completed",
        date: "2024-01-18 14:30",
        paymentMethod: "UPI"
      },
      {
        id: 2,
        orderId: "ORD-2024-002",
        customer: "Sunita Devi (सुनीता देवी)",
        items: 3,
        total: 457.50,
        status: "completed",
        date: "2024-01-18 13:15",
        paymentMethod: "Cash"
      },
      {
        id: 3,
        orderId: "ORD-2024-003",
        customer: "Amit Patel (अमित पटेल)",
        items: 8,
        total: 1562.00,
        status: "processing",
        date: "2024-01-18 12:45",
        paymentMethod: "Debit Card"
      },
      {
        id: 4,
        orderId: "ORD-2024-004",
        customer: "Meera Singh (मीरा सिंह)",
        items: 2,
        total: 234.00,
        status: "completed",
        date: "2024-01-18 11:20",
        paymentMethod: "Credit Card"
      }
    ]);
  }, []);

  const salesMetrics = [
    {
      title: isHindi ? "कुल आय" : "Total Revenue",
      value: `₹${salesData.totalRevenue?.toLocaleString() || '0'}`,
      change: salesData.revenueChange,
      changeType: salesData.revenueChange > 0 ? "positive" : "negative",
      icon: IndianRupee,
      color: "text-green-600"
    },
    {
      title: isHindi ? "कुल ऑर्डर" : "Total Orders",
      value: salesData.totalOrders?.toLocaleString() || '0',
      change: salesData.ordersChange,
      changeType: salesData.ordersChange > 0 ? "positive" : "negative",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: isHindi ? "औसत ऑर्डर मूल्य" : "Avg Order Value",
      value: `₹${salesData.avgOrderValue || '0'}`,
      change: salesData.avgOrderChange,
      changeType: salesData.avgOrderChange > 0 ? "positive" : "negative",
      icon: BarChart3,
      color: "text-purple-600"
    },
    {
      title: isHindi ? "कुल ग्राहक" : "Total Customers",
      value: salesData.totalCustomers?.toLocaleString() || '0',
      change: salesData.customersChange,
      changeType: salesData.customersChange > 0 ? "positive" : "negative",
      icon: Users,
      color: "text-amber-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
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
              <h1 className="text-2xl font-bold text-gray-900">{isHindi ? 'बिक्री रिपोर्ट' : 'Sales Reports'}</h1>
              <p className="text-gray-600">{isHindi ? 'बिक्री प्रदर्शन और व्यावसायिक मेट्रिक्स का विश्लेषण करें' : 'Analyze sales performance and business metrics'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle
                isHindi={isHindi}
                onToggle={toggleLanguage}
              />
              <NotificationIndicator count={3} />
              <ProfileDropdown user={userData} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="sm:w-48"
              >
                <option value="sales">{isHindi ? 'बिक्री रिपोर्ट' : 'Sales Report'}</option>
                <option value="inventory">{isHindi ? 'इन्वेंटरी रिपोर्ट' : 'Inventory Report'}</option>
                <option value="customer">{isHindi ? 'ग्राहक रिपोर्ट' : 'Customer Report'}</option>
                <option value="profit">{isHindi ? 'लाभ विश्लेषण' : 'Profit Analysis'}</option>
              </Select>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="sm:w-48"
              >
                <option value="7">{isHindi ? 'पिछले 7 दिन' : 'Last 7 days'}</option>
                <option value="30">{isHindi ? 'पिछले 30 दिन' : 'Last 30 days'}</option>
                <option value="90">{isHindi ? 'पिछले 3 महीने' : 'Last 3 months'}</option>
                <option value="365">{isHindi ? 'पिछला साल' : 'Last year'}</option>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>{isHindi ? 'रिपोर्ट निर्यात करें' : 'Export Report'}</span>
              </Button>
            </div>
          </motion.div>

          {/* Sales Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">{isHindi ? 'मुख्य मेट्रिक्स' : 'Key Metrics'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {salesMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'positive' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{isHindi ? 'आय रुझान' : 'Revenue Trend'}</h3>
                <LineChart className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">{isHindi ? 'आय चार्ट विज़ुअलाइज़ेशन यहाँ होगा' : 'Revenue chart visualization would go here'}</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{isHindi ? 'श्रेणी के अनुसार बिक्री' : 'Sales by Category'}</h3>
                <PieChart className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">{isHindi ? 'श्रेणी विभाजन चार्ट यहाँ होगा' : 'Category breakdown chart would go here'}</p>
              </div>
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">{isHindi ? 'शीर्ष प्रदर्शन करने वाले उत्पाद' : 'Top Performing Products'}</h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'उत्पाद' : 'Product'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'श्रेणी' : 'Category'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'बेचे गए यूनिट' : 'Units Sold'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'आय' : 'Revenue'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'लाभ' : 'Profit'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'मार्जिन' : 'Margin'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isHindi ? 'रुझान' : 'Trend'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg mr-3">
                              <Package className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.sold}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{product.revenue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ₹{product.profit.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {product.margin}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTrendIcon(product.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200">
              <div className="divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ShoppingCart className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.orderId}</p>
                          <p className="text-xs text-gray-500">{transaction.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{transaction.total}</p>
                        <p className="text-xs text-gray-500">{transaction.items} items</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default RetailerReports;
