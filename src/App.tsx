import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Products from './components/Products'
import Users from './components/Users'
import Categories from './components/Categories'
import AdminPanel from './components/AdminPanel'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SingleProduct from './components/SingleProduct'
import debouncedHandleAddToCart from './utils/cartHelpers'

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <TopAppBar />
          <NavBar />
          <Routes>
            {/* product routes */}
            <Route path='/categories' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<SingleProduct onAddToCart={debouncedHandleAddToCart}/>} />
            {/* <Route path='/cart' element={<Cart/>} /> */}

            {/* user routes  */}
            <Route path='/users' element={<Users />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />

            
            {/* admin routes */}
            <Route path='/admin' element={<AdminPanel />} />

          </Routes>
        </Router> 
      </StyledEngineProvider>
    </>
  )
}

export default App