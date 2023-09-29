import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import Header from './Header';
import ProductCard from './ProductCard';

import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

import { AppDispatch } from '../redux/store';

import { fetchProducts } from '../redux/slices/productSlice';
import { addToCartAsync, clearCart } from "../redux/slices/cartSlice";
import { RootState } from "../redux/slices/rootSlice";

import { Product } from '../types/Product';
import { CartItem } from '../types/Cart';



const Products: React.FC = () => {
  const { products, loading, error } = useSelector((state: any) => state.products);
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 5; // You can adjust the number of items per page
  const { items } = useSelector((state: RootState) => state.cart)
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('Cart Items:', items);
  // }, [items]);

  const handleAddToCart = (product: Product) => {
    // Check if the product is already in the cart
    const existingCartItem = items.find((item) => item.id === product.id);
  
    if (existingCartItem) {
      // If the product is in the cart, update its quantity
      const updatedCartItems = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      dispatch(clearCart()); // Clear the cart
      updatedCartItems.forEach((item) => dispatch(addToCartAsync(item))); // Add updated items
  
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const cartItem: CartItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      };
  
      dispatch(addToCartAsync(cartItem)); // Add a new item

    }
  };
  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
  
    return (...args: any) => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  
  const debouncedHandleAddToCart = debounce(handleAddToCart, 750);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box>
      <Header title='Products' />
      <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        
        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {currentItems.map((product: Product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={debouncedHandleAddToCart}
          />
        ))}
      </Box>
      <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            width: '30%',
            margin: 'auto',
            marginTop: '2em',
            marginBottom: '2em'
          }}
        />
    </ Box>
  );
};

export default Products;