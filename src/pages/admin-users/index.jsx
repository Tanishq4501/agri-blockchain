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

const AdminUsers = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const userData = {
    name: 'Admin User',
    email: 'admin@agritrace.com',
    role: 'admin',
    avatar: null
  };

  const notifications = [
    {
      id: 1,
      type: 'warning',
      message: '3 new user registrations pending approval',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Monthly user activity report is ready',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    }
  ];

  const mockUsers = [
    {
      id: 'USR-001',
      firstName: 'John',
      lastName: 'Mitchell',
      email: 'john.mitchell@greenfarm.com',
      role: 'farmer',
      status: 'active',
      joinDate: '2023-08-15T00:00:00Z',
      lastLogin: '2024-01-15T08:30:00Z',
      organization: 'Green Valley Farm',
      location: 'California, USA',
      verificationStatus: 'verified',
      activityScore: 95,
      totalScans: 156,
      productsRegistered: 12,
      certifications: ['USDA Organic', 'Non-GMO']
    },
    {
      id: 'USR-002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      role: 'consumer',
      status: 'active',
      joinDate: '2023-10-20T00:00:00Z',
      lastLogin: '2024-01-15T14:20:00Z',
      organization: null,
      location: 'San Francisco, CA',
      verificationStatus: 'verified',
      activityScore: 87,
      totalScans: 127,
      productsRegistered: 0,
      certifications: []
    },
    {
      id: 'USR-003',
      firstName: 'Mike',
      lastName: 'Rodriguez',
      email: 'mike.rodriguez@fastlogistics.com',
      role: 'distributor',
      status: 'active',
      joinDate: '2022-03-15T00:00:00Z',
      lastLogin: '2024-01-15T11:45:00Z',
      organization: 'Fast Logistics Solutions',
      location: 'Oakland, CA',
      verificationStatus: 'verified',
      activityScore: 92,
      totalScans: 1247,
      productsRegistered: 0,
      certifications: ['DOT Commercial', 'HACCP']
    },
    {
      id: 'USR-004',
      firstName: 'Emily',
      lastName: 'Chen',
      email: 'emily.chen@freshmarket.com',
      role: 'retailer',
      status: 'pending',
      joinDate: '2024-01-10T00:00:00Z',
      lastLogin: '2024-01-14T16:30:00Z',
      organization: 'Fresh Market Co.',
      location: 'Portland, OR',
      verificationStatus: 'pending',
      activityScore: 45,
      totalScans: 23,
      productsRegistered: 0,
      certifications: []
    },
    {
      id: 'USR-005',
      firstName: 'David',
      lastName: 'Thompson',
      email: 'david.thompson@organicvalley.com',
      role: 'farmer',
      status: 'suspended',
      joinDate: '2023-05-12T00:00:00Z',
      lastLogin: '2024-01-10T09:15:00Z',
      organization: 'Organic Valley Co-op',
      location: 'Wisconsin, USA',
      verificationStatus: 'verified',
      activityScore: 23,
      totalScans: 89,
      productsRegistered: 8,
      certifications: ['USDA Organic']
    },
    {
      id: 'USR-006',
      firstName: 'Lisa',
      lastName: 'Wang',
      email: 'lisa.wang@foodsafety.gov',
      role: 'regulator',
      status: 'active',
      joinDate: '2023-01-08T00:00:00Z',
      lastLogin: '2024-01-15T13:00:00Z',
      organization: 'Food Safety Authority',
      location: 'Washington, DC',
      verificationStatus: 'verified',
      activityScore: 78,
      totalScans: 234,
      productsRegistered: 0,
      certifications: ['Food Safety Inspector', 'Compliance Officer']
    }
  ];

  useEffect(() => {
    document.title = 'User Management - AgriTrace';
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/user-login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'suspended': return 'bg-error/10 text-error border-error/20';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'farmer': return 'bg-primary/10 text-primary border-primary/20';
      case 'consumer': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'distributor': return 'bg-accent/10 text-accent border-accent/20';
      case 'retailer': return 'bg-success/10 text-success border-success/20';
      case 'regulator': return 'bg-error/10 text-error border-error/20';
      case 'admin': return 'bg-gray-800/10 text-gray-800 border-gray-800/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.organization && user.organization.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'role':
        return a.role.localeCompare(b.role);
      case 'joinDate':
        return new Date(b.joinDate) - new Date(a.joinDate);
      case 'activity':
        return b.activityScore - a.activityScore;
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user:`, userId);
    // Here you would typically make API calls
    switch (action) {
      case 'approve':
        alert(`User ${userId} approved`);
        break;
      case 'suspend':
        alert(`User ${userId} suspended`);
        break;
      case 'activate':
        alert(`User ${userId} activated`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this user?')) {
          alert(`User ${userId} deleted`);
        }
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action);
    alert(`Bulk ${action} feature would be implemented here`);
  };

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
                <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
              </div>

              <div className="flex items-center space-x-4">
                <NotificationIndicator
                  notifications={notifications}
                  unreadCount={notifications.filter(n => !n.read).length}
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
          <div className="max-w-7xl mx-auto">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Users</p>
                    <p className="text-2xl font-bold text-text-primary">{mockUsers.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Active Users</p>
                    <p className="text-2xl font-bold text-success">
                      {mockUsers.filter(u => u.status === 'active').length}
                    </p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-full">
                    <Icon name="UserCheck" size={24} className="text-success" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Pending Approval</p>
                    <p className="text-2xl font-bold text-warning">
                      {mockUsers.filter(u => u.status === 'pending').length}
                    </p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-full">
                    <Icon name="Clock" size={24} className="text-warning" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">New This Month</p>
                    <p className="text-2xl font-bold text-secondary">
                      {mockUsers.filter(u => 
                        new Date(u.joinDate).getMonth() === new Date().getMonth() &&
                        new Date(u.joinDate).getFullYear() === new Date().getFullYear()
                      ).length}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Icon name="UserPlus" size={24} className="text-secondary" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters and Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="flex-1">
                    <Input
                      placeholder="Search users by name, email, or organization..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      iconName="Search"
                    />
                  </div>
                  <Select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="all">All Roles</option>
                    <option value="farmer">Farmer</option>
                    <option value="consumer">Consumer</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailer">Retailer</option>
                    <option value="regulator">Regulator</option>
                    <option value="admin">Admin</option>
                  </Select>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="name">By Name</option>
                    <option value="email">By Email</option>
                    <option value="role">By Role</option>
                    <option value="joinDate">By Join Date</option>
                    <option value="activity">By Activity</option>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleBulkAction('approve')}
                    iconName="Check"
                    iconPosition="left"
                    size="sm"
                  >
                    Bulk Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleBulkAction('export')}
                    iconName="Download"
                    iconPosition="left"
                    size="sm"
                  >
                    Export
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.firstName[0]}{user.lastName[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-text-primary">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-text-secondary">{user.email}</div>
                              {user.organization && (
                                <div className="text-xs text-text-secondary">{user.organization}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getVerificationColor(user.verificationStatus)}`}>
                              {user.verificationStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-text-primary">
                            <div className={`font-semibold ${getActivityScoreColor(user.activityScore)}`}>
                              {user.activityScore}%
                            </div>
                            <div className="text-xs text-text-secondary">
                              {user.totalScans} scans
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {formatDate(user.joinDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {formatDateTime(user.lastLogin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            {user.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'approve')}
                                iconName="Check"
                                className="text-success border-success hover:bg-success/10"
                              />
                            )}
                            {user.status === 'active' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                iconName="Pause"
                                className="text-warning border-warning hover:bg-warning/10"
                              />
                            )}
                            {user.status === 'suspended' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'activate')}
                                iconName="Play"
                                className="text-success border-success hover:bg-success/10"
                              />
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => console.log('Edit user:', user.id)}
                              iconName="Edit"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction(user.id, 'delete')}
                              iconName="Trash2"
                              className="text-error border-error hover:bg-error/10"
                            />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {sortedUsers.length === 0 && (
                <div className="p-12 text-center">
                  <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No users found</h3>
                  <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
