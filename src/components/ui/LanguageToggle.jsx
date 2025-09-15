import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';

const LanguageToggle = ({ isHindi, onToggle, className = '' }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`
        relative inline-flex items-center px-3 py-2 rounded-lg
        bg-white border border-gray-200 shadow-sm
        hover:bg-gray-50 hover:border-gray-300
        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
        transition-all duration-200 ease-in-out
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <div className="flex items-center space-x-2">
        <Icon 
          name="Languages" 
          size={16} 
          className="text-text-secondary" 
        />
        <span className="text-sm font-medium text-text-primary">
          {isHindi ? 'EN' : 'हिं'}
        </span>
      </div>
      
      {/* Language indicator dot */}
      <motion.div
        className={`
          absolute -top-1 -right-1 w-2 h-2 rounded-full
          ${isHindi ? 'bg-orange-500' : 'bg-blue-500'}
        `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      />
    </motion.button>
  );
};

export default LanguageToggle;
