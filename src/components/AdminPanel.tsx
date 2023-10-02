import React from 'react';
import { Typography } from '@mui/material';
import AddProduct from './AddProduct';
// import UpdateProduct from './UpdateProduct';

const AdminPanel: React.FC = () => {

  return (
    <>
      <Typography variant='h3' sx={{ textAlign: 'center', my: '2.5em' }}>
        Admin Panel
      </Typography>
      <AddProduct />
    </>
  );
};

export default AdminPanel;