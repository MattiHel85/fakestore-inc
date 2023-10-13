import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const ContactPage: React.FC = () => {
  const { language } = useLanguage()

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={getTranslation(language, 'Contact us')} />
        <ContactForm />
    </>
  )
}

export default ContactPage