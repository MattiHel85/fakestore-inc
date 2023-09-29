import { combineReducers } from 'redux'

import productReducer from './productSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'

export const rootReducer = combineReducers({
    products: productReducer,
    users: userReducer,
    categories: categoryReducer,
    cart: cartReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>