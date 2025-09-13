import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Database,
  Globe,
  Clock,
  DollarSign,
  Package
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [systemStats, setSystemStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Mock admin user data
  const userData = {
    name: "System Administrator",
    email: "admin@agritrace.com",
    role: "admin",
    avatar: "/api/placeholder/40/40"
  };

  // Mock system statistics
  useEffect(() => {
    setSystemStats({
      totalUsers: 12847,
      activeUsers: 8934,
      totalProducts: 45623,
      verifiedProducts: 42156,
      totalTransactions: 156789,
      systemUptime: "99.9%",
      dataStorage: "2.4TB",
      apiCalls: 1234567
    });

    setRecentActivity([
      {
        id: 1,
        type: "user_registration",
        description: "New farmer registered: John Smith",
        timestamp: "2 minutes ago",
        icon: Users,
        status: "success"
      },
      {
        id: 2,
        type: "compliance_alert",
        description: "Compliance violation detected in Region 5",
        timestamp: "15 minutes ago",
        icon: AlertTriangle,
        status: "warning"
      },
      {
        id: 3,
        type: "system_update",
        description: "Database backup completed successfully",
        timestamp: "1 hour ago",
        icon: Database,
        status: "success"
      },
      {
        id: 4,
        type: "product_verification",
        description: "1,234 products verified today",
        timestamp: "2 hours ago",
        icon: CheckCircle,
        status: "info"
      },
      {
        id: 5,
        type: "api_usage",
        description: "API usage spike detected - 150% of normal",
        timestamp: "3 hours ago",
        icon: TrendingUp,
        status: "warning"
      }
    ]);

    setAlerts([
      {
        id: 1,
        type: "critical",
        title: "System Maintenance Required",
        description: "Database optimization scheduled for tonight",
        action: "View Details"
      },
      {
        id: 2,
        type: "warning",
        title: "High API Usage",
        description: "API calls exceeded 80% of daily limit",
        action: "Monitor Usage"
      },
      {
        id: 3,
        type: "info",
        title: "New Feature Available",
        description: "Blockchain integration module is ready for deployment",
        action: "Learn More"
      }
    ]);
  }, []);

  const quickActions = [
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      color: "bg-blue-500",
      path: "/admin-users"
    },
    {
      title: "System Analytics",
      description: "View detailed system performance metrics",
      icon: TrendingUp,
      color: "bg-green-500",
      path: "/admin-analytics"
    },
    {
      title: "Compliance Monitor",
      description: "Track compliance status and violations",
      icon: Shield,
      color: "bg-amber-500",
      path: "/admin-compliance"
    },
    {
      title: "System Settings",
      description: "Configure system parameters and integrations",
      icon: Settings,
      color: "bg-purple-500",
      path: "/admin-settings"
    }
  ];

  const systemMetrics = [
    {
      title: "Total Users",
      value: systemStats.totalUsers?.toLocaleString() || "0",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Products",
      value: systemStats.totalProducts?.toLocaleString() || "0",
      change: "+8%",
      changeType: "positive",
      icon: Package,
      color: "text-green-600"
    },
    {
      title: "Transactions",
      value: systemStats.totalTransactions?.toLocaleString() || "0",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-amber-600"
    },
    {
      title: "System Uptime",
      value: systemStats.systemUptime || "0%",
      change: "Excellent",
      changeType: "positive",
      icon: Activity,
      color: "text-purple-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-amber-500 bg-amber-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <RoleBasedSidebar
        userRole="admin"
        isCollapsed={isSidebarCollapsed}
        onToggle={setIsSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">System overview and management center</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationIndicator count={3} />
              <ProfileDropdown user={userData} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* System Alerts */}
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
              <div className="grid gap-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* System Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">System Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* System Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database Status</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Response Time</span>
                  <span className="text-sm font-medium text-green-600">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Usage</span>
                  <span className="text-sm font-medium text-amber-600">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Connections</span>
                  <span className="text-sm font-medium text-blue-600">2,847</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today's Registrations</span>
                  <span className="text-sm font-medium text-blue-600">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Products Verified</span>
                  <span className="text-sm font-medium text-green-600">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="text-sm font-medium text-purple-600">8,934</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Support Tickets</span>
                  <span className="text-sm font-medium text-amber-600">12</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
