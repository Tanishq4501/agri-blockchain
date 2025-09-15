// Gemini API Translation Service
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiTranslationService {
  constructor() {
    // Initialize Gemini API - API key should be set in environment variables
    this.apiKey = import.meta.env.REACT_APP_GEMINI_API_KEY || '';
    this.genAI = this.apiKey ? new GoogleGenerativeAI(this.apiKey) : null;
    this.model = this.genAI ? this.genAI.getGenerativeModel({ model: 'gemini-pro' }) : null;
    
    // Cache for translations to avoid repeated API calls
    this.translationCache = new Map();
    
    // Load cached translations from localStorage
    this.loadCachedTranslations();
  }

  // Load cached translations from localStorage
  loadCachedTranslations() {
    try {
      const cached = localStorage.getItem('agritrace-translation-cache');
      if (cached) {
        const parsedCache = JSON.parse(cached);
        this.translationCache = new Map(Object.entries(parsedCache));
      }
    } catch (error) {
      console.warn('Failed to load translation cache:', error);
    }
  }

  // Save translations to localStorage
  saveCachedTranslations() {
    try {
      const cacheObject = Object.fromEntries(this.translationCache);
      localStorage.setItem('agritrace-translation-cache', JSON.stringify(cacheObject));
    } catch (error) {
      console.warn('Failed to save translation cache:', error);
    }
  }

  // Check if API is available
  isApiAvailable() {
    return !!this.model && !!this.apiKey;
  }

  // Translate single text using Gemini API
  async translateText(text, targetLanguage = 'Hindi') {
    if (!text || text.trim() === '') return text;
    
    // Check cache first
    const cacheKey = `${text}_${targetLanguage}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey);
    }

    // If API is not available, return original text
    if (!this.isApiAvailable()) {
      console.warn('Gemini API not available. Please set REACT_APP_GEMINI_API_KEY environment variable.');
      return text;
    }

    try {
      const prompt = `Translate the following English text to ${targetLanguage}. Only return the translated text, nothing else. If the text contains technical terms related to agriculture, supply chain, or blockchain, keep them contextually appropriate for Indian agriculture:

"${text}"`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const translatedText = response.text().trim();

      // Cache the translation
      this.translationCache.set(cacheKey, translatedText);
      this.saveCachedTranslations();

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  // Translate multiple texts in batch
  async translateBatch(texts, targetLanguage = 'Hindi') {
    if (!Array.isArray(texts)) return texts;

    const translations = await Promise.allSettled(
      texts.map(text => this.translateText(text, targetLanguage))
    );

    return translations.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`Translation failed for text: ${texts[index]}`, result.reason);
        return texts[index]; // Return original text on error
      }
    });
  }

  // Translate object with nested text values
  async translateObject(obj, targetLanguage = 'Hindi', textFields = []) {
    if (!obj || typeof obj !== 'object') return obj;

    const translatedObj = { ...obj };

    for (const field of textFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        translatedObj[field] = await this.translateText(obj[field], targetLanguage);
      }
    }

    return translatedObj;
  }

  // Translate array of objects
  async translateObjectArray(array, targetLanguage = 'Hindi', textFields = []) {
    if (!Array.isArray(array)) return array;

    const translatedArray = await Promise.allSettled(
      array.map(obj => this.translateObject(obj, targetLanguage, textFields))
    );

    return translatedArray.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`Translation failed for object at index ${index}`, result.reason);
        return array[index]; // Return original object on error
      }
    });
  }

  // Clear translation cache
  clearCache() {
    this.translationCache.clear();
    localStorage.removeItem('agritrace-translation-cache');
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.translationCache.size,
      keys: Array.from(this.translationCache.keys())
    };
  }
}

// Create singleton instance
const geminiTranslationService = new GeminiTranslationService();

export default geminiTranslationService;

// Export utility functions
export const translateText = (text, targetLanguage = 'Hindi') => 
  geminiTranslationService.translateText(text, targetLanguage);

export const translateBatch = (texts, targetLanguage = 'Hindi') => 
  geminiTranslationService.translateBatch(texts, targetLanguage);

export const translateObject = (obj, targetLanguage = 'Hindi', textFields = []) => 
  geminiTranslationService.translateObject(obj, targetLanguage, textFields);

export const translateObjectArray = (array, targetLanguage = 'Hindi', textFields = []) => 
  geminiTranslationService.translateObjectArray(array, targetLanguage, textFields);
