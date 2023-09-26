import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';

import { RootState } from "../redux/slices/rootSlice";
import { Product } from '../types/Product';
import { AppDispatch } from '../redux/store';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function TopAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(null); // Add state for cart menu

  const dispatch: AppDispatch = useDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => { // Add handler for cart menu
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCartMenu = () => { // Add handler for closing cart menu
    setAnchorElCart(null);
  };

  const { items } = useSelector((state: RootState) => state.cart)

  const handleIncreaseQuantity = (productId: any) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: any) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveFromCart = (productId: any) => {
    dispatch(removeFromCart(productId))
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center', // Align items vertically
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.1rem',
              fontSize: {xs: '1.25rem', md: '1.5rem'},
              color: 'black',
              textDecoration: 'none',
              flexGrow: 1, // Expand to fill available space
            }}
          >
            Fake Shop Inc
          </Typography>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="sign in">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black', mr: '0.005em' }}>
                <Typography sx={{mr: '.25em',fontSize: {xs: '1rem', md: '1.5rem'}}} >
                  sign in 
                </Typography>
                <LoginIcon 
                  sx={{
                    color: 'black',
                    mr: '.5em'
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  padding: '16px'
                }}
              >
                <MenuItem>
                  <TextField label="Username" sx={{borderRadius: '25px !important'}}/>
                </MenuItem>
                <MenuItem>
                  <TextField label="Password" type="password" />
                </MenuItem>
                <MenuItem>
                  <Button sx={{borderRadius: '25px'}}>Sign In</Button>
                </MenuItem>
                <MenuItem>
                  <Typography>FORGOT YOUR PASSWORD?</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>SIGN UP</Typography>
                </MenuItem>
              </Box>
            </Menu>
          </Box>

          {/* Cart Menu */}
          {/* Add the badge component from MUI instead of having the amount of items in brackets */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open cart">
              <IconButton onClick={handleOpenCartMenu} sx={{ p: 0 }}>
                <StyledBadge badgeContent={items.reduce((total, item) => total + item.quantity, 0)} color="secondary">
                  <ShoppingCartIcon 
                  sx={{
                    color: 'black'
                  }}
                  />
                </StyledBadge>
              </IconButton>
            </Tooltip>
             
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElCart}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
            >
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
                      {items.map((item) => (
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
                <MenuItem
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
                <Button>Go to checkout</Button>
              </MenuItem>
                </>
              ) }
              
              {items.length === 0 && (
                <Box sx={{padding: '1.75rem', width: '20rem'}}>
                  <Typography variant='h5' sx={{marginTop: '1em', textAlign: 'center'}}>Cart Empty</Typography>
                  <Typography variant='body1' sx={{marginTop: '1em', textAlign: 'center'}}>You've not added anything yet!</Typography>
                </Box>
              )}

            </Menu>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopAppBar;
