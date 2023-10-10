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
            <Typography sx={{textAlign: 'center', margin: '0.5em', marginBottom: '0.75em'}} variant='h3'>Product of the Month!</Typography>
              <Container
                sx={{
                  border: '2px solid rgb(0, 209, 255)',
                  borderRadius: '25px',
                  padding: '2em',
                  boxShadow: '0px 0px 15px 0px rgba(0, 209, 255, 0.5)'
                }}
              >              
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <img style={{width: '300px', borderRadius: '25px'}} src={product?.images?.[0]} 
                    alt={``} 
                  />
                  <Box
                    sx={{
                      width: '500px',
                      margin: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant='h4'>€{product?.price}</Typography>
                      <Typography variant='h4'>{product?.title}</Typography>
                    </Box>
                    <Box>
                    <Typography variant='body1'>{product?.description}</Typography>
                      { user?.role === 'admin' ?
                        <Button onClick={handleRemoveProductOfTheMonth}>Remove as P.O.M</Button> :
                        <></>
                      }
                      <Button onClick={handleAddToCart}>Add to cart</Button>
                    </Box>
                  </Box>
                </Box>
              </Container>
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