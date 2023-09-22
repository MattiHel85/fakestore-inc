import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Box } from "@mui/material"

import Products from './Products';
import Users from './Users';


const Container: React.FC = () => {
  return (
    <Box>
        <Router>
          <Routes>
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </Router>      
    </Box>
  )
}

export default Container