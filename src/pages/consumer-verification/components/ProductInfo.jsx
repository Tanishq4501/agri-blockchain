import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onShare }) => {
  if (!product) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'bg-success/10 text-success border-success/20';
      case 'authentic':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'expired':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCertificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'organic':
        return 'Leaf';
      case 'fair trade':
        return 'HandHeart';
      case 'non-gmo':
        return 'Shield';
      case 'sustainable':
        return 'Recycle';
      default:
        return 'Award';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevated border border-gray-200 overflow-hidden animate-fade-in">
      {/* Header with Status */}
      <div className="bg-gradient-to-r from-primary to-success p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{product?.name}</h2>
            <p className="text-primary-foreground/80">Product Code: {product?.code}</p>
          </div>
          <div className={`px-4 py-2 rounded-full border ${getStatusColor(product?.status)} bg-white/90`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={product?.status === 'verified' ? 'CheckCircle' : 'AlertCircle'} 
                size={16} 
                strokeWidth={2}
              />
              <span className="text-sm font-semibold capitalize">{product?.status}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Product Image and Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover hover-lift"
              />
            </div>
            <div className="flex space-x-2">
              {product?.gallery?.map((img, index) => (
                <div key={index} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Farm Information */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                Farm Origin
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{product?.farmer?.name}</p>
                    <p className="text-sm text-text-secondary">{product?.farmer?.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-text-secondary">Harvest Date</p>
                    <p className="text-sm font-medium text-text-primary">{product?.harvestDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Farm Size</p>
                    <p className="text-sm font-medium text-text-primary">{product?.farmer?.farmSize}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="Award" size={20} className="mr-2 text-primary" />
                Certifications
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product?.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white rounded-lg p-2">
                    <Icon 
                      name={getCertificationIcon(cert)} 
                      size={16} 
                      className="text-success"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-text-primary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            {product?.nutrition && (
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                  <Icon name="Activity" size={20} className="mr-2 text-primary" />
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product?.nutrition)?.map(([key, value]) => (
                    <div key={key} className="bg-white rounded-lg p-2">
                      <p className="text-xs text-text-secondary capitalize">{key}</p>
                      <p className="text-sm font-medium text-text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <Icon name="Thermometer" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-text-secondary">Storage Temp</p>
            <p className="font-semibold text-text-primary">{product?.storageTemp}</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Icon name="Calendar" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-text-secondary">Best Before</p>
            <p className="font-semibold text-text-primary">{product?.bestBefore}</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Icon name="Package" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-text-secondary">Batch Size</p>
            <p className="font-semibold text-text-primary">{product?.batchSize}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={() => onShare(product)}
            iconName="Share2"
            iconPosition="left"
            iconSize={18}
            className="flex-1"
          >
            Share Verification
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={18}
            className="flex-1"
          >
            Download Report
          </Button>
          <Button
            variant="ghost"
            iconName="Heart"
            iconPosition="left"
            iconSize={18}
            className="flex-1"
          >
            Add to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;