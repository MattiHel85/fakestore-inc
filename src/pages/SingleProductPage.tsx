import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import SingleProduct from '../components/SingleProduct';

const SingleProductPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <SingleProduct />
    </>
  )
}

export default SingleProductPage