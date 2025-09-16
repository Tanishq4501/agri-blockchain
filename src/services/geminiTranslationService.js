import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiTranslationService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;
  }

  initialize(apiKey) {
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key is required');
    }
    
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
      throw error;
    }
  }

  async translateText(text, targetLanguage = 'hi', sourceLanguage = 'en') {
    if (!this.isInitialized) {
      throw new Error('Translation service not initialized. Please provide API key.');
    }

    if (!text || text.trim() === '') {
      return text;
    }

    // Skip translation if text is already in target language or contains only numbers/symbols
    if (this.shouldSkipTranslation(text, targetLanguage, sourceLanguage)) {
      return text;
    }

    try {
      const languageNames = {
        'en': 'English',
        'hi': 'Hindi'
      };

      const prompt = `Translate the following text from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. 
      
      Rules:
      1. Maintain the original formatting and structure
      2. Keep technical terms, brand names, and proper nouns as they are when appropriate
      3. For agricultural and technical terms, provide contextually appropriate translations
      4. If the text is already in ${languageNames[targetLanguage]}, return it as is
      5. Only return the translated text, no explanations or additional content
      
      Text to translate: "${text}"`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const translatedText = response.text().trim();

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Return original text if translation fails
      return text;
    }
  }

  async translateBatch(textArray, targetLanguage = 'hi', sourceLanguage = 'en') {
    if (!this.isInitialized) {
      throw new Error('Translation service not initialized. Please provide API key.');
    }

    if (!Array.isArray(textArray) || textArray.length === 0) {
      return textArray;
    }

    try {
      const languageNames = {
        'en': 'English',
        'hi': 'Hindi'
      };

      // Filter out texts that should be skipped
      const textsToTranslate = textArray.map((text, index) => ({
        text,
        index,
        shouldSkip: this.shouldSkipTranslation(text, targetLanguage, sourceLanguage)
      }));

      const validTexts = textsToTranslate.filter(item => !item.shouldSkip);
      
      if (validTexts.length === 0) {
        return textArray;
      }

      const prompt = `Translate the following texts from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. 
      
      Rules:
      1. Maintain the original formatting and structure for each text
      2. Keep technical terms, brand names, and proper nouns as they are when appropriate
      3. For agricultural and technical terms, provide contextually appropriate translations
      4. Return each translation on a separate line in the same order
      5. Only return the translated texts, no explanations or additional content
      
      Texts to translate:
      ${validTexts.map((item, i) => `${i + 1}. "${item.text}"`).join('\n')}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const translatedTexts = response.text().trim().split('\n');

      // Reconstruct the full array with translations
      const finalResult = [...textArray];
      validTexts.forEach((item, i) => {
        if (translatedTexts[i]) {
          // Remove numbering if present (e.g., "1. " at the start)
          const cleanTranslation = translatedTexts[i].replace(/^\d+\.\s*/, '').trim();
          finalResult[item.index] = cleanTranslation;
        }
      });

      return finalResult;
    } catch (error) {
      console.error('Batch translation error:', error);
      // Return original array if translation fails
      return textArray;
    }
  }

  shouldSkipTranslation(text, targetLanguage = 'hi', sourceLanguage = 'en') {
    if (!text || typeof text !== 'string') {
      return true;
    }

    const trimmedText = text.trim();
    
    // Skip empty strings
    if (trimmedText === '') {
      return true;
    }

    // Skip if text contains only numbers, symbols, or whitespace
    if (/^[\d\s\W]+$/.test(trimmedText)) {
      return true;
    }

    // Skip very short texts (likely abbreviations or codes)
    if (trimmedText.length <= 2) {
      return true;
    }

    // Skip if translating to Hindi and text already contains Devanagari script
    if (targetLanguage === 'hi' && /[\u0900-\u097F]/.test(trimmedText)) {
      return true;
    }

    // Skip if translating to English and text contains only Latin characters
    if (targetLanguage === 'en' && sourceLanguage === 'hi' && !/[\u0900-\u097F]/.test(trimmedText)) {
      return true;
    }

    return false;
  }

  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
    ];
  }
}

// Create singleton instance
const geminiTranslationService = new GeminiTranslationService();

export default geminiTranslationService;
