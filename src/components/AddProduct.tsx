import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';
import { createProduct } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { ProductData } from '../types/Product';
import styles from '../styles/styles.module.css'
import { Category } from '../types/Category';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';


const AddProduct: React.FC = () => {
  const {language} = useLanguage();
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
      <Typography variant='h4' sx={{ textAlign: 'center', my: '2.5em' }}>{getTranslation(language, 'Add product')}</Typography>
        <form className={styles.productForm} onSubmit={handleAddProduct}>
          <TextField
            label={getTranslation(language, 'Name')}
            name='title'
            value={productData.title}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <TextField
            label={getTranslation(language, 'Description')}
            name='description'
            value={productData.description}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <TextField
            label={getTranslation(language, 'Price')}
            type='number'
            name='price'
            value={productData.price}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <Select
            label={getTranslation(language, 'Category')}
            name='categoryId'
            value={productData.categoryId}
            onChange={handleCategoryChange}
            className={styles.textField}
          >
            <MenuItem value={0}>{getTranslation(language, 'Select Category')}</MenuItem>
            {categories.map((category: Category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label={getTranslation(language, 'Image URLs (comma-separated)')}
            name='images'
            value={productData.images.join(',')} 
            onChange={handleImageChange}
            className={styles.textField}
          />
          <Button
            type="submit"
            className={styles.primaryButton}
          >
            {getTranslation(language, 'Add product')}
          </Button>
        </form>
    </>
  );
};

export default AddProduct;