export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string |null;
    refreshToken: string | null;
    user: any,
    error: string | null;
}

