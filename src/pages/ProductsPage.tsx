import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Products from '../components/Products';

const ProductsPage: React.FC = ( ) => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Products />
    </>
  )
}

export default ProductsPage