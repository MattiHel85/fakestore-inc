import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const AccessDeniedPage: React.FC = () => {
  const {language} = useLanguage();

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={getTranslation(language, 'This page is for Admin only')} body={getTranslation(language, 'If you are Admin, please sign in to continue...')} />
    </>
  )
}

export default AccessDeniedPage