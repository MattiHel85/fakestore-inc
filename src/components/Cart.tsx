import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { RootState } from '../redux/slices/rootSlice';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { AppDispatch } from '../redux/store';
import { CartProps } from '../types/Cart';

const Cart: React.FC<CartProps> = ({ handleGoToCheckout }) => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { items } = useSelector((state: RootState) => state.cart)
      
    
    const handleIncreaseQuantity = (productId: number) => {
        dispatch(increaseQuantity(productId));        
    };


    const handleDecreaseQuantity = (productId: number) => {
        dispatch(decreaseQuantity(productId));
    };  

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId)); 
      };
      
    const handleBrowse = () => {
      navigate('/products')
    }

  return (
    <>
        {items.length > 0 && (
            <>
                <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center' }} >Decrease Quantity</TableCell>
                          <TableCell sx={{ textAlign: 'center' }} >Increase Quantity</TableCell>
                          <TableCell sx={{ textAlign: 'center' }} >Product Name</TableCell>
                          <TableCell sx={{ textAlign: 'center' }} >Quantity</TableCell>
                          <TableCell sx={{ textAlign: 'center' }} >Remove From Cart</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items.map((item: any) => (
                          <TableRow key={item.id}>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <IconButton onClick={() => handleDecreaseQuantity(item.id)}>
                                <RemoveIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                                <AddIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{item.name}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{item.quantity}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                <Box 
                    sx={{
                        display:'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant='body2'>
                        Total Products: {items.reduce((total, item) => total + item.quantity, 0)}
                    </Typography>
                    <Typography variant='body2'>
                      Price: €
                      {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </Typography>
                    <Button onClick={handleGoToCheckout}>Go to checkout</Button>
                </Box>
            </>
        )}

        {items.length === 0 && (
            <Box sx={{
              padding: '1.75rem', 
              width: '30rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
              }}
            >
              <Typography variant='h5' sx={{marginTop: '1em', textAlign: 'center'}}>Cart Empty</Typography>
              <Typography variant='body1' sx={{marginTop: '1em', textAlign: 'center'}}>You've not added anything yet!</Typography>
                <Button sx={{
                  width: '50%',
                  margin: 'auto'
                }} 
                onClick={handleBrowse}
                >
                  Browse our products
                </Button>
            </Box>
        )}
    </>
        
  )
}

export default Cart