import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Базовый URL API
const API_URL = 'https://jsonplaceholder.typicode.com'; // Имитация API сервера

// Асинхронные actions
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // В реальном приложении здесь бы был запрос к реальному API
            // Для имитации используем запрос на JSONPlaceholder
            const response = await axios.get(`${API_URL}/users`);

            // Имитация проверки учетных данных
            const user = response.data.find(
                user => user.email.toLowerCase() === credentials.email.toLowerCase()
            );

            if (user) {
                // Сохраняем пользователя в localStorage
                localStorage.setItem('user', JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    name: user.name
                }));

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    name: user.name
                };
            }

            return rejectWithValue('Неверный email или пароль');
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            // Имитация регистрации
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
            const userId = auth.user.id;

            // Имитация обновления профиля
            const response = await axios.put(`${API_URL}/users/${userId}`, userData);

            // Обновляем информацию в localStorage
            const updatedUser = { ...auth.user, ...userData };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return updatedUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoggedIn: Boolean(localStorage.getItem('user')),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка авторизации';
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                // После регистрации пользователь должен войти
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка регистрации';
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления профиля';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;