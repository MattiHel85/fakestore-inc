import React from 'react';
import Home from '../components/Home';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import { HomeProps } from '../types/types';

const LandingPage: React.FC<HomeProps> = ({productOfTheMonthId} ) => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Home productOfTheMonthId={productOfTheMonthId} />
    </>
  )
}

export default LandingPage