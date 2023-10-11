import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import { RootState } from './redux/slices/rootSlice'

import Users from './components/Users'
import AdminPanel from './components/AdminPanel'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SingleProduct from './components/SingleProduct'
import Header from './components/Header'
import Cart from './components/Cart'

import debouncedHandleAddToCart from './utils/cartHelpers'
// import Products from './components/Products'
import SingleUser from './components/SingleUser'
import ContactForm from './components/ContactForm'
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/ProductsPage'

const App = () => {
  const [productOfTheMonthId, setProductOfTheMonthId] = useState<number>()
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <Routes>

            {/* Home route */}
            <Route path='/' element={<LandingPage productOfTheMonthId={productOfTheMonthId} />} />
            {/* product routes */}
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<SingleProduct setProductOfTheMonthId={setProductOfTheMonthId} onAddToCart={debouncedHandleAddToCart}/>} />
            <Route path='/checkout' element={<><Header title='Checkout' />,<Cart/></>} />

            {/* user routes  */}
            <Route path='/signup' element={user ? <><Header title={`You're already signed in as user ${user.name}.`} />, <Header title='Log out in the top right corner if you wish to create a new account.'/></> : <SignUp />} />
            <Route path='/signin' element={user ? <><Header title={`You're already signed in as user ${user.name}`} />, </> : <><Header title='Sign In' />,<SignIn /></>} />
            <Route path='/users/:id' element={ <SingleUser />} />

            {/* misc routes  */}
            <Route path='/contact' element={ <ContactForm />} />


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