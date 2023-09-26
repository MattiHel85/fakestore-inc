import { combineReducers } from 'redux'

import productReducer from './productSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'

export const rootReducer = combineReducers({
    products: productReducer,
    users: userReducer,
    categories: categoryReducer,
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>