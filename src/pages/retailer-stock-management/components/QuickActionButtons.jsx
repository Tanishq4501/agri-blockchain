import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionButtons = ({ onBatchVerify, onConfigureAlerts, onExportInventory, onOpenScanner }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Button
        variant="default"
        iconName="Shield"
        iconPosition="left"
        iconSize={18}
        onClick={onBatchVerify}
        className="flex-1 sm:flex-none"
      >
        Batch Verify
      </Button>
      
      <Button
        variant="outline"
        iconName="Bell"
        iconPosition="left"
        iconSize={18}
        onClick={onConfigureAlerts}
        className="flex-1 sm:flex-none"
      >
        Stock Alerts
      </Button>
      
      <Button
        variant="outline"
        iconName="Download"
        iconPosition="left"
        iconSize={18}
        onClick={onExportInventory}
        className="flex-1 sm:flex-none"
      >
        Export Data
      </Button>
      
      <Button
        variant="secondary"
        iconName="QrCode"
        iconPosition="left"
        iconSize={18}
        onClick={onOpenScanner}
        className="flex-1 sm:flex-none"
      >
        QR Scanner
      </Button>
    </div>
  );
};

export default QuickActionButtons;