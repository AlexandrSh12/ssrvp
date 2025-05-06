// src/store/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feedbackApi, usersApi } from './api.js';

// Асинхронные thunks для работы с пользователями
export const fetchUserProfile = createAsyncThunk(
    'api/fetchUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            return await usersApi.getUserProfile(userId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'api/updateUserProfile',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            return await usersApi.updateUserProfile(userId, userData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUserProfile = createAsyncThunk(
    'api/deleteUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            await usersApi.deleteUser(userId);
            return userId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронные thunks для работы с отзывами
export const fetchAllFeedbacks = createAsyncThunk(
    'api/fetchAllFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            return await feedbackApi.getAllFeedbacks();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createFeedback = createAsyncThunk(
    'api/createFeedback',
    async (feedbackData, { rejectWithValue }) => {
        try {
            return await feedbackApi.createFeedback(feedbackData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateFeedback = createAsyncThunk(
    'api/updateFeedback',
    async ({ feedbackId, feedbackData }, { rejectWithValue }) => {
        try {
            return await feedbackApi.updateFeedback(feedbackId, feedbackData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    'api/deleteFeedback',
    async (feedbackId, { rejectWithValue }) => {
        try {
            await feedbackApi.deleteFeedback(feedbackId);
            return feedbackId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice для состояния API
const apiSlice = createSlice({
    name: 'api',
    initialState: {
        user: null,
        feedbacks: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearApiError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка запросов профиля пользователя
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
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
                state.user = action.payload;
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
            .addCase(deleteUserProfile.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(deleteUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка запросов отзывов
            .addCase(fetchAllFeedbacks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchAllFeedbacks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка создания отзыва
            .addCase(createFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks.push(action.payload);
            })
            .addCase(createFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка обновления отзыва
            .addCase(updateFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.feedbacks.findIndex(f => f.id === action.payload.id);
                if (index !== -1) {
                    state.feedbacks[index] = action.payload;
                }
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка удаления отзыва
            .addCase(deleteFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearApiError } = apiSlice.actions;
export default apiSlice.reducer;