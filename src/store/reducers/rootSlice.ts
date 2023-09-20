import { combineReducers } from 'redux'
import productReducer from './productSlice'
import { RootState } from '../../types/types'

const rootReducer = combineReducers<RootState>({
    products: productReducer
})

export default rootReducer;