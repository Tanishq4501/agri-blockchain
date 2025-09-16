import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'manual'
  const [cameraError, setCameraError] = useState(null);
  const [hasCamera, setHasCamera] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const qrScannerRef = useRef(null);

  const startCamera = async () => {
    try {
      setIsScanning(true);
      setCameraError(null);
      
      // Check if camera is available
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        throw new Error('No camera found on this device');
      }

      if (videoRef.current) {
        // Initialize QR Scanner
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            console.log('QR Code detected:', result.data);
            onScanSuccess(result.data);
            stopCamera();
          },
          {
            onDecodeError: (error) => {
              // Silently handle decode errors - they're normal when no QR code is visible
              console.debug('QR decode error (normal):', error);
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment'
          }
        );

        await qrScannerRef.current.start();
        console.log('Camera started successfully');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Failed to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Camera permission denied. Please allow camera access and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
        setHasCamera(false);
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported in this browser.';
      } else if (error.message.includes('No camera found')) {
        errorMessage += 'No camera detected on this device.';
        setHasCamera(false);
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      setCameraError(errorMessage);
      onScanError?.(errorMessage);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualSubmit = (e) => {
    e?.preventDefault();
    if (manualCode?.trim()) {
      onScanSuccess(manualCode?.trim());
      setManualCode('');
    }
  };

  const simulateQRScan = () => {
    // Simulate QR code scan for demo purposes
    const mockQRCodes = [
      'CROP-2025-001-ORGANIC-CARROTS',
      'AGT-TOM-2025-001',
      'AGT-CAR-2025-002',
      'AGT-POT-2025-003',
      'AGT-ONI-2025-004'
    ];
    const randomCode = mockQRCodes?.[Math.floor(Math.random() * mockQRCodes?.length)];
    setTimeout(() => {
      onScanSuccess(randomCode);
      stopCamera();
    }, 2000);
  };

  useEffect(() => {
    // Check camera availability on mount
    const checkCamera = async () => {
      try {
        const cameraAvailable = await QrScanner.hasCamera();
        setHasCamera(cameraAvailable);
        if (!cameraAvailable) {
          setCameraError('No camera detected on this device. Please use manual entry.');
        }
      } catch (error) {
        console.error('Error checking camera:', error);
        setHasCamera(false);
        setCameraError('Unable to detect camera. Please use manual entry.');
      }
    };

    checkCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-elevated border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
          <Icon name="QrCode" size={32} color="white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Verify Product</h2>
        <p className="text-text-secondary">
          Scan QR code or enter product code to verify authenticity
        </p>
      </div>
      {/* Mode Toggle */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <button
          onClick={() => setScanMode('camera')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            scanMode === 'camera' ?'bg-white text-primary shadow-soft' :'text-text-secondary hover:text-primary'
          }`}
        >
          <Icon name="Camera" size={16} className="inline mr-2" />
          Camera Scan
        </button>
        <button
          onClick={() => setScanMode('manual')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            scanMode === 'manual' ?'bg-white text-primary shadow-soft' :'text-text-secondary hover:text-primary'
          }`}
        >
          <Icon name="Keyboard" size={16} className="inline mr-2" />
          Manual Entry
        </button>
      </div>
      {scanMode === 'camera' ? (
        <div className="space-y-4">
          {/* Camera Error Display */}
          {cameraError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <Icon name="AlertCircle" size={20} color="#dc2626" className="mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-1">Camera Issue</h4>
                  <p className="text-sm text-red-700">{cameraError}</p>
                  {!hasCamera && (
                    <p className="text-xs text-red-600 mt-2">
                      Try switching to "Manual Entry" tab to enter codes directly.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Camera Scanner */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-square max-w-sm mx-auto">
            {isScanning ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                    Position QR code within frame
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <Icon name="Camera" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Camera not active</p>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex justify-center space-x-3">
            {!isScanning ? (
              <Button
                variant="default"
                onClick={startCamera}
                iconName="Camera"
                iconPosition="left"
                iconSize={18}
                disabled={!hasCamera}
              >
                {hasCamera ? 'Start Camera' : 'Camera Not Available'}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={stopCamera}
                  iconName="X"
                  iconPosition="left"
                  iconSize={18}
                >
                  Stop Camera
                </Button>
                <Button
                  variant="success"
                  onClick={simulateQRScan}
                  iconName="Scan"
                  iconPosition="left"
                  iconSize={18}
                >
                  Simulate Scan
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Product Code
              </label>
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e?.target?.value)}
                placeholder="Enter product code (e.g., AGT-TOM-2025-001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center font-mono text-lg"
              />
              <p className="text-xs text-text-secondary mt-2 text-center">
                Find the product code on packaging or receipt
              </p>
            </div>
            <Button
              type="submit"
              variant="default"
              fullWidth
              disabled={!manualCode?.trim()}
              iconName="Search"
              iconPosition="left"
              iconSize={18}
            >
              Verify Product
            </Button>
          </form>

          {/* Sample Codes for Demo */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm font-medium text-text-primary mb-2">Sample codes to try:</p>
            <div className="grid grid-cols-2 gap-2">
              {['CROP-2025-001-ORGANIC-CARROTS', 'AGT-TOM-2025-001', 'AGT-CAR-2025-002', 'AGT-POT-2025-003']?.map((code) => (
                <button
                  key={code}
                  onClick={() => setManualCode(code)}
                  className="text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-primary hover:text-white transition-colors duration-200 font-mono"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;