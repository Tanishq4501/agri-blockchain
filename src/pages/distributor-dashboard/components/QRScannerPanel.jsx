import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScannerPanel = ({ onScanSuccess, scannedProduct }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);

  // Mock products that can be "scanned"
  const mockProducts = [
    {
      id: 'TOM-2025-001',
      name: 'Organic Tomatoes',
      farmer: 'Green Valley Farm',
      harvestDate: '2025-01-10',
      quantity: '500 kg',
      location: 'California, USA',
      status: 'Ready for Pickup'
    },
    {
      id: 'CAR-2025-002',
      name: 'Fresh Carrots',
      farmer: 'Sunset Farms',
      harvestDate: '2025-01-08',
      quantity: '300 kg',
      location: 'Oregon, USA',
      status: 'In Transit'
    }
  ];

  const handleScanClick = () => {
    setIsScanning(true);
    setScanAnimation(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const randomProduct = mockProducts?.[Math.floor(Math.random() * mockProducts?.length)];
      onScanSuccess?.(randomProduct);
      setIsScanning(false);
      setScanAnimation(false);
    }, 2500);
  };

  const handleManualEntry = () => {
    // Simulate manual product entry
    const manualProduct = {
      id: 'MAN-' + Date.now(),
      name: 'Manual Entry Product',
      farmer: 'Unknown Farm',
      harvestDate: new Date()?.toISOString()?.split('T')?.[0],
      quantity: '100 kg',
      location: 'Manual Location',
      status: 'Manually Entered'
    };
    onScanSuccess?.(manualProduct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">
          Product Scanner
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-sm text-text-secondary">
            {isScanning ? 'Scanning...' : 'Ready'}
          </span>
        </div>
      </div>
      {/* Scanner Placeholder */}
      <motion.div 
        className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-8 mb-6"
        animate={scanAnimation ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, repeat: scanAnimation ? Infinity : 0 }}
      >
        <div className="text-center">
          <motion.div
            animate={isScanning ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: isScanning ? Infinity : 0, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="QrCode" size={40} color="white" strokeWidth={2} />
          </motion.div>
          <h4 className="text-lg font-medium text-text-primary mb-2">
            QR Code Scanner
          </h4>
          <p className="text-text-secondary mb-6">
            Position QR code within the scanner area or click scan to simulate
          </p>

          {/* Scanning Animation Overlay */}
          {isScanning && (
            <motion.div
              initial={{ height: 0, opacity: 0.5 }}
              animate={{ height: '100%', opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-200/30 to-transparent rounded-2xl"
            />
          )}
        </div>
      </motion.div>
      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          variant="default"
          className="w-full"
          iconName="Scan"
          iconPosition="left"
          iconSize={18}
          onClick={handleScanClick}
          disabled={isScanning}
        >
          {isScanning ? 'Scanning...' : 'Scan QR Code'}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          iconName="Edit"
          iconPosition="left"
          iconSize={16}
          onClick={handleManualEntry}
          disabled={isScanning}
        >
          Manual Entry
        </Button>
      </div>
      {/* Scanned Product Display */}
      {scannedProduct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-green-800 mb-1">
                {scannedProduct?.name}
              </h4>
              <p className="text-sm text-green-600 mb-2">
                ID: {scannedProduct?.id}
              </p>
              <div className="space-y-1 text-xs text-green-700">
                <p>Farmer: {scannedProduct?.farmer}</p>
                <p>Quantity: {scannedProduct?.quantity}</p>
                <p>Status: {scannedProduct?.status}</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>
      )}
      {/* Scan History */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Recent Scans
        </h4>
        <div className="space-y-2">
          {mockProducts?.slice(0, 2)?.map((product) => (
            <motion.div
              key={product?.id}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {product?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {product?.id} • {product?.quantity}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QRScannerPanel;