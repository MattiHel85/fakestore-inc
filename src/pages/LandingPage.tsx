import React, {useState} from 'react';
import Home from '../components/Home';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';

const LandingPage: React.FC = () => {
  const [productOfTheMonthId, setProductOfTheMonthId] = useState<number>()

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Home productOfTheMonthId={productOfTheMonthId} setProductOfTheMonthId={setProductOfTheMonthId} />
    </>
  )
}

export default LandingPage