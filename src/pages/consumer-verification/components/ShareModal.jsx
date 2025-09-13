import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareModal = ({ isOpen, onClose, product }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const shareUrl = `${window.location?.origin}/consumer-verification?code=${product?.code}`;
  const shareText = `I just verified the authenticity of ${product?.name} from ${product?.farmer?.name}'s farm using AgriTrace! 🌱 #AgriTrace #FarmToTable #Verified`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
    onClose();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Verified Product: ${product?.name}`,
          text: shareText,
          url: shareUrl
        });
        onClose();
      } catch (err) {
        console.error('Native share failed:', err);
      }
    }
  };

  const socialPlatforms = [
    { name: 'Twitter', icon: 'Twitter', color: 'bg-blue-500 hover:bg-blue-600', key: 'twitter' },
    { name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700', key: 'facebook' },
    { name: 'LinkedIn', icon: 'Linkedin', color: 'bg-blue-700 hover:bg-blue-800', key: 'linkedin' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: 'bg-green-500 hover:bg-green-600', key: 'whatsapp' },
    { name: 'Telegram', icon: 'Send', color: 'bg-blue-400 hover:bg-blue-500', key: 'telegram' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-floating max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">Share Verification</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Preview */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" size={20} color="white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{product?.name}</h3>
                <p className="text-sm text-text-secondary">Verified Product</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              From {product?.farmer?.name}'s farm in {product?.farmer?.location}
            </p>
          </div>

          {/* Share Text Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Share Message</label>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm text-text-secondary">{shareText}</p>
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Share Link</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-muted border border-gray-300 rounded-lg text-sm font-mono"
              />
              <Button
                variant={copied ? "success" : "outline"}
                onClick={handleCopyLink}
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
                iconSize={16}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Native Share (if supported) */}
          {navigator.share && (
            <Button
              variant="default"
              fullWidth
              onClick={handleNativeShare}
              iconName="Share"
              iconPosition="left"
              iconSize={18}
            >
              Share via Device
            </Button>
          )}

          {/* Social Media Platforms */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-text-primary">Share on Social Media</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms?.map((platform) => (
                <button
                  key={platform?.key}
                  onClick={() => handleSocialShare(platform?.key)}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white transition-colors duration-200 ${platform?.color}`}
                >
                  <Icon name={platform?.icon} size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">{platform?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* QR Code for Easy Sharing */}
          <div className="text-center space-y-3">
            <h3 className="text-sm font-medium text-text-primary">QR Code</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-text-secondary" />
              </div>
            </div>
            <p className="text-xs text-text-secondary">
              Others can scan this QR code to verify the product
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-muted/50">
          <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
            <Icon name="Shield" size={14} className="text-primary" />
            <span>Powered by AgriTrace - Trusted Supply Chain Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;