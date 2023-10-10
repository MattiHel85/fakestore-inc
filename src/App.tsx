import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import { RootState } from './redux/slices/rootSlice'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Users from './components/Users'
import AdminPanel from './components/AdminPanel'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SingleProduct from './components/SingleProduct'
import Header from './components/Header'
import Cart from './components/Cart'

import debouncedHandleAddToCart from './utils/cartHelpers'
import ProductSearch from './components/Products'
import SingleUser from './components/SingleUser'
import Home from './components/Home'
import { Product } from './types/Product'

const App = () => {
  const [productOfTheMonth, setProductOfTheMonth] = useState<Product>()
  const [productOfTheMonthId, setProductOfTheMonthId] = useState<number>()
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <TopAppBar />
          <NavBar />
          <Routes>

            {/* Home route */}
            <Route path='/' element={<Home productOfTheMonthId={productOfTheMonthId} setProductOfTheMonth={setProductOfTheMonth} productOfTheMonth={productOfTheMonth} onAddToCart={debouncedHandleAddToCart}/> } />

            {/* product routes */}
            <Route path='/products' element={<ProductSearch />} />
            <Route path='/products/:id' element={<SingleProduct setProductOfTheMonthId={setProductOfTheMonthId} onAddToCart={debouncedHandleAddToCart}/>} />
            <Route path='/checkout' element={<><Header title='Checkout' />,<Cart/></>} />

            {/* user routes  */}
            <Route path='/signup' element={user ? <><Header title={`You're already signed in as user ${user.name}.`} />, <Header title='Log out in the top right corner if you wish to create a new account.'/></> : <SignUp />} />
            <Route path='/signin' element={user ? <><Header title={`You're already signed in as user ${user.name}`} />, </> : <><Header title='Sign In' />,<SignIn /></>} />
            <Route path='/users/:id' element={ <SingleUser />} />

            
            {/* admin routes */}
            <Route path='/users' element={ user?.role=== 'admin' ? <Users /> : <Header title='Access to users denied!'/>} />
            <Route path='/admin' element={ user?.role=== 'admin' ? <AdminPanel /> : <Header title='Access to admin panel denied!'/>} />

          </Routes>
        </Router> 
      </StyledEngineProvider>
    </>
  )
}

export default App