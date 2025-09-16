import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock product data
  const mockProduct = {
    id: 'TOM-2025-001',
    name: 'Organic Cherry Tomatoes',
    category: 'Vegetables',
    variety: 'Sweet 100 Cherry',
    farmer: {
      name: 'Green Valley Farm',
      location: 'Salinas Valley, California',
      contact: 'john.mitchell@greenfarm.com',
      certifications: ['INRA Organic', 'Non-GMO Project Verified'],
      farmSize: '25 acres',
      established: '1995'
    },
    harvest: {
      date: '2025-01-10',
      method: 'Hand-picked',
      weather: 'Sunny, 24°C',
      quantity: '500 kg'
    },
    quality: {
      grade: 'Premium',
      freshness: 98,
      appearance: 95,
      taste: 97,
      nutritionalValue: 94
    },
    certifications: [
      {
        name: 'INRA Organic',
        issuer: 'United States Department of Agriculture',
        validUntil: '2025-12-31',
        certificateId: 'ORG-2024-1234'
      },
      {
        name: 'Non-GMO Project Verified',
        issuer: 'Non-GMO Project',
        validUntil: '2025-06-30',
        certificateId: 'NGP-2024-5678'
      }
    ],
    journey: [
      {
        stage: 'Seed Planting',
        date: '2024-10-15',
        location: 'Green Valley Farm, CA',
        description: 'Organic seeds planted in prepared soil beds',
        responsible: 'Farm Team A',
        temperature: '22°C',
        conditions: 'Optimal soil moisture'
      },
      {
        stage: 'Growth Monitoring',
        date: '2024-11-20',
        location: 'Green Valley Farm, CA',
        description: 'Regular monitoring and organic pest management',
        responsible: 'John Mitchell',
        temperature: '20°C',
        conditions: 'Healthy growth observed'
      },
      {
        stage: 'Harvest',
        date: '2025-01-10',
        location: 'Green Valley Farm, CA',
        description: 'Hand-picked at peak ripeness',
        responsible: 'Harvest Team',
        temperature: '24°C',
        conditions: 'Perfect weather conditions'
      },
      {
        stage: 'Processing',
        date: '2025-01-11',
        location: 'Valley Fresh Processing, CA',
        description: 'Washing, sorting, and packaging',
        responsible: 'Quality Control Team',
        temperature: '18°C',
        conditions: 'Climate-controlled facility'
      },
      {
        stage: 'Distribution',
        date: '2025-01-12',
        location: 'Regional Distribution Center',
        description: 'Quality inspection and distribution preparation',
        responsible: 'Mike Thompson - QuickLogistics',
        temperature: '4°C',
        conditions: 'Cold chain maintained'
      },
      {
        stage: 'Retail',
        date: '2025-01-13',
        location: 'Fresh Market Co.',
        description: 'Available for consumer purchase',
        responsible: 'Store Manager',
        temperature: '6°C',
        conditions: 'Refrigerated display'
      }
    ],
    nutrition: {
      servingSize: '100g',
      calories: 18,
      nutrients: [
        { name: 'Vitamin C', amount: '13.7mg', dailyValue: '15%' },
        { name: 'Vitamin K', amount: '7.9μg', dailyValue: '7%' },
        { name: 'Folate', amount: '15μg', dailyValue: '4%' },
        { name: 'Potassium', amount: '237mg', dailyValue: '5%' },
        { name: 'Lycopene', amount: '2573μg', dailyValue: '*' }
      ]
    },
    sustainability: {
      carbonFootprint: '0.3 kg CO2 eq',
      waterUsage: '3.3 L per tomato',
      packaging: 'Recyclable cardboard',
      transportDistance: '50 miles',
      organicPractices: [
        'No synthetic pesticides',
        'Crop rotation implemented',
        'Beneficial insect habitat maintained',
        'Composted organic matter used'
      ]
    },
    reviews: [
      {
        id: 1,
        consumer: 'Sarah J.',
        rating: 5,
        comment: 'Absolutely delicious! You can taste the freshness.',
        date: '2025-01-14',
        verified: true
      },
      {
        id: 2,
        consumer: 'Mike R.',
        rating: 4,
        comment: 'Great quality, perfect for salads.',
        date: '2025-01-13',
        verified: true
      }
    ]
  };

  useEffect(() => {
    setProduct(mockProduct);
  }, [productId]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'journey', label: 'Farm to Table', icon: 'MapPin' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Heart' },
    { id: 'sustainability', label: 'Sustainability', icon: 'Leaf' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="glass-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center">
              <Icon name="Package" size={32} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{product.name}</h1>
              <p className="text-text-secondary">{product.variety} • {product.category}</p>
              <p className="text-sm text-text-secondary mt-1">Product ID: {product.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Heart" size="sm">
              Save
            </Button>
            <Button variant="outline" iconName="Share" size="sm">
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <div className="text-lg font-bold text-primary">{product.quality.freshness}%</div>
            <div className="text-sm text-text-secondary">Freshness</div>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-lg">
            <div className="text-lg font-bold text-success">{product.quality.grade}</div>
            <div className="text-sm text-text-secondary">Quality Grade</div>
          </div>
          <div className="text-center p-3 bg-secondary/5 rounded-lg">
            <div className="text-lg font-bold text-secondary">{product.harvest.quantity}</div>
            <div className="text-sm text-text-secondary">Batch Size</div>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-lg">
            <div className="text-lg font-bold text-accent">{product.certifications.length}</div>
            <div className="text-sm text-text-secondary">Certifications</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass-card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                }`}
              >
                <Icon name={tab.icon} size={16} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Farm Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Farm Name:</span>
                      <span className="font-medium">{product.farmer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Location:</span>
                      <span className="font-medium">{product.farmer.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Farm Size:</span>
                      <span className="font-medium">{product.farmer.farmSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Established:</span>
                      <span className="font-medium">{product.farmer.established}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Harvest Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Harvest Date:</span>
                      <span className="font-medium">{new Date(product.harvest.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Method:</span>
                      <span className="font-medium">{product.harvest.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Weather:</span>
                      <span className="font-medium">{product.harvest.weather}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Quantity:</span>
                      <span className="font-medium">{product.harvest.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary mb-3">Quality Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(product.quality).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-gray-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - (typeof value === 'number' ? value : 0) / 100)}`}
                            className="text-primary transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-text-primary">
                            {typeof value === 'number' ? `${value}%` : value}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' ₹1').trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Journey Tab */}
          {activeTab === 'journey' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="font-semibold text-text-primary">Farm to Table Journey</h3>
              <div className="space-y-4">
                {product.journey.map((step, index) => (
                  <div key={index} className="relative flex items-start space-x-4">
                    {index !== product.journey.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    <div className="w-12 h-12 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-text-primary">{step.stage}</h4>
                        <span className="text-sm text-text-secondary">{new Date(step.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{step.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-text-secondary">
                        <div>📍 {step.location}</div>
                        <div>👤 {step.responsible}</div>
                        <div>🌡️ {step.temperature}</div>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">Conditions: {step.conditions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-text-primary">Product Certifications</h3>
              <div className="grid gap-4">
                {product.certifications.map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                          <Icon name="Award" size={20} className="text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">{cert.name}</h4>
                          <p className="text-sm text-text-secondary">{cert.issuer}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                        Valid
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Certificate ID:</span>
                        <p className="font-mono font-medium">{cert.certificateId}</p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Valid Until:</span>
                        <p className="font-medium">{new Date(cert.validUntil).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">Nutritional Information</h3>
                <span className="text-sm text-text-secondary">Per {product.nutrition.servingSize}</span>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{product.nutrition.calories}</div>
                  <div className="text-sm text-text-secondary">Calories</div>
                </div>
              </div>

              <div className="space-y-3">
                {product.nutrition.nutrients.map((nutrient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="font-medium text-text-primary">{nutrient.name}</span>
                    <div className="text-right">
                      <div className="font-medium text-text-primary">{nutrient.amount}</div>
                      <div className="text-sm text-text-secondary">{nutrient.dailyValue} DV</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sustainability Tab */}
          {activeTab === 'sustainability' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="font-semibold text-text-primary">Environmental Impact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Leaf" size={20} className="text-success" />
                      <span className="font-medium text-text-primary">Carbon Footprint</span>
                    </div>
                    <p className="text-2xl font-bold text-success">{product.sustainability.carbonFootprint}</p>
                  </div>

                  <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Droplets" size={20} className="text-secondary" />
                      <span className="font-medium text-text-primary">Water Usage</span>
                    </div>
                    <p className="text-2xl font-bold text-secondary">{product.sustainability.waterUsage}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">Organic Practices</h4>
                    <ul className="space-y-1">
                      {product.sustainability.organicPractices.map((practice, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name="Check" size={14} className="text-success" />
                          <span>{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">Consumer Reviews</h3>
                <Button variant="outline" iconName="Plus" size="sm">
                  Add Review
                </Button>
              </div>

              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-text-primary">{review.consumer}</span>
                        {review.verified && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                            <Icon name="CheckCircle" size={10} className="mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review.rating ? 'text-accent fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{review.comment}</p>
                    <p className="text-xs text-text-secondary">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
