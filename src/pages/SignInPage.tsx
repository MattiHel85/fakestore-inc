import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SignIn from '../components/SignIn';
import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const SignInPage: React.FC = () => {
  const {language} = useLanguage();

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={getTranslation(language, 'sign in')} />
        <SignIn />
    </>
  )
}

export default SignInPage