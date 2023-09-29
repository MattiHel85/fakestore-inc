import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/Auth";

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({ email, password }: { email: string, password: string }) => {
    const auth_url = 'https://api.escuelajs.co/api/v1/auth/login';
    const userData = { email, password}
    try {
      const res = await fetch(auth_url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });   
      if(!res.ok){
        throw new Error('Authentication failed');
      } 
      const data = await res.json();
      return data;
    } catch (error: any) {
       throw error.message;
    }
})

export const logout = createAction('auth/logout')
export const loginFailure = createAction<string>('auth/loginFailure')

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState, // Specify the initial state here
    reducers: {}, // Define your action creators here
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(logout, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.user = null;
                state.error = null;
            })
            .addCase(loginFailure, (state, action) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.user = null;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
