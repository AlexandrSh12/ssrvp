// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from './api.js';

// Асинхронный thunk для входа пользователя
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // Получаем всех пользователей и ищем совпадение по email и паролю
            const response = await usersApi.getAll();
            const user = response.data.find(u => u.email === email && u.password === password);

            if (!user) {
                return rejectWithValue('Неверные учетные данные');
            }

            // Возвращаем данные пользователя без пароля
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронный thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            // Проверяем, существует ли пользователь с таким email
            const usersResponse = await usersApi.getAll();
            const existingUser = usersResponse.data.find(u => u.email === userData.email);

            if (existingUser) {
                return rejectWithValue('Пользователь с таким email уже существует');
            }

            // Создаем нового пользователя
            const response = await usersApi.create(userData);

            // Возвращаем данные пользователя без пароля
            const { password: _, ...userWithoutPassword } = response.data;
            return userWithoutPassword;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронный thunk для обновления профиля пользователя
export const updateUserProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const response = await usersApi.update(id, userData);

            // Возвращаем обновленные данные пользователя без пароля
            const { password: _, ...userWithoutPassword } = response.data;
            return userWithoutPassword;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Создаем slice для авторизации
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        // Синхронный action для входа (используется для имитации из localStorage)
        login: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        // Действие для выхода
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
            localStorage.removeItem('userName');
            localStorage.removeItem('autoLogin');
        },
        // Сброс ошибки
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Обработка loginUser
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка registerUser
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // При регистрации не входим автоматически
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка updateUserProfile
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;