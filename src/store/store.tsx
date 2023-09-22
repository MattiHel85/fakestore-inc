import { configureStore, AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk'

import productReducer from './reducers/productSlice'
import userReducer from './reducers/userSlice'
import {rootReducer, RootState} from "./reducers/rootSlice";

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>


export const store = configureStore({
    reducer: {
        rootReducer,
        products: productReducer,
        users: userReducer
    },
})