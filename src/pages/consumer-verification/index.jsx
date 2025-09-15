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
import LanguageToggle from '../../components/ui/LanguageToggle';
import { useLanguage } from '../../utils/translations';

const ConsumerVerification = () => {
  const { isHindi, toggleLanguage, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [scannedProduct, setScannedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock product database
  const mockProducts = {
    'AGT-MAN-2025-001': {
      code: 'AGT-MAN-2025-001',
      name: 'Organic Alphonso Mangoes (जैविक आम)',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1546470427-e5ac89cd0b9b?w=100',
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100',
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100'
      ],
      farmer: {
        name: 'Ramesh Patel (रमेश पटेल)',
        location: 'Ratnagiri, Maharashtra',
        farmSize: '15 acres'
      },
      harvestDate: 'January 8, 2025',
      bestBefore: 'January 22, 2025',
      storageTemp: '12-15°C',
      batchSize: '200 kg',
      certifications: ['FSSAI Organic', 'GI Tag', 'Export Quality', 'Fair Trade'],
      nutrition: {
        calories: '60 per 100g',
        vitamin_c: '36.4mg',
        fiber: '1.6g',
        vitamin_a: '54μg'
      }
    },
    'AGT-RIC-2025-002': {
      code: 'AGT-RIC-2025-002',
      name: 'Organic Basmati Rice (जैविक बासमती)',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100',
        'https://images.unsplash.com/photo-1582515073490-39981397c445?w=100'
      ],
      farmer: {
        name: 'Gurpreet Singh (गुरप्रीत सिंह)',
        location: 'Amritsar, Punjab',
        farmSize: '25 acres'
      },
      harvestDate: 'January 5, 2025',
      bestBefore: 'January 5, 2026',
      storageTemp: '15-20°C',
      batchSize: '500 kg',
      certifications: ['FSSAI Organic', 'Export Grade', 'Fair Trade'],
      nutrition: {
        calories: '345 per 100g',
        protein: '7.1g',
        carbs: '78g',
        fiber: '0.4g'
      }
    },
    'AGT-TUR-2025-003': {
      code: 'AGT-TUR-2025-003',
      name: 'Organic Turmeric (जैविक हल्दी)',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1582515073490-39981397c445?w=100',
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100'
      ],
      farmer: {
        name: 'Lakshmi Devi (लक्ष्मी देवी)',
        location: 'Erode, Tamil Nadu',
        farmSize: '10 acres'
      },
      harvestDate: 'December 28, 2024',
      bestBefore: 'December 28, 2026',
      storageTemp: '15-25°C',
      batchSize: '100 kg',
      certifications: ['FSSAI Organic', 'Export Quality', 'Ayurvedic Grade'],
      nutrition: {
        calories: '312 per 100g',
        curcumin: '3.14%',
        fiber: '21g',
        iron: '41.4mg'
      }
    },
    'AGT-TEA-2025-004': {
      code: 'AGT-TEA-2025-004',
      name: 'Organic Darjeeling Tea (जैविक दार्जिलिंग चाय)',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      gallery: [
        'https://images.unsplash.com/photo-1582515073490-39981397c445?w=100'
      ],
      farmer: {
        name: 'Pemba Sherpa (पेम्बा शेर्पा)',
        location: 'Darjeeling, West Bengal',
        farmSize: '20 acres'
      },
      harvestDate: 'January 3, 2025',
      bestBefore: 'January 3, 2027',
      storageTemp: '15-25°C',
      batchSize: '50 kg',
      certifications: ['FSSAI Organic', 'GI Tag', 'Fair Trade', 'Rainforest Alliance'],
      nutrition: {
        calories: '2 per cup',
        antioxidants: 'High',
        caffeine: '50mg per cup',
        tannins: 'Medium'
      }
    }
  };

  // Mock timeline data
  const mockTimeline = [
    {
      stage: 'Harvested (फसल काटी)',
      date: 'Jan 8, 2025',
      time: '06:30 AM',
      location: 'Patel Farm, Ratnagiri, Maharashtra',
      handler: 'Ramesh Patel (रमेश पटेल)',
      temperature: '28°C',
      notes: 'Fresh harvest at optimal ripeness. Premium Alphonso grade',
      completed: true
    },
    {
      stage: 'Processed (प्रसंस्करण)',
      date: 'Jan 8, 2025',
      time: '10:15 AM',
      location: 'Maharashtra Processing Center',
      handler: 'Processing Team Alpha',
      temperature: '15°C',
      notes: 'Washed, sorted, and graded according to FSSAI organic standards',
      completed: true
    },
    {
      stage: 'Packaged (पैकेजिंग)',
      date: 'Jan 8, 2025',
      time: '02:30 PM',
      location: 'Maharashtra Processing Center',
      handler: 'Packaging Unit 3',
      temperature: '15°C',
      notes: 'Sealed in eco-friendly packaging with QR tracking codes',
      completed: true
    },
    {
      stage: 'Shipped (भेजा गया)',
      date: 'Jan 9, 2025',
      time: '05:00 AM',
      location: 'Mumbai Distribution Hub',
      handler: 'Bharti Logistics',
      temperature: '12-15°C',
      notes: 'Loaded into temperature-controlled truck for Mumbai delivery',
      completed: true
    },
    {
      stage: 'Distributed (वितरण)',
      date: 'Jan 10, 2025',
      time: '08:45 AM',
      location: 'Mumbai Regional Distribution Center',
      handler: 'Distribution Team Mumbai',
      temperature: '12-15°C',
      notes: 'Sorted for retail delivery routes across Mumbai',
      completed: true
    },
    {
      stage: 'Retail (खुदरा)',
      date: 'Jan 11, 2025',
      time: '06:00 AM',
      location: 'Reliance Fresh Bandra',
      handler: 'Store Receiving Team',
      temperature: '15°C',
      notes: 'Received and placed in fresh produce display section',
      completed: true
    },
    {
      stage: 'Delivered (वितरित)',
      date: 'Pending',
      time: 'Pending',
      location: 'Customer Location',
      handler: 'Pending',
      temperature: 'N/A',
      notes: 'Awaiting customer purchase (ग्राहक खरीद का इंतजार)',
      completed: false
    }
  ];

  // Mock trust indicators
  const mockTrustData = {
    trustScore: 96,
    verificationBadges: [
      { type: 'Verified (सत्यापित)', verifiedDate: 'Jan 8, 2025' },
      { type: 'Authentic (प्रामाणिक)', verifiedDate: 'Jan 8, 2025' },
      { type: 'Fresh (ताज़ा)', verifiedDate: 'Jan 11, 2025' },
      { type: 'Premium Quality', verifiedDate: 'Jan 8, 2025' },
      { type: 'Traceable (प्रलेखनीय)', verifiedDate: 'Jan 8, 2025' }
    ],
    complianceCertifications: [
      { name: 'FSSAI Approved', expiryDate: 'Dec 31, 2025' },
      { name: 'FSSAI Organic', expiryDate: 'Jun 15, 2025' },
      { name: 'GI Tag Certified', expiryDate: 'Permanent' },
      { name: 'Export Quality', expiryDate: 'Aug 10, 2025' }
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
            <div className="flex justify-center mb-4">
              <LanguageToggle isHindi={isHindi} onToggle={toggleLanguage} />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              {isHindi ? 'उत्पाद सत्यापन' : 'Product Verification'}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {isHindi ? 'अपने कृषि उत्पादों की प्रामाणिकता को सत्यापित करें और भारतीय खेतों से आपकी मेज तक की पूरी यात्रा का पता लगाएं' : 'Verify the authenticity and trace the complete journey of your agricultural products from Indian farms to your table'}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <Icon name="Search" size={32} color="white" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">{isHindi ? 'उत्पाद सत्यापित कर रहे हैं...' : 'Verifying Product...'}</h2>
              <p className="text-text-secondary">{isHindi ? 'कृपया प्रतीक्षा करें जबकि हम आपके उत्पाद को प्रमाणित करते हैं' : 'Please wait while we authenticate your product'}</p>
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