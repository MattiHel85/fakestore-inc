import { configureStore, AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk'

import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import {rootReducer, RootState} from "./slices/rootSlice";

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>


export const store = configureStore({
    reducer: {
        rootReducer,
        products: productReducer,
        users: userReducer
    },
})