// Translation utility for Hindi/English text conversion
import { useState } from 'react';
import geminiTranslationService from '../services/geminiTranslation';

export const translations = {
  // Common UI Elements
  'Dashboard': 'डैशबोर्ड',
  'Notifications': 'सूचनाएं',
  'Profile': 'प्रोफाइल',
  'Settings': 'सेटिंग्स',
  'Logout': 'लॉगआउट',
  'Search': 'खोजें',
  'Filter': 'फिल्टर',
  'Sort': 'क्रमबद्ध करें',
  'Export': 'निर्यात',
  'Import': 'आयात',
  'Save': 'सहेजें',
  'Cancel': 'रद्द करें',
  'Delete': 'हटाएं',
  'Edit': 'संपादित करें',
  'View': 'देखें',
  'Add': 'जोड़ें',
  'Update': 'अपडेट करें',
  'Submit': 'जमा करें',
  'Close': 'बंद करें',
  'Back': 'वापस',
  'Next': 'अगला',
  'Previous': 'पिछला',
  'Loading': 'लोड हो रहा है',
  'Error': 'त्रुटि',
  'Success': 'सफलता',
  'Warning': 'चेतावनी',
  'Info': 'जानकारी',

  // Farmer Dashboard
  'Welcome back': 'वापस स्वागत है',
  'Total Products': 'कुल उत्पाद',
  'Active Batches': 'सक्रिय बैच',
  'Pending Orders': 'लंबित ऑर्डर',
  'Monthly Revenue': 'मासिक आय',
  'Recent Activity': 'हाल की गतिविधि',
  'Quick Actions': 'त्वरित कार्य',
  'Add New Product': 'नया उत्पाद जोड़ें',
  'View Inventory': 'इन्वेंटरी देखें',
  'Check Orders': 'ऑर्डर जांचें',
  'Update Profile': 'प्रोफाइल अपडेट करें',
  'Products': 'उत्पाद',
  'Harvest Records': 'फसल रिकॉर्ड',
  'Earnings': 'आय',
  'Orders': 'ऑर्डर',
  'Analytics': 'विश्लेषण',

  // Distributor Dashboard
  'Shipments': 'शिपमेंट',
  'Active Routes': 'सक्रिय मार्ग',
  'Delivered Today': 'आज वितरित',
  'In Transit': 'ट्रांजिट में',
  'Pending Deliveries': 'लंबित डिलीवरी',
  'Fleet Status': 'फ्लीट स्थिति',
  'Driver Management': 'ड्राइवर प्रबंधन',
  'Route Optimization': 'मार्ग अनुकूलन',
  'Delivery Reports': 'डिलीवरी रिपोर्ट',

  // Retailer Dashboard
  'Stock Management': 'स्टॉक प्रबंधन',
  'Sales Reports': 'बिक्री रिपोर्ट',
  'Inventory': 'इन्वेंटरी',
  'Suppliers': 'आपूर्तिकर्ता',
  'Customers': 'ग्राहक',
  'Low Stock Items': 'कम स्टॉक आइटम',
  'Top Selling': 'सर्वाधिक बिकने वाले',
  'Revenue': 'आय',
  'Profit Margin': 'लाभ मार्जिन',
  'Store Performance': 'स्टोर प्रदर्शन',

  // Consumer Dashboard
  'Scan History': 'स्कैन इतिहास',
  'Favorites': 'पसंदीदा',
  'Verification': 'सत्यापन',
  'Product Tracking': 'उत्पाद ट्रैकिंग',
  'Quality Reports': 'गुणवत्ता रिपोर्ट',
  'Trusted Brands': 'विश्वसनीय ब्रांड',
  'Recent Scans': 'हाल के स्कैन',
  'Verified Products': 'सत्यापित उत्पाद',

  // Status Labels
  'Active': 'सक्रिय',
  'Inactive': 'निष्क्रिय',
  'Pending': 'लंबित',
  'Completed': 'पूर्ण',
  'Failed': 'असफल',
  'Processing': 'प्रसंस्करण',
  'Delivered': 'वितरित',
  'Cancelled': 'रद्द',
  'Approved': 'अनुमोदित',
  'Rejected': 'अस्वीकृत',

  // Time Periods
  'Today': 'आज',
  'Yesterday': 'कल',
  'This Week': 'इस सप्ताह',
  'This Month': 'इस महीने',
  'This Quarter': 'इस तिमाही',
  'This Year': 'इस वर्ष',
  'Last 7 Days': 'पिछले 7 दिन',
  'Last 30 Days': 'पिछले 30 दिन',

  // Product Categories
  'Vegetables': 'सब्जियां',
  'Fruits': 'फल',
  'Grains': 'अनाज',
  'Spices': 'मसाले',
  'Dairy': 'डेयरी',
  'Organic': 'जैविक',
  'Fresh': 'ताज़ा',
  'Processed': 'प्रसंस्कृत',

  // Units
  'kg': 'किग्रा',
  'grams': 'ग्राम',
  'liters': 'लीटर',
  'pieces': 'टुकड़े',
  'boxes': 'बक्से',
  'bags': 'बैग',

  // Common Actions
  'View Details': 'विवरण देखें',
  'Download Report': 'रिपोर्ट डाउनलोड करें',
  'Generate Invoice': 'चालान बनाएं',
  'Send Message': 'संदेश भेजें',
  'Mark as Read': 'पढ़ा हुआ चिह्नित करें',
  'Mark All as Read': 'सभी को पढ़ा हुआ चिह्नित करें',
  'Refresh': 'रीफ्रेश करें',
  'Print': 'प्रिंट करें',
  'Share': 'साझा करें',

  // Form Labels
  'Name': 'नाम',
  'Email': 'ईमेल',
  'Phone': 'फोन',
  'Address': 'पता',
  'City': 'शहर',
  'State': 'राज्य',
  'Pincode': 'पिनकोड',
  'Description': 'विवरण',
  'Price': 'मूल्य',
  'Quantity': 'मात्रा',
  'Date': 'दिनांक',
  'Time': 'समय',
  'Category': 'श्रेणी',
  'Status': 'स्थिति',
  'Notes': 'नोट्स',

  // Messages
  'No data available': 'कोई डेटा उपलब्ध नहीं',
  'Loading data': 'डेटा लोड हो रहा है',
  'Operation successful': 'ऑपरेशन सफल',
  'Operation failed': 'ऑपरेशन असफल',
  'Please try again': 'कृपया पुनः प्रयास करें',
  'Are you sure?': 'क्या आप सुनिश्चित हैं?',
  'This action cannot be undone': 'यह क्रिया पूर्ववत नहीं की जा सकती',
  'Changes saved successfully': 'परिवर्तन सफलतापूर्वक सहेजे गए',
  'Please fill all required fields': 'कृपया सभी आवश्यक फ़ील्ड भरें',
};

// Function to get translation (synchronous)
export const getTranslation = (key, isHindi = false) => {
  if (!isHindi) return key;
  return translations[key] || key;
};

// Function to translate text content (synchronous)
export const translateText = (text, isHindi = false) => {
  if (!isHindi) return text;
  
  // Split text by common separators and translate each part
  const parts = text.split(/(\s+|[.,;:!?()[\]{}"])/);
  return parts.map(part => {
    const trimmed = part.trim();
    return translations[trimmed] || part;
  }).join('');
};

// Async function for Gemini translation (separate from main translation)
export const getGeminiTranslation = async (key, targetLanguage = 'Hindi') => {
  if (!geminiTranslationService.isApiAvailable()) {
    return getTranslation(key, targetLanguage === 'Hindi');
  }
  
  try {
    return await geminiTranslationService.translateText(key, targetLanguage);
  } catch (error) {
    console.warn('Gemini translation failed, using fallback:', error);
    return getTranslation(key, targetLanguage === 'Hindi');
  }
};

// Async function for Gemini text translation
export const getGeminiTextTranslation = async (text, targetLanguage = 'Hindi') => {
  if (!geminiTranslationService.isApiAvailable()) {
    return translateText(text, targetLanguage === 'Hindi');
  }
  
  try {
    return await geminiTranslationService.translateText(text, targetLanguage);
  } catch (error) {
    console.warn('Gemini translation failed, using fallback:', error);
    return translateText(text, targetLanguage === 'Hindi');
  }
};

// Hook for managing language state with Gemini integration
export const useLanguage = () => {
  const [isHindi, setIsHindi] = useState(() => {
    const saved = localStorage.getItem('agritrace-language');
    return saved === 'hindi';
  });
  const [useGemini, setUseGemini] = useState(() => {
    const saved = localStorage.getItem('agritrace-use-gemini');
    return saved === 'true';
  });

  const toggleLanguage = () => {
    const newValue = !isHindi;
    setIsHindi(newValue);
    localStorage.setItem('agritrace-language', newValue ? 'hindi' : 'english');
  };

  const toggleGemini = () => {
    const newValue = !useGemini;
    setUseGemini(newValue);
    localStorage.setItem('agritrace-use-gemini', newValue ? 'true' : 'false');
  };

  // Synchronous translation functions
  const t = (key) => getTranslation(key, isHindi);
  const translateContent = (text) => translateText(text, isHindi);
  
  // Async Gemini translation functions
  const tGemini = async (key) => useGemini ? await getGeminiTranslation(key) : getTranslation(key, isHindi);
  const translateContentGemini = async (text) => useGemini ? await getGeminiTextTranslation(text) : translateText(text, isHindi);

  return {
    isHindi,
    useGemini,
    toggleLanguage,
    toggleGemini,
    t,
    translateContent,
    tGemini,
    translateContentGemini,
    isGeminiAvailable: geminiTranslationService.isApiAvailable()
  };
};
