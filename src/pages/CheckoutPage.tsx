import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Cart from '../components/Cart';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const CheckoutPage: React.FC = () => {
  const {language} = useLanguage();

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={getTranslation(language, 'Checkout')} />
        <Cart />
    </>
  )
}

export default CheckoutPage