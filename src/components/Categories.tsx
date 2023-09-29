import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from '../types/Category';
import { AppDispatch } from '../redux/store';

import Header from './Header';
import { fetchCategories } from '../redux/slices/categorySlice';

const Categories: React.FC = () => {
  const {categories,loading,error} = useSelector((state: any) => state.categories)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  return (
    <div>
      <Header title='Categories' />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <img src={category.image} alt={`Category: ${category.name}`}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;