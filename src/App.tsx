import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import { RootState } from './redux/slices/rootSlice'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Products from './components/Products'
import Users from './components/Users'
import Categories from './components/Categories'
import AdminPanel from './components/AdminPanel'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SingleProduct from './components/SingleProduct'
import Header from './components/Header'
import Cart from './components/Cart'

import debouncedHandleAddToCart from './utils/cartHelpers'
import UserCard from './components/UserCard'
import ProductSearch from './components/ProductSearch'

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Router>
          <TopAppBar />
          <NavBar />
          <Routes>

            {/* Home route */}
            <Route path='/' element={<Header title='Welcome Home!' /> } />

            {/* product routes */}
            <Route path='/productsearch' element={<ProductSearch />} />
            <Route path='/products' element={<ProductSearch />} />
            <Route path='/products/:id' element={<SingleProduct onAddToCart={debouncedHandleAddToCart}/>} />
            <Route path='/checkout' element={<Cart/>} />

            {/* user routes  */}
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={[<Header title='Sign In' />,<SignIn />]} />
            <Route path='/myprofile' element={<UserCard user={user} />} />

            
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