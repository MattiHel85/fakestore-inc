export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string |null;
    refreshToken: string | null;
    user: any,
    loading: boolean;
    error: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

