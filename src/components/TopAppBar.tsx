import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';

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
                <StyledBadge badgeContent={4} color="secondary">
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
              <MenuItem>
                <Button>Go to checkout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopAppBar;