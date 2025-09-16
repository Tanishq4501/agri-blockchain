import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TranslatableText from '../../../components/ui/TranslatableText';

const WalletSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const walletData = {
    currentBalance: 12450.75,
    pendingPayments: 3250.00,
    monthlyEarnings: 8900.25,
    totalEarnings: 45670.50
  };

  const transactions = [
    {
      id: 'TXN-2025-001',
      date: '2025-01-12',
      buyer: 'Fresh Market Co.',
      product: 'Organic Tomatoes - 500kg',
      amount: 1250.00,
      status: 'completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'TXN-2025-002',
      date: '2025-01-11',
      buyer: 'Green Valley Distributors',
      product: 'Sweet Corn - 300kg',
      amount: 750.50,
      status: 'pending',
      paymentMethod: 'Digital Wallet'
    },
    {
      id: 'TXN-2025-003',
      date: '2025-01-10',
      buyer: 'City Supermarket Chain',
      product: 'Organic Potatoes - 800kg',
      amount: 2100.25,
      status: 'completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'TXN-2025-004',
      date: '2025-01-09',
      buyer: 'Local Food Hub',
      product: 'Mixed Vegetables - 200kg',
      amount: 450.00,
      status: 'disputed',
      paymentMethod: 'Cash'
    },
    {
      id: 'TXN-2025-005',
      date: '2025-01-08',
      buyer: 'Organic Foods Ltd.',
      product: 'Carrots - 400kg',
      amount: 680.75,
      status: 'completed',
      paymentMethod: 'Digital Wallet'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle', label: 'Completed' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20 animate-pulse-soft', icon: 'Clock', label: 'Pending' },
      disputed: { color: 'bg-error/10 text-error border-error/20', icon: 'AlertTriangle', label: 'Disputed' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" strokeWidth={2} />
        {config?.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Current Balance</p>
              <p className="text-2xl font-bold text-text-primary mt-1">
                {formatCurrency(walletData?.currentBalance)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center">
              <Icon name="Wallet" size={24} color="white" strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" strokeWidth={2} />
            <span className="text-success font-medium">+12.5%</span>
            <span className="text-text-secondary ml-1">from last month</span>
          </div>
        </div>

        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Pending Payments</p>
              <p className="text-2xl font-bold text-warning mt-1">
                {formatCurrency(walletData?.pendingPayments)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-amber-400 rounded-xl flex items-center justify-center">
              <Icon name="Clock" size={24} color="white" strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Icon name="Package" size={16} className="text-text-secondary mr-1" strokeWidth={2} />
            <span className="text-text-secondary">3 transactions pending</span>
          </div>
        </div>

        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Monthly Earnings</p>
              <p className="text-2xl font-bold text-text-primary mt-1">
                {formatCurrency(walletData?.monthlyEarnings)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-blue-400 rounded-xl flex items-center justify-center">
              <Icon name="Calendar" size={24} color="white" strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Icon name="Target" size={16} className="text-secondary mr-1" strokeWidth={2} />
            <span className="text-secondary font-medium">89%</span>
            <span className="text-text-secondary ml-1">of monthly goal</span>
          </div>
        </div>

        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Earnings</p>
              <p className="text-2xl font-bold text-text-primary mt-1">
                {formatCurrency(walletData?.totalEarnings)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center">
              <Icon name="DollarSign" size={24} color="white" strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Icon name="Award" size={16} className="text-primary mr-1" strokeWidth={2} />
            <span className="text-text-secondary">Since joining platform</span>
          </div>
        </div>
      </div>
      {/* Transaction History */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
                <Icon name="History" size={20} color="white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Transaction History</h3>
                <p className="text-sm text-text-secondary">Recent payment transactions</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={16}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'View All'}
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Mobile View - Cards */}
          <div className="block md:hidden space-y-4">
            {(isExpanded ? transactions : transactions?.slice(0, 3))?.map((transaction) => (
              <div key={transaction?.id} className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">{transaction?.id}</span>
                  {getStatusBadge(transaction?.status)}
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{transaction?.buyer}</p>
                  <TranslatableText as="p" className="text-sm text-text-secondary" text={transaction?.product} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(transaction?.amount)}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {formatDate(transaction?.date)}
                  </span>
                </div>
                <div className="text-xs text-text-secondary">
                  Payment: {transaction?.paymentMethod}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Buyer</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Status</th>
                </tr>
              </thead>
              <tbody>
                {(isExpanded ? transactions : transactions?.slice(0, 3))?.map((transaction) => (
                  <tr key={transaction?.id} className="border-b border-gray-50 hover:bg-muted/50 transition-colors duration-200">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-text-primary">{transaction?.id}</span>
                    </td>
                    <td className="py-4 px-4 text-text-secondary">
                      {formatDate(transaction?.date)}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-text-primary">{transaction?.buyer}</p>
                        <p className="text-xs text-text-secondary">{transaction?.paymentMethod}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-text-secondary">
                      <TranslatableText text={transaction?.product} />
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-primary">
                        {formatCurrency(transaction?.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(transaction?.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isExpanded && transactions?.length > 3 && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={() => setIsExpanded(true)}
              >
                View {transactions?.length - 3} More Transactions
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletSection;