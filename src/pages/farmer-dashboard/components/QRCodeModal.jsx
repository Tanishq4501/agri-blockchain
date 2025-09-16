import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TranslatableText from '../../../components/ui/TranslatableText';

const QRCodeModal = ({ isOpen, onClose, productData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const qrRef = useRef(null);

  if (!isOpen) return null;

  // Mock QR code data - in real app, this would be generated based on productData
  const qrCodeData = {
    productId: productData?.id || 'PRD-2025-001',
    farmerId: 'FARM-001',
    productName: productData?.cropType || 'Organic Tomatoes',
    quantity: productData?.quantity || '500',
    unit: productData?.unit || 'kg',
    harvestDate: productData?.harvestDate || '2025-01-10',
    location: productData?.location || 'Green Valley Farm, California',
    verificationUrl: `https://agritrace.com/verify/${productData?.id || 'PRD-2025-001'}`
  };

  // Generate QR code SVG (simplified representation)
  const generateQRCodeSVG = () => {
    return (
      <svg width="200" height="200" viewBox="0 0 200 200" className="border border-gray-300 rounded-lg">
        {/* QR Code pattern simulation */}
        <rect width="200" height="200" fill="white" />
        
        {/* Corner markers */}
        <rect x="10" y="10" width="30" height="30" fill="black" />
        <rect x="160" y="10" width="30" height="30" fill="black" />
        <rect x="10" y="160" width="30" height="30" fill="black" />
        
        {/* Data pattern simulation */}
        {Array.from({ length: 15 }, (_, i) => (
          <g key={i}>
            {Array.from({ length: 15 }, (_, j) => (
              <rect
                key={`${i}-${j}`}
                x={50 + j * 8}
                y={50 + i * 8}
                width="6"
                height="6"
                fill={Math.random() > 0.5 ? "black" : "white"}
              />
            ))}
          </g>
        ))}
        
        {/* Center logo area */}
        <rect x="85" y="85" width="30" height="30" fill="white" stroke="black" strokeWidth="2" />
        <circle cx="100" cy="100" r="8" fill="#16A34A" />
      </svg>
    );
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      // Create download link
      const canvas = document.createElement('canvas');
      const ctx = canvas?.getContext('2d');
      canvas.width = 400;
      canvas.height = 500;
      
      // White background
      ctx.fillStyle = 'white';
      ctx?.fillRect(0, 0, 400, 500);
      
      // Add text
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx?.fillText(qrCodeData?.productName, 200, 30);
      ctx?.fillText(`ID: ${qrCodeData?.productId}`, 200, 50);
      
      // Create download
      const link = document.createElement('a');
      link.download = `QR-${qrCodeData?.productId}.png`;
      link.href = canvas?.toDataURL();
      link?.click();
      
      setIsDownloading(false);
    }, 2000);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Create print content
    const printContent = `
      <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
        <h2>${qrCodeData?.productName}</h2>
        <p><strong>Product ID:</strong> ${qrCodeData?.productId}</p>
        <p><strong>Quantity:</strong> ${qrCodeData?.quantity} ${qrCodeData?.unit}</p>
        <p><strong>Harvest Date:</strong> ${qrCodeData?.harvestDate}</p>
        <p><strong>Location:</strong> ${qrCodeData?.location}</p>
        <div style="margin: 20px 0;">
          ${qrRef?.current?.innerHTML || ''}
        </div>
        <p><strong>Scan to verify authenticity</strong></p>
        <p style="font-size: 12px; color: #666;">
          Verification URL: ${qrCodeData?.verificationUrl}
        </p>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow?.document?.write(`
      <html>
        <head>
          <title>QR Code - ${qrCodeData?.productId}</title>
          <style>
            body { margin: 0; padding: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow?.document?.close();
    printWindow?.focus();
    
    setTimeout(() => {
      printWindow?.print();
      printWindow?.close();
      setIsPrinting(false);
    }, 500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(qrCodeData?.verificationUrl);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-floating max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
              <Icon name="QrCode" size={20} color="white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">QR Code Generated</h2>
              <p className="text-sm text-text-secondary">Product verification code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <TranslatableText as="h3" className="font-semibold text-text-primary" text={qrCodeData?.productName} />
            <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
              <div>
                <span className="font-medium">ID:</span> {qrCodeData?.productId}
              </div>
              <div>
                <span className="font-medium">Quantity:</span> {qrCodeData?.quantity} {qrCodeData?.unit}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Harvest:</span> {qrCodeData?.harvestDate}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Location:</span> {qrCodeData?.location}
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="text-center space-y-4">
            <div ref={qrRef} className="flex justify-center">
              {generateQRCodeSVG()}
            </div>
            <p className="text-sm text-text-secondary">
              Scan this QR code to verify product authenticity
            </p>
          </div>

          {/* Verification URL */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Verification URL:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={qrCodeData?.verificationUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-muted"
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                iconSize={16}
                onClick={handleCopyUrl}
              >
                Copy
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              fullWidth
              loading={isDownloading}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              onClick={handleDownload}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
            <Button
              variant="default"
              fullWidth
              loading={isPrinting}
              iconName="Printer"
              iconPosition="left"
              iconSize={16}
              onClick={handlePrint}
            >
              {isPrinting ? 'Printing...' : 'Print'}
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              fullWidth
              iconName="Share"
              iconPosition="left"
              iconSize={16}
            >
              Share QR Code
            </Button>
            <Button
              variant="ghost"
              fullWidth
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
            >
              Regenerate QR Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;