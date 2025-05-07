import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Базовый URL API
const API_URL = 'https://jsonplaceholder.typicode.com';

// Асинхронные actions
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // Старая реализация с проверкой через API
            const response = await axios.get(`${API_URL}/users`);
            const user = response.data.find(
                user => user.email.toLowerCase() === credentials.email?.toLowerCase()
            );

            if (user) {
                localStorage.setItem('user', JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    role: user.username === 'admin' ? 'admin' : 'user'
                }));

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    role: user.username === 'admin' ? 'admin' : 'user'
                };
            }

            // Новая реализация с фиксированными пользователями
            if (credentials.username === 'admin' && credentials.password === 'admin') {
                const adminUser = { id: 1, username: 'admin', role: 'admin' };
                localStorage.setItem('user', JSON.stringify(adminUser));
                return adminUser;
            }
            if (credentials.username === 'user' && credentials.password === 'user') {
                const regularUser = { id: 2, username: 'user', role: 'user' };
                localStorage.setItem('user', JSON.stringify(regularUser));
                return regularUser;
            }

            return rejectWithValue('Неверные учетные данные');
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const response = await axios.put(`${API_URL}/users/${auth.user.id}`, userData);
            const updatedUser = { ...auth.user, ...userData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('user');
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Начальное состояние
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoggedIn: Boolean(localStorage.getItem('user')),
    isAuthenticated: Boolean(localStorage.getItem('user')),
    loading: false,
    status: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // Сохраняем синхронный logout для совместимости
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.isLoggedIn = false;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.payload || 'Ошибка авторизации';
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.payload || 'Ошибка регистрации';
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.payload || 'Ошибка обновления профиля';
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isAuthenticated = false;
                state.status = 'idle';
            });
    }
});

// Экспортируем все actions
export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;