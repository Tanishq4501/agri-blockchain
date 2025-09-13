import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSection = () => {
  const trustIndicators = [
    {
      id: 1,
      title: "SSL Encryption",
      description: "256-bit SSL encryption protects all data transmission",
      icon: "Lock",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 2,
      title: "USDA Compliant",
      description: "Fully compliant with USDA food safety regulations",
      icon: "Shield",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 3,
      title: "Blockchain Verified",
      description: "Immutable records secured by blockchain technology",
      icon: "Link",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      id: 4,
      title: "ISO 27001 Certified",
      description: "International standard for information security",
      icon: "Award",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const statistics = [
    {
      id: 1,
      value: "50,000+",
      label: "Products Verified",
      icon: "Package"
    },
    {
      id: 2,
      value: "10,000+",
      label: "Trusted Farmers",
      icon: "Users"
    },
    {
      id: 3,
      value: "99.9%",
      label: "Uptime Guarantee",
      icon: "Activity"
    },
    {
      id: 4,
      value: "24/7",
      label: "Support Available",
      icon: "Headphones"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "USDA Organic",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "United States Department of Agriculture certification"
    },
    {
      id: 2,
      name: "FDA Approved",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Food and Drug Administration compliance"
    },
    {
      id: 3,
      name: "ISO 27001",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Information Security Management certification"
    },
    {
      id: 4,
      name: "SOC 2 Type II",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Security and availability compliance report"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full text-success text-sm font-medium mb-4">
            <Icon name="ShieldCheck" size={16} className="mr-2" />
            Trusted & Secure Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Built on Trust & Security
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our platform meets the highest standards of security, compliance, and reliability. 
            Your data and supply chain information are protected by industry-leading security measures.
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustIndicators?.map((indicator, index) => (
            <div
              key={indicator?.id}
              className="glass-card p-6 rounded-xl text-center hover-lift transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${indicator?.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon name={indicator?.icon} size={28} className={indicator?.color} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {indicator?.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {indicator?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="glass-card p-8 rounded-2xl mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics?.map((stat, index) => (
              <div
                key={stat?.id}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat?.icon} size={24} className="text-primary" strokeWidth={2} />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-1">
                  {stat?.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Certifications & Compliance
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            We maintain the highest standards of compliance and security through rigorous 
            certification processes and regular audits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications?.map((cert, index) => (
            <div
              key={cert?.id}
              className="glass-card p-6 rounded-xl text-center hover-lift transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden shadow-soft">
                <img
                  src={cert?.image}
                  alt={cert?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-text-primary mb-2">
                {cert?.name}
              </h4>
              <p className="text-xs text-text-secondary">
                {cert?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Advanced Security Features
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our multi-layered security approach ensures your supply chain data 
              remains protected and tamper-proof at all times.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Database" size={28} className="text-success" strokeWidth={2} />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Encrypted Storage
              </h4>
              <p className="text-sm text-text-secondary">
                All data is encrypted at rest using AES-256 encryption standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Eye" size={28} className="text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Audit Trails
              </h4>
              <p className="text-sm text-text-secondary">
                Complete audit trails track every action and change in the system
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="UserCheck" size={28} className="text-secondary" strokeWidth={2} />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Access Control
              </h4>
              <p className="text-sm text-text-secondary">
                Role-based access control ensures users only see relevant information
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;