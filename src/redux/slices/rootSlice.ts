import { combineReducers } from 'redux'

import productReducer from './productSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'

export const rootReducer = combineReducers({
    products: productReducer,
    users: userReducer,
    categories: categoryReducer
})

export type RootState = ReturnType<typeof rootReducer>