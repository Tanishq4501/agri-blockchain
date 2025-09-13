import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QRScannerPanel = ({ isOpen, onClose, onScanResult }) => {
  const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'manual'
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const mockResult = {
        success: true,
        productId: 'TOM-2025-001',
        productName: 'Organic Tomatoes',
        farm: 'Green Valley Farm',
        authenticity: 'authentic',
        verificationStatus: 'verified',
        scanTime: new Date()?.toISOString()
      };
      setScanResult(mockResult);
      setIsScanning(false);
      if (onScanResult) {
        onScanResult(mockResult);
      }
    }, 3000);
  };

  const handleManualSubmit = (e) => {
    e?.preventDefault();
    if (manualCode?.trim()) {
      const mockResult = {
        success: true,
        productId: manualCode?.trim(),
        productName: 'Manual Entry Product',
        farm: 'Unknown Farm',
        authenticity: 'pending',
        verificationStatus: 'pending',
        scanTime: new Date()?.toISOString()
      };
      setScanResult(mockResult);
      if (onScanResult) {
        onScanResult(mockResult);
      }
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setManualCode('');
    setIsScanning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-floating max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="QrCode" size={20} className="text-primary" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">QR Scanner</h2>
              <p className="text-sm text-text-secondary">Verify product authenticity</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Scan Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setScanMode('camera')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                scanMode === 'camera' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Camera" size={16} className="inline mr-2" strokeWidth={2} />
              Camera Scan
            </button>
            <button
              onClick={() => setScanMode('manual')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                scanMode === 'manual' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Keyboard" size={16} className="inline mr-2" strokeWidth={2} />
              Manual Entry
            </button>
          </div>

          {/* Camera Scan Mode */}
          {scanMode === 'camera' && (
            <div className="space-y-4">
              {!scanResult && (
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {isScanning ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-sm text-text-secondary">Scanning QR code...</p>
                      <div className="absolute inset-4 border-2 border-primary rounded-xl animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="QrCode" size={64} className="text-gray-400 mx-auto mb-4" strokeWidth={1} />
                      <p className="text-sm text-text-secondary mb-4">Position QR code within the frame</p>
                      <Button
                        variant="default"
                        iconName="Camera"
                        iconPosition="left"
                        iconSize={18}
                        onClick={handleStartScan}
                      >
                        Start Scanning
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Manual Entry Mode */}
          {scanMode === 'manual' && !scanResult && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <Input
                label="Product Code"
                type="text"
                placeholder="Enter QR code or product ID"
                value={manualCode}
                onChange={(e) => setManualCode(e?.target?.value)}
                description="Enter the product code manually if camera scanning is not available"
                required
              />
              <Button
                type="submit"
                variant="default"
                fullWidth
                iconName="Search"
                iconPosition="left"
                iconSize={18}
                disabled={!manualCode?.trim()}
              >
                Verify Product
              </Button>
            </form>
          )}

          {/* Scan Result */}
          {scanResult && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-text-primary">Scan Result</h3>
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    scanResult?.authenticity === 'authentic' ?'bg-success/10 text-success border-success/20'
                      : scanResult?.authenticity === 'suspicious' ?'bg-warning/10 text-warning border-warning/20' :'bg-gray-100 text-gray-600 border-gray-200'
                  }`}>
                    <Icon 
                      name={
                        scanResult?.authenticity === 'authentic' ? 'Shield' :
                        scanResult?.authenticity === 'suspicious' ? 'AlertTriangle' : 'HelpCircle'
                      } 
                      size={12} 
                      className="mr-1" 
                      strokeWidth={2} 
                    />
                    {scanResult?.authenticity === 'authentic' ? 'Authentic' :
                     scanResult?.authenticity === 'suspicious' ? 'Suspicious' : 'Pending'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Product ID:</span>
                    <span className="text-sm font-medium text-text-primary">{scanResult?.productId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Product:</span>
                    <span className="text-sm font-medium text-text-primary">{scanResult?.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Farm:</span>
                    <span className="text-sm font-medium text-text-primary">{scanResult?.farm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Scan Time:</span>
                    <span className="text-sm font-medium text-text-primary">
                      {new Date(scanResult.scanTime)?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {scanResult?.authenticity === 'suspicious' && (
                  <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" strokeWidth={2} />
                      <div>
                        <p className="text-sm font-medium text-warning">Verification Warning</p>
                        <p className="text-xs text-warning/80 mt-1">
                          This product shows suspicious indicators. Please verify with supplier or contact support.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleReset}
                >
                  Scan Another
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Check"
                  iconPosition="left"
                  iconSize={16}
                  onClick={onClose}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScannerPanel;