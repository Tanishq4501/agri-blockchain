import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "For Farmers",
      description: "Register your produce, generate QR codes, and track earnings from farm to market with complete transparency.",
      icon: "Sprout",
      color: "from-green-500 to-emerald-600",
      benefits: ["Product Registration", "QR Code Generation", "Earnings Tracking", "Market Access"],
      cta: "Start Farming",
      link: "/user-registration?role=farmer",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "For Distributors",
      description: "Scan QR codes, update transit status, and manage logistics with real-time tracking capabilities.",
      icon: "Truck",
      color: "from-blue-500 to-cyan-600",
      benefits: ["QR Code Scanning", "Transit Updates", "Route Management", "Status Tracking"],
      cta: "Join Network",
      link: "/user-registration?role=distributor",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "For Consumers",
      description: "Verify product authenticity, view complete journey from farm to store, and make informed purchasing decisions.",
      icon: "Shield",
      color: "from-purple-500 to-pink-600",
      benefits: ["Product Verification", "Journey Timeline", "Authenticity Check", "Trust Building"],
      cta: "Verify Now",
      link: "/consumer-verification",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "For Retailers",
      description: "Validate stock authenticity, manage inventory with confidence, and provide transparency to customers.",
      icon: "Store",
      color: "from-orange-500 to-red-600",
      benefits: ["Stock Validation", "Inventory Management", "Customer Trust", "Quality Assurance"],
      cta: "Manage Stock",
      link: "/user-registration?role=retailer",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Icon name="Users" size={16} className="mr-2" />
            Built for Everyone in the Supply Chain
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Transparency for Every Stakeholder
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our platform connects farmers, distributors, consumers, and retailers in a unified ecosystem 
            that ensures food safety, authenticity, and trust throughout the entire supply chain.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((feature, index) => (
            <div
              key={feature?.id}
              className="group glass-card p-6 rounded-2xl hover-lift hover-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Feature Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature?.color} opacity-80`}></div>
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name={feature?.icon} size={20} color="white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
                {feature?.title}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                {feature?.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-2 mb-6">
                {feature?.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-xs text-text-secondary">
                    <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
                className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200"
                asChild
              >
                <Link to={feature?.link}>{feature?.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Transform Your Supply Chain?
            </h3>
            <p className="text-text-secondary mb-6">
              Join thousands of farmers, distributors, and retailers who trust AgriTrace 
              for complete supply chain transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                iconSize={18}
                asChild
              >
                <Link to="/user-registration">Get Started Today</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                iconSize={18}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;