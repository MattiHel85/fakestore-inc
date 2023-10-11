import React, {useState} from 'react';
import Home from '../components/Home';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import { HomeProps } from '../types/types';

const LandingPage: React.FC = () => {
  const [productOfTheMonthId, setProductOfTheMonthId] = useState<number>()

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Home productOfTheMonthId={productOfTheMonthId} />
    </>
  )
}

export default LandingPage