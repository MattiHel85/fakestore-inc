import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, TextField, Button, MenuItem, FormControl, Box } from '@mui/material';
import styles from '../styles/Products.module.css'

import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';

import { fetchProducts, fetchProductsByPriceRange, fetchProductsByCategory } from '../redux/slices/productSlice';
import debouncedHandleAddToCart from '../utils/cartHelpers';

import ProductCard from './ProductCard';

const Products: React.FC = () => {
  
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleSearchByPrice = () => {
    dispatch(fetchProductsByPriceRange({ minPrice, maxPrice }));
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as number | '');
    dispatch(fetchProductsByCategory(event.target.value as number));
  };

  const handleShowSearch = () => {
    showSearchForm && setShowSearchForm(false)
    !showSearchForm && setShowSearchForm(true)
  }

  const filteredProducts = products.filter((filteredProduct) =>
    filteredProduct.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || filteredProduct.category?.id === selectedCategory) &&
    (minPrice === 0 || filteredProduct.price >= minPrice) &&
    (maxPrice === 0 || filteredProduct.price <= maxPrice)
  );

  return (
    <>
      <Box className={styles.productsContainer}>
        <Button onClick={handleShowSearch} className={styles.secondaryButton}> { !showSearchForm ? 'Open Search' : 'Close Search'}</Button>
      </Box>
      {
        showSearchForm && 
        <FormControl className={styles.form}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.textField}
          />
          <TextField
            select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            className={styles.textField}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Min Price"
            variant="outlined"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={styles.textField}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className={styles.textField}
          />
          <br />
          <Button onClick={handleSearchByPrice} className={styles.secondaryButton}>Search by Price</ Button>
        </FormControl>
      }
      <Container className={styles.productsContainer}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} items={items} dispatch={dispatch} onAddToCart={debouncedHandleAddToCart} />
        ))}
      </Container>
    </>
    
  );
};

export default Products;