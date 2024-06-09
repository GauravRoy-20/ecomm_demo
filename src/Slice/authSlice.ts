import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.setItem('isAuthenticated', 'false');
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;
