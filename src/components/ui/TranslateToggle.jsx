import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/TranslationContext';
import Icon from '../AppIcon';

const TranslateToggle = ({ className = '' }) => {
  const { 
    currentLanguage, 
    toggleLanguage, 
    isTranslating, 
    isServiceInitialized,
    getLanguageInfo 
  } = useTranslation();

  const currentLang = getLanguageInfo();
  const isHindi = currentLanguage === 'hi';

  // Don't render if service is not initialized
  if (!isServiceInitialized) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={toggleLanguage}
        disabled={isTranslating}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200
          ${isTranslating 
            ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-75' 
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm active:scale-95'
          }
          ${isHindi 
            ? 'ring-2 ring-primary/20 border-primary/30' 
            : ''
          }
        `}
        whileTap={{ scale: isTranslating ? 1 : 0.95 }}
        title={`Switch to ${isHindi ? 'English' : 'Hindi'}`}
      >
        {/* Language Flag/Icon */}
        <div className="flex items-center space-x-1">
          <span className="text-sm">{currentLang?.flag}</span>
          <span className="text-xs font-medium text-text-secondary">
            {currentLang?.code?.toUpperCase()}
          </span>
        </div>

        {/* Toggle Switch Visual */}
        <div className="relative w-8 h-4 bg-gray-200 rounded-full transition-colors duration-200">
          <motion.div
            className={`absolute top-0.5 w-3 h-3 rounded-full shadow-sm transition-colors duration-200 ${
              isHindi ? 'bg-primary' : 'bg-gray-400'
            }`}
            animate={{
              x: isHindi ? 18 : 2
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </div>

        {/* Loading Indicator */}
        {isTranslating && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3"
          >
            <Icon name="Loader2" size={12} className="text-primary" />
          </motion.div>
        )}
      </motion.button>

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap group-hover:opacity-100 z-50">
        {isTranslating 
          ? 'Translating...' 
          : `Switch to ${isHindi ? 'English' : 'Hindi'}`
        }
      </div>
    </div>
  );
};

export default TranslateToggle;
