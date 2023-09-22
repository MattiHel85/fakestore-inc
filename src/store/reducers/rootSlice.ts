import { combineReducers } from 'redux'

import productReducer from './productSlice'
import userReducer from './userSlice'

export const rootReducer = combineReducers({
    products: productReducer,
    users: userReducer
})

export type RootState = ReturnType<typeof rootReducer>