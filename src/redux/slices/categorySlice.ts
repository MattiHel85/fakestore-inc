import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Category, CategoryState } from '../../types/Category'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/categories')
        const data = await res.json()
        console.log(data)
        return data as Category[]
    } catch (err) {
        throw err;
    }
})

const initialState: CategoryState = {
    categories: [],
    loading: true,
    error: null
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.error = null;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.categories = [];
            state.error = action.error.message || 'An error occurred.';
          });
      },
      
})

export default categorySlice.reducer