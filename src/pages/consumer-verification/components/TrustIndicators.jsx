import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ trustScore, verificationBadges, complianceCertifications }) => {
  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10 border-success/20';
    if (score >= 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getTrustScoreIcon = (score) => {
    if (score >= 90) return 'ShieldCheck';
    if (score >= 70) return 'Shield';
    return 'ShieldAlert';
  };

  const getBadgeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'verified':
        return 'CheckCircle';
      case 'authentic':
        return 'Shield';
      case 'fresh':
        return 'Leaf';
      case 'quality':
        return 'Award';
      case 'traceable':
        return 'MapPin';
      default:
        return 'Badge';
    }
  };

  const getCertificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'fda approved':
        return 'FileCheck';
      case 'iso certified':
        return 'Award';
      case 'haccp compliant':
        return 'Shield';
      case 'organic certified':
        return 'Leaf';
      case 'fair trade':
        return 'HandHeart';
      default:
        return 'Certificate';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevated border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Trust & Compliance</h2>
        <p className="text-text-secondary">
          Verified quality and compliance indicators
        </p>
      </div>
      {/* Trust Score */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getTrustScoreColor(trustScore)} mb-4`}>
          <div className="text-center">
            <Icon 
              name={getTrustScoreIcon(trustScore)} 
              size={32} 
              strokeWidth={2}
              className="mx-auto mb-1"
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-text-primary">{trustScore}%</div>
          <div className="text-sm text-text-secondary">Trust Score</div>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTrustScoreColor(trustScore)}`}>
            {trustScore >= 90 ? 'Highly Trusted' : trustScore >= 70 ? 'Trusted' : 'Needs Verification'}
          </div>
        </div>
      </div>
      {/* Verification Badges */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Badge" size={20} className="mr-2 text-primary" />
          Verification Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {verificationBadges?.map((badge, index) => (
            <div key={index} className="bg-muted rounded-lg p-3 text-center hover-lift">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon 
                  name={getBadgeIcon(badge?.type)} 
                  size={20} 
                  className="text-success"
                  strokeWidth={2}
                />
              </div>
              <div className="text-sm font-medium text-text-primary">{badge?.type}</div>
              <div className="text-xs text-text-secondary mt-1">{badge?.verifiedDate}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Certifications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="FileCheck" size={20} className="mr-2 text-primary" />
          Compliance Certifications
        </h3>
        <div className="space-y-3">
          {complianceCertifications?.map((cert, index) => (
            <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-4 hover-lift">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon 
                    name={getCertificationIcon(cert?.name)} 
                    size={18} 
                    className="text-primary"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{cert?.name}</div>
                  <div className="text-xs text-text-secondary">
                    Valid until: {cert?.expiryDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-4 border border-primary/10">
        <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Lock" size={16} className="mr-2 text-primary" />
          Security Features
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">Blockchain Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Key" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">Encrypted Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">Tamper Evident</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">Real-time Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;