import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { User, UserState } from '../../types/User'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/users')
        const data = await res.json()
        console.log(data)
        return data as User[]
    } catch (err) {
        throw err;
    }
})

const initialState: UserState = {
    users: [],
    loading: true,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message || 'An error occurred.';
          });
      },
      
})

export default userSlice.reducer