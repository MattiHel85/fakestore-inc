import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Category, CategoryState } from '../../types/Category'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories')
      const data = await res.json()
      return data as Category[]
  } catch (err) {
      throw err;
  }
})

export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (categoryId: number) => {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories${categoryId}`)
    const data = await res.json()
    return data as Category[]
  } catch (err) {
      throw err;
  }
})

export const initialState: CategoryState = {
    categories: [],
    loading: false,
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
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred.';
          })
          .addCase(fetchCategoryById.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
          })
          .addCase(fetchCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred.';
          })
      },
      
})

export default categorySlice.reducer