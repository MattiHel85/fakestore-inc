import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';
import { createProduct } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Typography, Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { ProductData } from '../types/Product';
import styles from '../styles/AddProduct.module.css';
// import buttonStyles from '../styles/Button.module.css';

const AddProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [productData, setProductData] = useState<ProductData>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    images: [],
    categoryId: 0
  });

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (event: any) => {
    setProductData({ ...productData, categoryId: event.target.value });
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    setProductData({
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: [],
      categoryId: 0
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrls = e.target.value.split(',');
    setProductData({ ...productData, images: imageUrls });
  };

  return (
    <>
      <Typography variant='h4' sx={{ textAlign: 'center', my: '2.5em' }}>Add Product</Typography>
        <form className={styles.productForm} onSubmit={handleAddProduct}>
          <TextField
            label='Title'
            name='title'
            value={productData.title}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <TextField
            label='Description'
            name='description'
            value={productData.description}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <TextField
            label='Price'
            type='number'
            name='price'
            value={productData.price}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <Select
            label='Category'
            name='categoryId'
            value={productData.categoryId}
            onChange={handleCategoryChange}
            className={styles.textField}
          >
            <MenuItem value={0}>Select Category</MenuItem>
            {categories.map((category: any) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label='Image URLs (comma-separated)'
            name='images'
            value={productData.images.join(',')} 
            onChange={handleImageChange}
            className={styles.textField}
          />
          <Button
            type="submit"
            className={styles.primaryButton}
          >
            Add Product
          </Button>
        </form>
    </>
  );
};

export default AddProduct;