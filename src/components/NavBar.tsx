import * as React from 'react';
import { Link } from 'react-router-dom';
import {Box, Typography} from '@mui/material';


const NavBar: React.FC = () => {
    
    const navItems = [
      { id: 1,  label: 'All products', path: '/products' },
      { id: 2,  label: 'Cart', path: '/checkout' },
      { id: 3,  label: 'Support', path: '/support' },
    ];
    return (
      <Box
        sx={{
          backgroundColor: 'rgb(0, 209, 255)',
          height: '40px'
        }}
      >
        <Box 
          sx={{
            width: '80%', 
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {navItems.map((navItem) => 
          <Link key={navItem.id} to={navItem.path} style={{textDecoration:'none'}}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                color: 'white',
                fontWeight: 600,
                mx: {xs: '1em', md:'5em'},
                padding: {xs: '.75rem', md: '.5rem'},
                fontSize: {xs: '12px', md: '18px'}
              }}
            >
              {navItem.label}
            </Typography>
          </Link>
          )}
        </Box>
      </ Box>
    );
}

export default NavBar;