import * as React from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const NavBar: React.FC = () => {
    
    const navItems = [
      { id: 1,  label: 'Categories', path: '/categories' },
      { id: 2,  label: 'Offers', path: '/offerss' },
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
            <Typography
              key={navItem.id}
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
          )}
        </Box>
      </ Box>
    );
}

export default NavBar;