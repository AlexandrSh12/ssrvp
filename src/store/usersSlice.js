// src/store/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile, deleteUserProfile } from './apiSlice';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        users: [],
        isLoading: false,
        error: null
    },
    reducers: {
        clearUsersError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Обработка загрузки профиля пользователя
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;

                // Обновляем пользователя в списке, если он там есть
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                } else {
                    state.users.push(action.payload);
                }
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка обновления профиля
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;

                // Обновляем пользователя в списке
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка удаления профиля
            .addCase(deleteUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = null;

                // Удаляем пользователя из списка
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;