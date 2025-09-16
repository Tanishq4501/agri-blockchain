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

const AdminCompliance = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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
      message: '5 compliance violations require immediate attention',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Monthly compliance report generated',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    }
  ];

  const mockComplianceData = [
    {
      id: 'COMP-001',
      type: 'certification',
      title: 'INRA Organic Certification Expiring',
      description: 'Green Valley Farm organic certification expires in 30 days',
      entity: 'Green Valley Farm',
      entityType: 'farmer',
      severity: 'medium',
      status: 'pending',
      dueDate: '2024-02-15T00:00:00Z',
      createdDate: '2024-01-15T10:30:00Z',
      assignedTo: 'Lisa Wang',
      category: 'Food Safety',
      regulatoryBody: 'INRA',
      actions: ['Renewal Required', 'Documentation Update']
    },
    {
      id: 'COMP-002',
      type: 'violation',
      title: 'Temperature Log Discrepancy',
      description: 'Fast Logistics shipment SH-2024-001 shows temperature deviation',
      entity: 'Fast Logistics Solutions',
      entityType: 'distributor',
      severity: 'high',
      status: 'investigating',
      dueDate: '2024-01-18T00:00:00Z',
      createdDate: '2024-01-15T08:45:00Z',
      assignedTo: 'David Chen',
      category: 'Cold Chain',
      regulatoryBody: 'FDA',
      actions: ['Investigation', 'Corrective Action Plan']
    },
    {
      id: 'COMP-003',
      type: 'audit',
      title: 'Quarterly Food Safety Audit',
      description: 'Scheduled audit for Fresh Market Co. retail operations',
      entity: 'Fresh Market Co.',
      entityType: 'retailer',
      severity: 'low',
      status: 'scheduled',
      dueDate: '2024-01-25T00:00:00Z',
      createdDate: '2024-01-10T14:20:00Z',
      assignedTo: 'Sarah Martinez',
      category: 'Food Safety',
      regulatoryBody: 'Local Health Department',
      actions: ['Site Inspection', 'Documentation Review']
    },
    {
      id: 'COMP-004',
      type: 'documentation',
      title: 'Missing Traceability Records',
      description: 'Organic Valley Co-op missing batch tracking documentation',
      entity: 'Organic Valley Co-op',
      entityType: 'farmer',
      severity: 'medium',
      status: 'overdue',
      dueDate: '2024-01-12T00:00:00Z',
      createdDate: '2024-01-05T09:15:00Z',
      assignedTo: 'Michael Brown',
      category: 'Traceability',
      regulatoryBody: 'State Agriculture Department',
      actions: ['Document Submission', 'Process Review']
    },
    {
      id: 'COMP-005',
      type: 'certification',
      title: 'HACCP Certification Renewal',
      description: 'Happy Hen Farm HACCP certification renewal approved',
      entity: 'Happy Hen Farm',
      entityType: 'farmer',
      severity: 'low',
      status: 'resolved',
      dueDate: '2024-01-10T00:00:00Z',
      createdDate: '2023-12-15T11:30:00Z',
      assignedTo: 'Jennifer Lee',
      category: 'Food Safety',
      regulatoryBody: 'FDA',
      actions: ['Certificate Issued', 'Database Updated']
    }
  ];

  const complianceStats = {
    total: mockComplianceData.length,
    pending: mockComplianceData.filter(item => item.status === 'pending').length,
    overdue: mockComplianceData.filter(item => item.status === 'overdue').length,
    resolved: mockComplianceData.filter(item => item.status === 'resolved').length,
    highSeverity: mockComplianceData.filter(item => item.severity === 'high').length
  };

  useEffect(() => {
    document.title = 'Compliance Management - AgriTrace';
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
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'investigating': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'overdue': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'violation': return 'bg-error/10 text-error border-error/20';
      case 'audit': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'certification': return 'bg-primary/10 text-primary border-primary/20';
      case 'documentation': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'violation': return 'AlertTriangle';
      case 'audit': return 'Search';
      case 'certification': return 'Award';
      case 'documentation': return 'FileText';
      default: return 'AlertCircle';
    }
  };

  const filteredData = mockComplianceData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdDate) - new Date(a.createdDate);
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'severity':
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case 'entity':
        return a.entity.localeCompare(b.entity);
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

  const isOverdue = (dueDate, status) => {
    return status !== 'resolved' && new Date(dueDate) < new Date();
  };

  const handleComplianceAction = (id, action) => {
    console.log(`${action} compliance item:`, id);
    alert(`${action} feature would be implemented here`);
  };

  const handleGenerateReport = () => {
    console.log('Generating compliance report...');
    alert('Compliance report generation feature would be implemented here');
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
                <h1 className="text-2xl font-bold text-text-primary">Compliance Management</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Total Items</p>
                    <p className="text-2xl font-bold text-text-primary">{complianceStats.total}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="FileCheck" size={24} className="text-primary" />
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
                    <p className="text-sm font-medium text-text-secondary">Pending</p>
                    <p className="text-2xl font-bold text-warning">{complianceStats.pending}</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-full">
                    <Icon name="Clock" size={24} className="text-warning" />
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
                    <p className="text-sm font-medium text-text-secondary">Overdue</p>
                    <p className="text-2xl font-bold text-error">{complianceStats.overdue}</p>
                  </div>
                  <div className="p-3 bg-error/10 rounded-full">
                    <Icon name="AlertTriangle" size={24} className="text-error" />
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
                    <p className="text-sm font-medium text-text-secondary">High Priority</p>
                    <p className="text-2xl font-bold text-error">{complianceStats.highSeverity}</p>
                  </div>
                  <div className="p-3 bg-error/10 rounded-full">
                    <Icon name="AlertCircle" size={24} className="text-error" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">Resolved</p>
                    <p className="text-2xl font-bold text-success">{complianceStats.resolved}</p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-full">
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters and Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="flex-1">
                    <Input
                      placeholder="Search compliance items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      iconName="Search"
                    />
                  </div>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="overdue">Overdue</option>
                    <option value="resolved">Resolved</option>
                  </Select>
                  <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="all">All Types</option>
                    <option value="violation">Violations</option>
                    <option value="audit">Audits</option>
                    <option value="certification">Certifications</option>
                    <option value="documentation">Documentation</option>
                  </Select>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-[150px]"
                  >
                    <option value="date">By Date</option>
                    <option value="dueDate">By Due Date</option>
                    <option value="severity">By Severity</option>
                    <option value="entity">By Entity</option>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerateReport}
                    iconName="FileText"
                    iconPosition="left"
                    size="sm"
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Compliance Items */}
            <div className="space-y-6">
              {sortedData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Icon name={getTypeIcon(item.type)} size={24} color="white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                          <span className="text-sm text-text-secondary font-mono">{item.id}</span>
                        </div>
                        <p className="text-text-secondary mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>Entity: {item.entity}</span>
                          <span>•</span>
                          <span>Category: {item.category}</span>
                          <span>•</span>
                          <span>Regulatory Body: {item.regulatoryBody}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                        {item.severity} priority
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Overdue Alert */}
                  {isOverdue(item.dueDate, item.status) && (
                    <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-error" />
                        <p className="text-sm text-error font-medium">
                          This item is overdue by {Math.ceil((new Date() - new Date(item.dueDate)) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Due Date</p>
                      <p className={`text-text-primary ${isOverdue(item.dueDate, item.status) ? 'text-error font-semibold' : ''}`}>
                        {formatDate(item.dueDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Created</p>
                      <p className="text-text-primary">{formatDate(item.createdDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Assigned To</p>
                      <p className="text-text-primary">{item.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Entity Type</p>
                      <p className="text-text-primary capitalize">{item.entityType}</p>
                    </div>
                  </div>

                  {/* Required Actions */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-secondary mb-2">Required Actions</p>
                    <div className="flex flex-wrap gap-2">
                      {item.actions.map((action, actionIndex) => (
                        <span 
                          key={actionIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                        >
                          <Icon name="CheckSquare" size={12} className="mr-1" />
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    {item.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleComplianceAction(item.id, 'Start Investigation')}
                        iconName="Play"
                        iconPosition="left"
                      >
                        Start Investigation
                      </Button>
                    )}
                    {item.status === 'investigating' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleComplianceAction(item.id, 'Mark Resolved')}
                        iconName="CheckCircle"
                        iconPosition="left"
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleComplianceAction(item.id, 'View Details')}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleComplianceAction(item.id, 'Add Note')}
                      iconName="MessageSquare"
                      iconPosition="left"
                    >
                      Add Note
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleComplianceAction(item.id, 'Assign')}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Reassign
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {sortedData.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <Icon name="FileCheck" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No compliance items found</h3>
                <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminCompliance;
