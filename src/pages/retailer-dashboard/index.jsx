import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Store,
  Truck,
  QrCode,
  FileText
} from 'lucide-react';

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah@freshmart.com",
    role: "retailer",
    avatar: "/api/placeholder/40/40"
  };

  // Mock dashboard data
  useEffect(() => {
    setDashboardStats({
      totalRevenue: 125400,
      dailyRevenue: 4250,
      totalOrders: 1847,
      dailyOrders: 67,
      totalProducts: 2456,
      lowStockProducts: 23,
      totalCustomers: 892,
      newCustomers: 15,
      revenueChange: 12.5,
      ordersChange: 8.3,
      productsChange: 5.2,
      customersChange: 15.2
    });

    setRecentOrders([
      {
        id: 1,
        orderId: "ORD-2024-001",
        customer: "John Smith",
        items: 5,
        total: 89.50,
        status: "completed",
        time: "2 hours ago"
      },
      {
        id: 2,
        orderId: "ORD-2024-002",
        customer: "Emily Davis",
        items: 3,
        total: 45.75,
        status: "processing",
        time: "3 hours ago"
      },
      {
        id: 3,
        orderId: "ORD-2024-003",
        customer: "Michael Brown",
        items: 8,
        total: 156.20,
        status: "pending",
        time: "4 hours ago"
      },
      {
        id: 4,
        orderId: "ORD-2024-004",
        customer: "Lisa Wilson",
        items: 2,
        total: 23.40,
        status: "completed",
        time: "5 hours ago"
      }
    ]);

    setLowStockItems([
      {
        id: 1,
        name: "Organic Tomatoes",
        currentStock: 5,
        minStock: 20,
        supplier: "Green Valley Farms",
        category: "Vegetables"
      },
      {
        id: 2,
        name: "Red Apples",
        currentStock: 8,
        minStock: 25,
        supplier: "Mountain Orchards",
        category: "Fruits"
      },
      {
        id: 3,
        name: "Baby Carrots",
        currentStock: 3,
        minStock: 15,
        supplier: "Fresh Fields Co.",
        category: "Vegetables"
      },
      {
        id: 4,
        name: "Romaine Lettuce",
        currentStock: 2,
        minStock: 12,
        supplier: "Sunny Greens",
        category: "Vegetables"
      }
    ]);

    setRecentActivity([
      {
        id: 1,
        type: "order",
        description: "New order received from John Smith",
        time: "5 minutes ago",
        icon: ShoppingCart,
        status: "success"
      },
      {
        id: 2,
        type: "stock",
        description: "Low stock alert: Organic Tomatoes",
        time: "15 minutes ago",
        icon: AlertTriangle,
        status: "warning"
      },
      {
        id: 3,
        type: "verification",
        description: "Product verification completed for batch BT-2024-001",
        time: "30 minutes ago",
        icon: CheckCircle,
        status: "success"
      },
      {
        id: 4,
        type: "delivery",
        description: "Shipment received from Green Valley Farms",
        time: "1 hour ago",
        icon: Truck,
        status: "info"
      }
    ]);
  }, []);

  const quickActions = [
    {
      title: "Verify Inventory",
      description: "Scan and verify product authenticity",
      icon: QrCode,
      color: "bg-blue-500",
      path: "/retailer-verify"
    },
    {
      title: "Stock Management",
      description: "Manage inventory and stock levels",
      icon: Package,
      color: "bg-green-500",
      path: "/retailer-stock-management"
    },
    {
      title: "Sales Reports",
      description: "View detailed sales analytics",
      icon: BarChart3,
      color: "bg-purple-500",
      path: "/retailer-reports"
    },
    {
      title: "Add New Product",
      description: "Add products to inventory",
      icon: Plus,
      color: "bg-amber-500",
      path: "/retailer-stock-management"
    }
  ];

  const dashboardMetrics = [
    {
      title: "Today's Revenue",
      value: `$${dashboardStats.dailyRevenue?.toLocaleString() || '0'}`,
      total: `$${dashboardStats.totalRevenue?.toLocaleString() || '0'} total`,
      change: dashboardStats.revenueChange,
      changeType: dashboardStats.revenueChange > 0 ? "positive" : "negative",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Today's Orders",
      value: dashboardStats.dailyOrders?.toLocaleString() || '0',
      total: `${dashboardStats.totalOrders?.toLocaleString() || '0'} total`,
      change: dashboardStats.ordersChange,
      changeType: dashboardStats.ordersChange > 0 ? "positive" : "negative",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Total Products",
      value: dashboardStats.totalProducts?.toLocaleString() || '0',
      total: `${dashboardStats.lowStockProducts || '0'} low stock`,
      change: dashboardStats.productsChange,
      changeType: dashboardStats.productsChange > 0 ? "positive" : "negative",
      icon: Package,
      color: "text-purple-600"
    },
    {
      title: "Total Customers",
      value: dashboardStats.totalCustomers?.toLocaleString() || '0',
      total: `${dashboardStats.newCustomers || '0'} new today`,
      change: dashboardStats.customersChange,
      changeType: dashboardStats.customersChange > 0 ? "positive" : "negative",
      icon: Users,
      color: "text-amber-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
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
              <h1 className="text-2xl font-bold text-gray-900">Retailer Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userData.name}! Here's your store overview.</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator count={5} />
              <ProfileDropdown user={userData} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">Today's Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
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
                    <p className="text-xs text-gray-500 mt-1">{metric.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders and Low Stock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Recent Orders */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/retailer-reports')}>
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ShoppingCart className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.orderId}</p>
                        <p className="text-xs text-gray-500">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${order.total}</p>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/retailer-stock-management')}>
                  Manage Stock
                </Button>
              </div>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg border border-amber-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.supplier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-amber-600">{item.currentStock} left</p>
                      <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200">
              <div className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getActivityStatusColor(activity.status)}`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Store Performance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-lg inline-block mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-blue-100 rounded-lg inline-block mb-2">
                  <Store className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">15.2%</p>
                <p className="text-sm text-gray-600">Monthly Growth</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-purple-100 rounded-lg inline-block mb-2">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">99.8%</p>
                <p className="text-sm text-gray-600">Product Authenticity</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default RetailerDashboard;
