# Translation System Setup Guide

This guide explains how to set up and use the translation system in your AgriTrace application.

## Overview

The translation system provides:
- **Automatic translation** between English and Hindi using Google's Gemini 1.5 Pro API
- **Persistent language state** across page navigation
- **Toggle button** on all farmer-facing pages
- **Fallback mechanism** when translation fails
- **Caching** to improve performance and reduce API calls

## Setup Instructions

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variable

1. Open the `.env` file in your project root
2. Replace `your_gemini_api_key_here` with your actual API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Restart the Application

After updating the environment variable, restart your development server:

```bash
npm start
```

## How It Works

### Translation Context

The `TranslationProvider` wraps your entire application and provides:
- Current language state (English/Hindi)
- Translation functions
- Persistent storage in localStorage
- Translation caching for performance

### Components

#### TranslateToggle
- Located in the top-right corner of farmer pages
- Shows current language with flag icon
- Animated toggle switch
- Loading indicator during translation

#### TranslatableText
- Automatically translates text content
- Supports both text prop and children
- Caches translations for performance
- Falls back to original text if translation fails

## Usage Examples

### Basic Text Translation

```jsx
import TranslatableText from '../components/ui/TranslatableText';

// Using text prop
<TranslatableText text="Welcome to your dashboard" />

// Using children
<TranslatableText>
  Welcome to your dashboard
</TranslatableText>

// With custom styling
<TranslatableText 
  as="h1" 
  className="text-2xl font-bold"
  text="Farmer Dashboard"
/>
```

### Manual Translation

```jsx
import { useTranslation } from '../contexts/TranslationContext';

function MyComponent() {
  const { translateText, currentLanguage } = useTranslation();
  
  const handleTranslate = async () => {
    const translated = await translateText("Hello, farmer!");
    console.log(translated);
  };
}
```

### Batch Translation

```jsx
const { translateBatch } = useTranslation();

const texts = ["Apple", "Orange", "Banana"];
const translated = await translateBatch(texts);
```

## Features

### Language Persistence
- Language preference is saved in localStorage
- Survives page refreshes and navigation
- Automatically restores on app load

### Smart Translation
- Skips translation for numbers, symbols, and short codes
- Detects Hindi text and avoids re-translation
- Maintains formatting and structure

### Performance Optimization
- Caches translations to avoid repeated API calls
- Batch translation for multiple texts
- Lazy loading of translation service

### Error Handling
- Graceful fallback to original text
- Console logging for debugging
- Service initialization checks

## Supported Languages

Currently supports:
- **English (en)** - Default language
- **Hindi (hi)** - Toggle language

The system is designed to be easily extensible for additional languages.

## Troubleshooting

### Translation Not Working
1. Check if `VITE_GEMINI_API_KEY` is set correctly
2. Verify API key is valid and has proper permissions
3. Check browser console for error messages
4. Ensure internet connection is available

### Toggle Button Not Visible
1. Verify the TranslationProvider wraps your app
2. Check if API key is configured (button hides without valid key)
3. Ensure you're on a farmer page

### Performance Issues
1. Translation cache helps reduce API calls
2. Consider using batch translation for multiple texts
3. Monitor API usage and quotas

## API Usage and Costs

- Uses Google's Gemini 1.5 Pro API
- Costs depend on your usage and Google's pricing
- Caching reduces redundant API calls
- Consider implementing usage limits for production

## Security Notes

- Never commit your API key to version control
- Use environment variables for API key storage
- Consider implementing rate limiting
- Monitor API usage in production

## Future Enhancements

The system is designed to support:
- Additional languages
- Custom translation providers
- Translation quality feedback
- Offline translation capabilities
- User preference management
