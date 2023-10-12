import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, TextField, Button, MenuItem, FormControl, Box, Pagination } from '@mui/material';
import styles from '../styles/styles.module.css'

import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';

import { fetchProducts, fetchProductsByCategory } from '../redux/slices/productSlice';
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

  // const handleSearchByPrice = () => {
  //   dispatch(fetchProductsByPriceRange({ minPrice, maxPrice }));
  // };
  
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

  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Number of items to display per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the index of the first and last item to display based on the current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages based on the filtered products and items per page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <>
      <Box className={styles.productsContainer}>
        <Button onClick={handleShowSearch} className={styles.searchButton}> { !showSearchForm ? 'Open Search' : 'Close Search'}</Button>
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
          <TextField
            select
            label="Items Per Page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={styles.textField}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </TextField>
          <br />
          {/* <Button onClick={handleSearchByPrice} className={styles.secondaryButton}>Search by Price</ Button> */}
        </FormControl>
      }
      <Container className={styles.productsContainer}>
        {currentItems.map(product => (
          <ProductCard key={product.id} product={product} items={items} dispatch={dispatch} onAddToCart={debouncedHandleAddToCart} />
        ))}
      </Container>
      {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            className={styles.pagination}
          />
      )}
    </>
    
  );
};

export default Products;