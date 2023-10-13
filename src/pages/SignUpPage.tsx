import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SignUp from '../components/SignUp';
import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const SignUpPage: React.FC = () => {
  const {language} = useLanguage();

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={getTranslation(language, 'sign up')} />
        <SignUp />
    </>
  )
}

export default SignUpPage