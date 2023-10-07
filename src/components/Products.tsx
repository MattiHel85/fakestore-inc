import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, TextField, Button, MenuItem, FormControl } from '@mui/material';

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
    <Container sx={{ width: '100%', marginTop: '2em', marginBottom: '2em', textAlign: 'center'  }}>
      <Button onClick={handleShowSearch} sx={{marginBottom: '.75em'}}> { !showSearchForm ? 'Open Search' : 'Close Search'}</Button>
      {
        showSearchForm && <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '50%', margin: 'auto', marginBottom: '.5em'}}
          />
          <TextField
            select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            sx={{ width: '50%', margin: 'auto', marginBottom: '.5em' }}
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
            sx={{ width: '50%', margin: 'auto', marginBottom: '.5em' }}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            sx={{ width: '50%', margin: 'auto', marginBottom: '.5em' }}
          />
          <br />
          <Button onClick={handleSearchByPrice}>Search by Price</ Button>
        </FormControl>
      }
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} items={items} dispatch={dispatch} onAddToCart={debouncedHandleAddToCart} />
        ))}
      </Container>
    </Container>
    
  );
};

export default Products;