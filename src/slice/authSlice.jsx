import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
    id: parsedUser?.id || null,
    email: parsedUser?.email || null,
    role: parsedUser?.role || null,
    isAuthenticated: !!parsedUser,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { id, email, role } = action.payload;
            state.id = id;
            state.email = email;
            state.role = role;
            state.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify({ id, email, role }));
        },
        logout(state) {
            state.id = null;
            state.email = null;
            state.role = null;
            state.isAuthenticated = false;

            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
