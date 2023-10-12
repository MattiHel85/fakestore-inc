import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Product, ProductOfTheMonthState } from '../../types/Product'

export const initialState: ProductOfTheMonthState = {
  productOfTheMonth: null,
  loading: false,
  error: null
}

export const fetchProductOfTheMonthById = createAsyncThunk('products/fetchProductOfTheMonthById', async (productId: Number) => {
  
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
    const data = await res.json()
    return data as Product
  } catch (err) {
      throw err;
  }
});



export const productOfTheMonthSlice = createSlice({
    name: 'productOfTheMonth',
    initialState,
    reducers: {
      removeProductOfTheMonth: (state) => {
        state.productOfTheMonth = null
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProductOfTheMonthById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProductOfTheMonthById.fulfilled, (state, action) => {
              state.loading = false;
              state.productOfTheMonth = action.payload;
              state.error = null;
          })
          .addCase(fetchProductOfTheMonthById.rejected, (state, action) => {
              state.loading = false;
              state.productOfTheMonth = null;
              state.error = action.error.message || 'An error occurred.';
          })
      },
      
})

export const { removeProductOfTheMonth } = productOfTheMonthSlice.actions;
export default productOfTheMonthSlice.reducer