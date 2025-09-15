import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';
import LanguageToggle from './LanguageToggle';
import GeminiToggle from './GeminiToggle';

const TranslationSettings = ({ 
  isHindi, 
  useGemini, 
  onToggleLanguage, 
  onToggleGemini, 
  isGeminiAvailable,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon name="Languages" size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">
          {isHindi ? 'हिं' : 'EN'}
        </span>
        {useGemini && isGeminiAvailable && (
          <Icon name="Sparkles" size={12} className="text-purple-500" />
        )}
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-text-secondary" 
        />
      </motion.button>

      {/* Expanded Settings Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">
                  Translation Settings
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>

              {/* Language Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Language
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">
                    {isHindi ? 'Hindi (हिंदी)' : 'English'}
                  </span>
                  <LanguageToggle
                    isHindi={isHindi}
                    onToggle={onToggleLanguage}
                    className="ml-2"
                  />
                </div>
              </div>

              {/* Gemini AI Toggle */}
              {isGeminiAvailable && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    AI Translation
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-sm text-text-primary block">
                        Gemini AI
                      </span>
                      <span className="text-xs text-text-secondary">
                        Enhanced translation quality
                      </span>
                    </div>
                    <GeminiToggle
                      useGemini={useGemini}
                      onToggle={onToggleGemini}
                      isAvailable={isGeminiAvailable}
                      className="ml-2"
                    />
                  </div>
                </div>
              )}

              {/* API Key Status */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={isGeminiAvailable ? "CheckCircle" : "AlertCircle"} 
                    size={14} 
                    className={isGeminiAvailable ? "text-success" : "text-warning"} 
                  />
                  <span className="text-xs text-text-secondary">
                    {isGeminiAvailable 
                      ? 'AI translation ready' 
                      : 'Set REACT_APP_GEMINI_API_KEY for AI translation'
                    }
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TranslationSettings;
