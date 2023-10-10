import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload } from "../../types/Auth";

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({ email, password }: LoginPayload) => {
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
      const authProfileUrl = 'https://api.escuelajs.co/api/v1/auth/profile'
        const data = await res.json();
        try {
            const res = await fetch(authProfileUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            })

            if (!res.ok) {
                throw new Error('Something went wrong')
            }

            const profileData = await res.json()
            console.log(profileData)
            return profileData 
        } catch (error) {
            console.log(error)
            throw error
        }
    } catch (error) {
       return error
    }
})

export const logout = createAction('auth/logout')
export const loginFailure = createAction<string>('auth/loginFailure')

export const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload as string || 'An error occurred.';    
            })
            .addCase(logout, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginFailure, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default authSlice.reducer;
