import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';
import { updateProduct } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Typography, Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { ProductData } from '../types/Product';
import { updateProductProps } from '../types/Product';

const UpdateProduct: React.FC<updateProductProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [productData, setProductData] = useState<ProductData>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    images: [],
    categoryId: 0,
  });

  useEffect(() => {
    // Set initial values to the product data
    setProductData({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        images: product.images, 
        categoryId: product.category.id, 
    });

    dispatch(fetchCategories());
  }, [dispatch, product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (event: any) => {
    setProductData({ ...productData, categoryId: event.target.value });
  };

  

  const handleUpdateProduct = () => {
    const updatedProduct = {
        id: productData.id, 
        title: productData.title,
        description: productData.description,
        price: productData.price,
        images: productData.images,
        categoryId: productData.categoryId,
      };

    // Dispatch action to update the product
    dispatch(updateProduct(updatedProduct));
    console.log(`Product: ${updatedProduct.title} updated successfully`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrls = e.target.value.split(',');
    setProductData({ ...productData, images: imageUrls });
  };

  return (
    <>
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          margin: 'auto',
        }}
      >
        <TextField
          name='title'
          value={productData.title}
          onChange={handleInputChange}
          sx={{
            margin: '5px',
          }}
        />
        <TextField
          label='Description'
          name='description'
          value={productData.description}
          onChange={handleInputChange}
          sx={{
            margin: '5px',
          }}
        />
        <TextField
          label='Price'
          type='number'
          name='price'
          value={productData.price}
          onChange={handleInputChange}
          sx={{
            margin: '5px',
          }}
        />
        <Select
          label='Category'
          name='categoryId'
          value={productData.categoryId}
          onChange={handleCategoryChange}
          sx={{
            margin: '5px',
          }}
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
          value={productData.images.join(',')} // Join the array into a comma-separated string for the input value
          onChange={handleImageChange}
          sx={{
            margin: '5px',
          }}
        />
        <Button
          sx={{
            borderRadius: '25px',
            width: '40%',
            margin: 'auto',
            marginTop: '10px',
          }}
          onClick={handleUpdateProduct}
        >
          Update Product
        </Button>
      </Box>
    </>
  );
};

export default UpdateProduct
