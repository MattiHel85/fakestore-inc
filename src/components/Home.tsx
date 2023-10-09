import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store';
import { fetchProductById } from '../redux/slices/productSlice';
import { removeProductOfTheMonth } from '../redux/slices/productSlice';
import { RootState } from '../redux/slices/rootSlice';
import { Typography, Container, Box, Button } from "@mui/material"
import { HomeProps } from '../types/types';


const Home: React.FC<HomeProps> = ( {productOfTheMonthId, onAddToCart} ) => {
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const product = useSelector((state: RootState) => state.products.product)
  const user = useSelector((state: RootState) => state.auth.user)
  
  useEffect(() => {
    if (productOfTheMonthId) {
        dispatch(fetchProductById(productOfTheMonthId));
    }
  }, [dispatch, productOfTheMonthId]);

  const handleAddToCart = () => {
    product && onAddToCart(product, items, dispatch)
    console.log('Added to cart: ', product)
  };

  const handleRemoveProductOfTheMonth = () => {
    dispatch(removeProductOfTheMonth());
  };

  return (
    <>
      <Container
        sx={{
          display:'flex',
          flexDirection: 'column',
          padding: '2.75em'
        }}
      >
        {
          product ? 
            <>
            <Typography sx={{textAlign: 'center', margin: '0.5em'}} variant='h3'>Product of the Month!</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <img style={{width: '500px', margin: 'auto'}} src={product?.images?.[0]} 
                  alt={``} 
                />
                <Box
                  sx={{
                    width: '500px',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'space-around'
                  }}
                >
                  <Typography variant='h4'>€{product?.price}</Typography>
                  <Typography variant='h4'>{product?.title}</Typography>
                </Box>
                <Typography variant='body1'>{product?.description}</Typography>

                { user?.role === 'admin' ?
                  <Button onClick={handleRemoveProductOfTheMonth}>Remove as P.O.M</Button> :
                  <></>
                }
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </Box>
            </> : 
            <>
              <Typography
              variant="h6"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', 
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '.1rem',
                fontSize: {xs: '1.25rem', md: '1.5rem'},
                color: 'black',
                textDecoration: 'none'
              }}
              > 
                Welcome to Fake Shop Inc!
              </Typography>
            </>
        }
      </Container>
    </>
  )
}

export default Home