import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import SingleProduct from '../components/SingleProduct';
import { SingleProductProps } from '../types/Product';

const SingleProductPage: React.FC<SingleProductProps> = ({ setProductOfTheMonthId }) => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <SingleProduct setProductOfTheMonthId={setProductOfTheMonthId}/>
    </>
  )
}

export default SingleProductPage