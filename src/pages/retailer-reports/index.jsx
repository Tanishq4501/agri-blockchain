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
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('sales');
  const [salesData, setSalesData] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah@freshmart.com",
    role: "retailer",
    avatar: "/api/placeholder/40/40"
  };

  // Mock sales data
  useEffect(() => {
    setSalesData({
      totalRevenue: 125400,
      totalOrders: 1847,
      avgOrderValue: 67.89,
      totalCustomers: 892,
      revenueChange: 12.5,
      ordersChange: 8.3,
      customersChange: 15.2,
      avgOrderChange: -2.1
    });

    setTopProducts([
      {
        id: 1,
        name: "Organic Tomatoes",
        category: "Vegetables",
        sold: 245,
        revenue: 1225.50,
        profit: 367.65,
        margin: 30,
        trend: "up"
      },
      {
        id: 2,
        name: "Red Apples",
        category: "Fruits",
        sold: 189,
        revenue: 945.00,
        profit: 283.50,
        margin: 30,
        trend: "up"
      },
      {
        id: 3,
        name: "Baby Carrots",
        category: "Vegetables",
        sold: 156,
        revenue: 624.00,
        profit: 156.00,
        margin: 25,
        trend: "down"
      },
      {
        id: 4,
        name: "Romaine Lettuce",
        category: "Vegetables",
        sold: 134,
        revenue: 536.00,
        profit: 134.00,
        margin: 25,
        trend: "up"
      },
      {
        id: 5,
        name: "Bananas",
        category: "Fruits",
        sold: 298,
        revenue: 447.00,
        profit: 89.40,
        margin: 20,
        trend: "stable"
      }
    ]);

    setRecentTransactions([
      {
        id: 1,
        orderId: "ORD-2024-001",
        customer: "John Smith",
        items: 5,
        total: 89.50,
        status: "completed",
        date: "2024-01-18 14:30",
        paymentMethod: "Credit Card"
      },
      {
        id: 2,
        orderId: "ORD-2024-002",
        customer: "Emily Davis",
        items: 3,
        total: 45.75,
        status: "completed",
        date: "2024-01-18 13:15",
        paymentMethod: "Cash"
      },
      {
        id: 3,
        orderId: "ORD-2024-003",
        customer: "Michael Brown",
        items: 8,
        total: 156.20,
        status: "processing",
        date: "2024-01-18 12:45",
        paymentMethod: "Debit Card"
      },
      {
        id: 4,
        orderId: "ORD-2024-004",
        customer: "Lisa Wilson",
        items: 2,
        total: 23.40,
        status: "completed",
        date: "2024-01-18 11:20",
        paymentMethod: "Credit Card"
      }
    ]);
  }, []);

  const salesMetrics = [
    {
      title: "Total Revenue",
      value: `$${salesData.totalRevenue?.toLocaleString() || '0'}`,
      change: salesData.revenueChange,
      changeType: salesData.revenueChange > 0 ? "positive" : "negative",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Orders",
      value: salesData.totalOrders?.toLocaleString() || '0',
      change: salesData.ordersChange,
      changeType: salesData.ordersChange > 0 ? "positive" : "negative",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Avg Order Value",
      value: `$${salesData.avgOrderValue || '0'}`,
      change: salesData.avgOrderChange,
      changeType: salesData.avgOrderChange > 0 ? "positive" : "negative",
      icon: BarChart3,
      color: "text-purple-600"
    },
    {
      title: "Total Customers",
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
              <h1 className="text-2xl font-bold text-gray-900">Sales Reports</h1>
              <p className="text-gray-600">Analyze sales performance and business metrics</p>
            </div>
            <div className="flex items-center space-x-4">
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
                <option value="sales">Sales Report</option>
                <option value="inventory">Inventory Report</option>
                <option value="customer">Customer Report</option>
                <option value="profit">Profit Analysis</option>
              </Select>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="sm:w-48"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
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
            <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
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
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <LineChart className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Revenue chart visualization would go here</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
                <PieChart className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Category breakdown chart would go here</p>
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
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Products</h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Units Sold
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Margin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
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
                          ${product.revenue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ${product.profit.toFixed(2)}
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
                        <p className="text-sm font-medium text-gray-900">${transaction.total}</p>
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
