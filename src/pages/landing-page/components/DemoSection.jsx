import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const demoSteps = [
    {
      id: 0,
      title: "Farmer Registration",
      description: "Farmers register their produce with detailed information including origin, cultivation methods, and harvest dates.",
      icon: "UserPlus",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Product Details", "Farm Information", "Cultivation Methods", "Harvest Dates"]
    },
    {
      id: 1,
      title: "QR Code Generation",
      description: "Each registered product gets a unique QR code containing all traceability information and blockchain verification.",
      icon: "QrCode",
      image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Unique Identifier", "Blockchain Security", "Tamper Proof", "Instant Access"]
    },
    {
      id: 2,
      title: "Supply Chain Tracking",
      description: "Distributors scan QR codes to update location, status, and handling information throughout the journey.",
      icon: "Truck",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Real-time Updates", "Location Tracking", "Status Changes", "Handler Information"]
    },
    {
      id: 3,
      title: "Consumer Verification",
      description: "Consumers scan the QR code to view complete product journey, verify authenticity, and access detailed information.",
      icon: "Shield",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Journey Timeline", "Authenticity Proof", "Farm Details", "Quality Assurance"]
    }
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % demoSteps?.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + demoSteps?.length) % demoSteps?.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
            <Icon name="Play" size={16} className="mr-2" />
            See How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Interactive Supply Chain Demo
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Experience the complete journey from farm registration to consumer verification. 
            See how our QR code system ensures transparency at every step.
          </p>
        </div>

        {/* Demo Container */}
        <div className="glass-card p-8 rounded-3xl shadow-floating">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Content */}
            <div>
              {/* Step Indicator */}
              <div className="flex items-center mb-8">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStep >= 0 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    1
                  </div>
                  <div className={`w-12 h-1 ${activeStep >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                  <div className={`w-12 h-1 ${activeStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    3
                  </div>
                  <div className={`w-12 h-1 ${activeStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    4
                  </div>
                </div>
              </div>

              {/* Current Step Content */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <Icon name={demoSteps?.[activeStep]?.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {demoSteps?.[activeStep]?.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      Step {activeStep + 1} of {demoSteps?.length}
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {demoSteps?.[activeStep]?.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {demoSteps?.[activeStep]?.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Icon name="CheckCircle" size={16} className="text-success mr-2 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    iconPosition="left"
                    iconSize={16}
                    onClick={prevStep}
                    disabled={activeStep === 0}
                  >
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    {demoSteps?.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          idx === activeStep ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronRight"
                    iconPosition="right"
                    iconSize={16}
                    onClick={nextStep}
                    disabled={activeStep === demoSteps?.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Demo Visual */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={demoSteps?.[activeStep]?.image}
                  alt={demoSteps?.[activeStep]?.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Overlay QR Code */}
                <div className="absolute bottom-6 right-6 glass-card p-3 rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <Icon name="QrCode" size={28} className="text-primary" />
                  </div>
                </div>

                {/* Step Badge */}
                <div className="absolute top-6 left-6 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Step {activeStep + 1}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 glass-card p-3 rounded-xl animate-pulse-soft">
                <Icon name="Zap" size={20} className="text-warning" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl animate-pulse-soft">
                <Icon name="Shield" size={20} className="text-success" />
              </div>
            </div>
          </div>

          {/* Auto-play Controls */}
          <div className="flex items-center justify-center mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              iconName="Play"
              iconPosition="left"
              iconSize={16}
              onClick={() => {
                const interval = setInterval(() => {
                  setActiveStep((prev) => (prev + 1) % demoSteps?.length);
                }, 3000);
                setTimeout(() => clearInterval(interval), 12000);
              }}
            >
              Auto Play Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;