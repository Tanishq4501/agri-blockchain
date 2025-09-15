import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';

const GeminiToggle = ({ useGemini, onToggle, isAvailable, className = '' }) => {
  if (!isAvailable) return null;

  return (
    <motion.button
      onClick={onToggle}
      className={`
        relative inline-flex items-center px-3 py-2 rounded-lg
        ${useGemini 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' 
          : 'bg-white border border-gray-200 text-text-primary hover:bg-gray-50'
        }
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-purple-500/20
        transition-all duration-200 ease-in-out
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={useGemini ? 'Disable AI Translation' : 'Enable AI Translation'}
    >
      <div className="flex items-center space-x-2">
        <Icon 
          name="Sparkles" 
          size={16} 
          className={useGemini ? 'text-white' : 'text-purple-500'} 
        />
        <span className="text-sm font-medium">
          AI
        </span>
      </div>
      
      {/* Active indicator */}
      {useGemini && (
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        />
      )}
    </motion.button>
  );
};

export default GeminiToggle;
