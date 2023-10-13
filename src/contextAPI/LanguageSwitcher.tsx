import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div>
      <button onClick={() => switchLanguage('en')}>English</button>
      <button onClick={() => switchLanguage('fi')}>Suomi</button>
      <p>Current Language: {language}</p>
    </div>
  );
};

export default LanguageSwitcher