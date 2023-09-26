import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Box } from "@mui/material"

import Products from './Products';
import Users from './Users';
import Categories from './Categories';


const Container: React.FC = () => {
  return (
    <Box 
      sx={{width: '80%', margin: 'auto'}}
    >
        <Router>
          <Routes>
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
            <Route path='/categories' element={<Categories />} />
          </Routes>
        </Router>      
    </Box>
  )
}

export default Container