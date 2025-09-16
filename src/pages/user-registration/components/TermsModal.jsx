import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-floating max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">Terms and Conditions</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">1. Acceptance of Terms</h3>
            <p className="text-text-secondary leading-relaxed">
              By creating an account with AgriTrace, you agree to be bound by these Terms and Conditions. 
              These terms govern your use of our agricultural supply chain traceability platform and all 
              related services provided through our website and mobile applications.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">2. User Responsibilities</h3>
            <div className="space-y-2 text-text-secondary">
              <p>• Provide accurate and truthful information during registration</p>
              <p>• Maintain the confidentiality of your account credentials</p>
              <p>• Comply with all applicable laws and regulations</p>
              <p>• Use the platform only for legitimate agricultural business purposes</p>
              <p>• Report any suspicious activities or security breaches immediately</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">3. Data Privacy and Security</h3>
            <p className="text-text-secondary leading-relaxed">
              We are committed to protecting your personal and business data. All information collected 
              through the platform is encrypted and stored securely. We will never share your data with 
              third parties without your explicit consent, except as required by law or for platform 
              functionality (such as supply chain tracking).
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">4. Platform Usage</h3>
            <div className="space-y-2 text-text-secondary">
              <p>• The platform is provided "as is" without warranties of any kind</p>
              <p>• We reserve the right to modify or discontinue services with notice</p>
              <p>• Users are responsible for maintaining compatible devices and internet connectivity</p>
              <p>• Misuse of the platform may result in account suspension or termination</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">5. Compliance and Regulations</h3>
            <p className="text-text-secondary leading-relaxed">
              All users must comply with local, state, and federal regulations regarding agricultural 
              practices, food safety, and supply chain management. Regulatory users have additional 
              responsibilities to ensure accurate reporting and compliance monitoring.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">6. Limitation of Liability</h3>
            <p className="text-text-secondary leading-relaxed">
              AgriTrace shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from the use of our platform. Our total liability is limited to the 
              amount paid for services in the preceding 12 months.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-text-primary mb-3">7. Contact Information</h3>
            <p className="text-text-secondary leading-relaxed">
              For questions about these terms, please contact us at legal@agritrace.com or 
              call our support team at +91 84688 29368.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-muted/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Last updated: September 13, 2025
            </p>
            <Button variant="default" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;