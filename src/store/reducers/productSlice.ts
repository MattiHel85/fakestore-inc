import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Product, ProductState } from '../../types/types'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await res.json()
        console.log(data)
        return data as Product[]
    } catch (err) {
        throw err;
    }
})

const initialState: ProductState = {
    products: [],
    loading: true,
    error: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message || 'An error occurred.';
          });
      },
      
})

export default productSlice.reducer