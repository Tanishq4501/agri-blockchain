import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import QRScanner from './components/QRScanner';
import ProductInfo from './components/ProductInfo';
import ProductTimeline from './components/ProductTimeline';
import TrustIndicators from './components/TrustIndicators';
import ShareModal from './components/ShareModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConsumerVerification = () => {
  const [searchParams] = useSearchParams();
  const [scannedProduct, setScannedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock product database
  const mockProducts = {
    'AGT-TOM-2025-001': {
      code: 'AGT-TOM-2025-001',
      name: 'Organic Cherry Tomatoes',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1546470427-e5ac89cd0b9b?w=100',
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100',
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100'
      ],
      farmer: {
        name: 'Maria Rodriguez',
        location: 'Salinas Valley, California',
        farmSize: '25 acres'
      },
      harvestDate: 'January 8, 2025',
      bestBefore: 'January 22, 2025',
      storageTemp: '2-4°C',
      batchSize: '500 lbs',
      certifications: ['Organic', 'Non-GMO', 'Fair Trade', 'Sustainable'],
      nutrition: {
        calories: '18 per 100g',
        vitamin_c: '13.7mg',
        fiber: '1.2g',
        potassium: '237mg'
      }
    },
    'AGT-CAR-2025-002': {
      code: 'AGT-CAR-2025-002',
      name: 'Fresh Organic Carrots',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100',
        'https://images.unsplash.com/photo-1582515073490-39981397c445?w=100'
      ],
      farmer: {
        name: 'John Thompson',
        location: 'Bakersfield, California',
        farmSize: '40 acres'
      },
      harvestDate: 'January 5, 2025',
      bestBefore: 'February 5, 2025',
      storageTemp: '0-2°C',
      batchSize: '800 lbs',
      certifications: ['Organic', 'Non-GMO', 'Sustainable'],
      nutrition: {
        calories: '41 per 100g',
        vitamin_a: '835μg',
        fiber: '2.8g',
        beta_carotene: '8285μg'
      }
    },
    'AGT-POT-2025-003': {
      code: 'AGT-POT-2025-003',
      name: 'Russet Potatoes',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1582515073490-39981397c445?w=100',
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100'
      ],
      farmer: {
        name: 'Sarah Mitchell',
        location: 'Idaho Falls, Idaho',
        farmSize: '60 acres'
      },
      harvestDate: 'December 28, 2024',
      bestBefore: 'March 28, 2025',
      storageTemp: '4-7°C',
      batchSize: '1200 lbs',
      certifications: ['Non-GMO', 'Sustainable'],
      nutrition: {
        calories: '77 per 100g',
        vitamin_c: '19.7mg',
        potassium: '425mg',
        fiber: '2.2g'
      }
    },
    'AGT-ONI-2025-004': {
      code: 'AGT-ONI-2025-004',
      name: 'Sweet Yellow Onions',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1582515073490-39981397c445?w=100'
      ],
      farmer: {
        name: 'David Chen',
        location: 'Walla Walla, Washington',
        farmSize: '35 acres'
      },
      harvestDate: 'January 3, 2025',
      bestBefore: 'April 3, 2025',
      storageTemp: '0-4°C',
      batchSize: '900 lbs',
      certifications: ['Non-GMO', 'Sustainable', 'Fair Trade'],
      nutrition: {
        calories: '40 per 100g',
        vitamin_c: '7.4mg',
        fiber: '1.7g',
        folate: '19μg'
      }
    }
  };

  // Mock timeline data
  const mockTimeline = [
    {
      stage: 'Harvested',
      date: 'Jan 8, 2025',
      time: '06:30 AM',
      location: 'Rodriguez Farm, Salinas Valley',
      handler: 'Maria Rodriguez',
      temperature: '18°C',
      notes: 'Fresh harvest at optimal ripeness. Quality grade A+',
      completed: true
    },
    {
      stage: 'Processed',
      date: 'Jan 8, 2025',
      time: '10:15 AM',
      location: 'Valley Processing Center',
      handler: 'Processing Team Alpha',
      temperature: '4°C',
      notes: 'Washed, sorted, and packaged according to organic standards',
      completed: true
    },
    {
      stage: 'Packaged',
      date: 'Jan 8, 2025',
      time: '02:30 PM',
      location: 'Valley Processing Center',
      handler: 'Packaging Unit 3',
      temperature: '4°C',
      notes: 'Sealed in biodegradable packaging with QR tracking codes',
      completed: true
    },
    {
      stage: 'Shipped',
      date: 'Jan 9, 2025',
      time: '05:00 AM',
      location: 'Distribution Hub, Fresno',
      handler: 'FreshTrans Logistics',
      temperature: '2-4°C',
      notes: 'Loaded into refrigerated truck for regional distribution',
      completed: true
    },
    {
      stage: 'Distributed',
      date: 'Jan 10, 2025',
      time: '08:45 AM',
      location: 'Regional Distribution Center',
      handler: 'Distribution Team B',
      temperature: '2-4°C',
      notes: 'Sorted for retail delivery routes',
      completed: true
    },
    {
      stage: 'Retail',
      date: 'Jan 11, 2025',
      time: '06:00 AM',
      location: 'FreshMart Store #247',
      handler: 'Store Receiving',
      temperature: '4°C',
      notes: 'Received and placed in refrigerated display',
      completed: true
    },
    {
      stage: 'Delivered',
      date: 'Pending',
      time: 'Pending',
      location: 'Customer Location',
      handler: 'Pending',
      temperature: 'N/A',
      notes: 'Awaiting customer purchase',
      completed: false
    }
  ];

  // Mock trust indicators
  const mockTrustData = {
    trustScore: 94,
    verificationBadges: [
      { type: 'Verified', verifiedDate: 'Jan 8, 2025' },
      { type: 'Authentic', verifiedDate: 'Jan 8, 2025' },
      { type: 'Fresh', verifiedDate: 'Jan 11, 2025' },
      { type: 'Quality', verifiedDate: 'Jan 8, 2025' },
      { type: 'Traceable', verifiedDate: 'Jan 8, 2025' }
    ],
    complianceCertifications: [
      { name: 'FDA Approved', expiryDate: 'Dec 31, 2025' },
      { name: 'USDA Organic', expiryDate: 'Jun 15, 2025' },
      { name: 'HACCP Compliant', expiryDate: 'Mar 20, 2025' },
      { name: 'Fair Trade', expiryDate: 'Aug 10, 2025' }
    ]
  };

  // Check for product code in URL params on component mount
  useEffect(() => {
    const codeFromUrl = searchParams?.get('code');
    if (codeFromUrl) {
      handleScanSuccess(codeFromUrl);
    }
  }, [searchParams]);

  const handleScanSuccess = async (code) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const product = mockProducts?.[code];
      if (product) {
        setScannedProduct(product);
      } else {
        setError(`Product code "${code}" not found. Please check the code and try again.`);
      }
    } catch (err) {
      setError('Failed to verify product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanError = (errorMessage) => {
    setError(errorMessage);
    setScannedProduct(null);
  };

  const handleShare = (product) => {
    setShowShareModal(true);
  };

  const handleNewScan = () => {
    setScannedProduct(null);
    setError(null);
    // Clear URL params
    window.history?.replaceState({}, '', '/consumer-verification');
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Product Verification
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Verify the authenticity and trace the complete journey of your agricultural products from farm to table
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <Icon name="Search" size={32} color="white" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Verifying Product...</h2>
              <p className="text-text-secondary">Please wait while we authenticate your product</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-elevated border border-red-200 p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="AlertCircle" size={32} className="text-red-600" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">Verification Failed</h2>
                <p className="text-text-secondary mb-4">{error}</p>
                <Button
                  variant="outline"
                  onClick={handleNewScan}
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={18}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Scanner Interface */}
          {!scannedProduct && !isLoading && !error && (
            <div className="max-w-md mx-auto">
              <QRScanner
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
              />
            </div>
          )}

          {/* Product Verification Results */}
          {scannedProduct && !isLoading && (
            <div className="space-y-8">
              {/* New Scan Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={handleNewScan}
                  iconName="QrCode"
                  iconPosition="left"
                  iconSize={18}
                >
                  Scan Another Product
                </Button>
              </div>

              {/* Product Information */}
              <ProductInfo
                product={scannedProduct}
                onShare={handleShare}
              />

              {/* Trust Indicators */}
              <TrustIndicators
                trustScore={mockTrustData?.trustScore}
                verificationBadges={mockTrustData?.verificationBadges}
                complianceCertifications={mockTrustData?.complianceCertifications}
              />

              {/* Product Timeline */}
              <ProductTimeline timeline={mockTimeline} />
            </div>
          )}
        </div>
      </main>
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        product={scannedProduct}
      />
    </div>
  );
};

export default ConsumerVerification;