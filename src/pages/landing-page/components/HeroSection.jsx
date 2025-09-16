import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-success rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
              <Icon name="Shield" size={16} className="mr-2" />
              Trusted by 10,000+ Farmers Worldwide
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight animate-slide-up">
              Track Your Food
              <span className="block text-primary">From Farm to Fork</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0 animate-slide-up">
              Complete agricultural supply chain transparency with QR code verification. 
              Ensure authenticity, build trust, and connect consumers directly with farmers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-slide-up">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                iconSize={20}
                className="hover-lift"
                asChild
              >
                <Link to="/user-registration">Get Started Free</Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="QrCode"
                iconPosition="left"
                iconSize={20}
                className="hover-lift"
                asChild
              >
                <Link to="/consumer-verification">Verify Product</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-text-secondary animate-fade-in">
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="text-success mr-2" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <Icon name="CheckCircle" size={16} className="text-success mr-2" />
                INRA Compliant
              </div>
              <div className="flex items-center">
                <Icon name="Users" size={16} className="text-success mr-2" />
                50K+ Verified Products
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative animate-fade-in">
            <div className="glass-card p-8 rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Farmer holding fresh vegetables with QR code overlay"
                className="w-full h-96 object-cover rounded-2xl shadow-elevated"
              />
              
              {/* Floating QR Code Card */}
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl shadow-floating animate-pulse-soft">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-2">
                  <Icon name="QrCode" size={32} className="text-primary" />
                </div>
                <p className="text-xs text-text-secondary text-center font-medium">
                  Scan to Verify
                </p>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -top-4 -left-4 glass-card p-4 rounded-xl shadow-floating">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-text-primary">Live Tracking</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Real-time updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;