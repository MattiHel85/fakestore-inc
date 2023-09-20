import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../store/reducers/productSlice';
import { Product } from '../types/types';
import { AppDispatch } from '../store/store';

import Header from './Header';

const Products: React.FC = () => {
  const {products,loading,error} = useSelector((state: any) => state.products)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  return (
    <div>
      <Header title='Product List' />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>

            {product.images.map((img) => (
              <img key={img} src={img}></img>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;