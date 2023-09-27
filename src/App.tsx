import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Products from './components/Products'
import Users from './components/Users'
import Categories from './components/Categories'

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <TopAppBar />
          <NavBar />
          <Routes>
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
            <Route path='/categories' element={<Categories />} />
          </Routes>
        </Router> 
      </StyledEngineProvider>
    </>
  )
}

export default App