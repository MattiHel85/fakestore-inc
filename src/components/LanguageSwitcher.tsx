import React from 'react';
import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';
import { Button } from '@mui/material';
import styles from '../styles/styles.module.css'

const LanguageSwitcher: React.FC = () => {
  const { language, switchLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fi' : 'en';
    switchLanguage(newLanguage);
  };

  return (
    <div 
      style={{
        display: 'flex',
        margin: '0 .5em'
      }}
    >
      <Button 
        onClick={toggleLanguage}
        className={styles.languageButton}
      >
          {getTranslation(language, 'suomi')}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
