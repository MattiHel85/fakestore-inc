import React from 'react';

import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';


const AlreadySignedInPage: React.FC = () => {
  const {language} = useLanguage();

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={getTranslation(language, "You're already signed in")} body={getTranslation(language, 'You need to log out before you can perform this action.')}/>
    </>
  )
}

export default AlreadySignedInPage