import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

const TranslatableText = ({ 
  children, 
  text, 
  className = '', 
  as: Component = 'span',
  fallback = null,
  ...props 
}) => {
  const { translateText, currentLanguage } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Store the original English text - this never changes
  const originalText = useMemo(() => {
    return text || (typeof children === 'string' ? children : '');
  }, [text, children]);

  // Use ref to track current translation to prevent re-translation of same content
  const currentTranslationRef = useRef({ text: '', language: '', result: '' });

  useEffect(() => {
    const performTranslation = async () => {
      if (!originalText) {
        setDisplayText('');
        return;
      }

      // If current language is English, just use the original text
      if (currentLanguage === 'en') {
        setDisplayText(originalText);
        return;
      }

      // Check if we already have this translation
      if (currentTranslationRef.current.text === originalText && 
          currentTranslationRef.current.language === currentLanguage &&
          currentTranslationRef.current.result) {
        setDisplayText(currentTranslationRef.current.result);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(originalText);
        
        // Store the translation result
        currentTranslationRef.current = {
          text: originalText,
          language: currentLanguage,
          result: translated
        };
        
        setDisplayText(translated);
      } catch (error) {
        console.error('Translation error:', error);
        setDisplayText(originalText); // Fallback to original text
      } finally {
        setIsLoading(false);
      }
    };

    performTranslation();
  }, [originalText, currentLanguage, translateText]);

  // Show loading state or fallback
  if (isLoading && fallback) {
    return fallback;
  }

  // If we have non-string children, render them as-is
  if (children && typeof children !== 'string') {
    return <Component className={className} {...props}>{children}</Component>;
  }

  return (
    <Component className={className} {...props}>
      {displayText || originalText}
    </Component>
  );
};

export default TranslatableText;
