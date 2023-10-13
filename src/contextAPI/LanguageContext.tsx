import React, { createContext, useContext, useState, ReactNode } from 'react';


type Language = 'en' | 'fi';

type LanguageContextType = {
  language: Language;
  switchLanguage: (newLanguage: Language) => void;
};

// Create a context for managing the language
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Props for LanguageProvider
type LanguageProviderProps = {
  children: ReactNode;
};

// LanguageProvider component
const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fi'); // Default language is English

  const switchLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const contextValue: LanguageContextType = {
    language,
    switchLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
  );
};

export default LanguageProvider