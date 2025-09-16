import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState(() => new Map());
  const [isServiceInitialized, setIsServiceInitialized] = useState(false);

  // Initialize translation service on mount
  useEffect(() => {
    const initializeService = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (apiKey && apiKey !== 'your_gemini_api_key_here') {
          // Dynamically import the service to avoid initialization errors
          const { default: geminiTranslationService } = await import('../services/geminiTranslationService');
          await geminiTranslationService.initialize(apiKey);
          setIsServiceInitialized(true);
        } else {
          console.warn('Gemini API key not found or not configured. Translation service will not be available.');
          setIsServiceInitialized(false);
        }
      } catch (error) {
        console.error('Failed to initialize translation service:', error);
        setIsServiceInitialized(false);
      }
    };

    initializeService();
  }, []);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('agri-blockchain-language');
    if (savedLanguage && ['en', 'hi'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference when changed
  useEffect(() => {
    localStorage.setItem('agri-blockchain-language', currentLanguage);
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
  };

  const translateText = useCallback(async (text, options = {}) => {
    if (!isServiceInitialized) {
      return text;
    }

    if (!text || typeof text !== 'string') {
      return text;
    }

    // Return original text if current language is English
    if (currentLanguage === 'en') {
      return text;
    }

    // Check cache first - use original English text as base key
    const cacheKey = `${text}_${currentLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    try {
      setIsTranslating(true);
      // Dynamically import the service
      const { default: geminiTranslationService } = await import('../services/geminiTranslationService');
      
      // Always translate from English to target language
      // The text passed should be the original English text
      const translatedText = await geminiTranslationService.translateText(
        text,
        currentLanguage,
        'en'
      );

      // Cache the translation with bidirectional mapping
      setTranslationCache(prev => {
        const newCache = new Map(prev);
        newCache.set(cacheKey, translatedText);
        // Also cache the reverse translation
        newCache.set(`${translatedText}_en`, text);
        return newCache;
      });
      
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [isServiceInitialized, currentLanguage]);

  const translateBatch = async (textArray, options = {}) => {
    if (!isServiceInitialized) {
      return textArray;
    }

    // Return original array if current language is English
    if (currentLanguage === 'en') {
      return textArray;
    }

    if (!Array.isArray(textArray)) {
      return textArray;
    }

    try {
      setIsTranslating(true);
      
      // Check cache for each text
      const results = [];
      const textsToTranslate = [];
      const indicesToTranslate = [];

      textArray.forEach((text, index) => {
        const cacheKey = `${text}_${currentLanguage}`;
        if (translationCache.has(cacheKey)) {
          results[index] = translationCache.get(cacheKey);
        } else {
          textsToTranslate.push(text);
          indicesToTranslate.push(index);
          results[index] = null; // Placeholder
        }
      });

      // Translate uncached texts
      if (textsToTranslate.length > 0) {
        // Dynamically import the service
        const { default: geminiTranslationService } = await import('../services/geminiTranslationService');
        const translations = await geminiTranslationService.translateBatch(
          textsToTranslate,
          currentLanguage,
          'en'
        );

        // Update results and cache
        translations.forEach((translation, i) => {
          const originalIndex = indicesToTranslate[i];
          const originalText = textsToTranslate[i];
          const cacheKey = `${originalText}_${currentLanguage}`;
          
          results[originalIndex] = translation;
          setTranslationCache(prev => new Map(prev).set(cacheKey, translation));
        });
      }

      return results;
    } catch (error) {
      console.error('Batch translation failed:', error);
      return textArray;
    } finally {
      setIsTranslating(false);
    }
  };

  const getLanguageInfo = () => {
    const languages = {
      'en': { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      'hi': { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' }
    };
    return languages[currentLanguage];
  };

  const getSupportedLanguages = () => {
    return [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' }
    ];
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    toggleLanguage,
    translateText,
    translateBatch,
    isTranslating,
    isServiceInitialized,
    getLanguageInfo,
    getSupportedLanguages,
    translationCache: translationCache.size // For debugging
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
