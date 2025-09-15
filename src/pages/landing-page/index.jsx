import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import TrustSection from './components/TrustSection';
import FooterSection from './components/FooterSection';
import LanguageToggle from '../../components/ui/LanguageToggle';
import GeminiToggle from '../../components/ui/GeminiToggle';
import { useLanguage } from '../../utils/translations';
import { useGeminiTranslation } from '../../hooks/useGeminiTranslation';

const LandingPage = () => {
  const { isHindi, toggleLanguage, t } = useLanguage();
  const { translateText, isGeminiEnabled, toggleGemini, isTranslating } = useGeminiTranslation();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>AgriTrace - Agricultural Supply Chain Transparency Platform</title>
        <meta 
          name="description" 
          content="Track your food from farm to fork with AgriTrace. Complete agricultural supply chain transparency with QR code verification, blockchain security, and real-time tracking for farmers, distributors, consumers, and retailers." 
        />
        <meta 
          name="keywords" 
          content="agricultural supply chain, food traceability, QR code verification, blockchain agriculture, farm to fork tracking, food safety, supply chain transparency" 
        />
        <meta name="author" content="AgriTrace" />
        <meta property="og:title" content="AgriTrace - Agricultural Supply Chain Transparency Platform" />
        <meta 
          property="og:description" 
          content="Complete agricultural supply chain transparency with QR code verification. Ensure authenticity, build trust, and connect consumers directly with farmers." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agritrace.com" />
        <meta property="og:image" content="https://agritrace.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AgriTrace - Agricultural Supply Chain Transparency" />
        <meta 
          name="twitter:description" 
          content="Track your food from farm to fork with complete supply chain transparency and QR code verification." 
        />
        <link rel="canonical" href="https://agritrace.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Public Header */}
        <PublicHeader />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Interactive Demo Section */}
          <DemoSection />

          {/* Trust & Security Section */}
          <TrustSection />
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
};

export default LandingPage;