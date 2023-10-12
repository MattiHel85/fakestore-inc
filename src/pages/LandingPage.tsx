import React from 'react';
import Home from '../components/Home';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';

const LandingPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Home />
    </>
  )
}

export default LandingPage