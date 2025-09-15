// React hook for Gemini-powered translation
import { useState, useEffect, useCallback } from 'react';
import geminiTranslationService from '../services/geminiTranslation';

export const useGeminiTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);
  const [isApiAvailable, setIsApiAvailable] = useState(false);

  useEffect(() => {
    setIsApiAvailable(geminiTranslationService.isApiAvailable());
  }, []);

  const translateText = useCallback(async (text, targetLanguage = 'Hindi') => {
    if (!text) return text;
    
    setIsTranslating(true);
    setTranslationError(null);
    
    try {
      const translated = await geminiTranslationService.translateText(text, targetLanguage);
      return translated;
    } catch (error) {
      setTranslationError(error.message);
      return text; // Return original text on error
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const translateBatch = useCallback(async (texts, targetLanguage = 'Hindi') => {
    if (!Array.isArray(texts)) return texts;
    
    setIsTranslating(true);
    setTranslationError(null);
    
    try {
      const translated = await geminiTranslationService.translateBatch(texts, targetLanguage);
      return translated;
    } catch (error) {
      setTranslationError(error.message);
      return texts; // Return original texts on error
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const translateObject = useCallback(async (obj, targetLanguage = 'Hindi', textFields = []) => {
    if (!obj) return obj;
    
    setIsTranslating(true);
    setTranslationError(null);
    
    try {
      const translated = await geminiTranslationService.translateObject(obj, targetLanguage, textFields);
      return translated;
    } catch (error) {
      setTranslationError(error.message);
      return obj; // Return original object on error
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const translateObjectArray = useCallback(async (array, targetLanguage = 'Hindi', textFields = []) => {
    if (!Array.isArray(array)) return array;
    
    setIsTranslating(true);
    setTranslationError(null);
    
    try {
      const translated = await geminiTranslationService.translateObjectArray(array, targetLanguage, textFields);
      return translated;
    } catch (error) {
      setTranslationError(error.message);
      return array; // Return original array on error
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    geminiTranslationService.clearCache();
  }, []);

  const getCacheStats = useCallback(() => {
    return geminiTranslationService.getCacheStats();
  }, []);

  return {
    translateText,
    translateBatch,
    translateObject,
    translateObjectArray,
    clearCache,
    getCacheStats,
    isTranslating,
    translationError,
    isApiAvailable
  };
};
