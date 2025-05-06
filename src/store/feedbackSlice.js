// src/store/feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feedbackApi } from './api.js';

// Асинхронный thunk для получения всех отзывов
export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await feedbacksApi.getAll();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронный thunk для добавления отзыва
export const createFeedback = createAsyncThunk(
    'feedback/create',
    async (feedbackData, { rejectWithValue }) => {
        try {
            const response = await feedbacksApi.create({
                ...feedbackData,
                date: new Date().toLocaleDateString()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронный thunk для обновления отзыва
export const updateFeedback = createAsyncThunk(
    'feedback/update',
    async ({ id, feedbackData }, { rejectWithValue }) => {
        try {
            const response = await feedbacksApi.update(id, {
                ...feedbackData,
                // Сохраняем оригинальную дату создания
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронный thunk для удаления отзыва
export const deleteFeedback = createAsyncThunk(
    'feedback/delete',
    async (id, { rejectWithValue }) => {
        try {
            await feedbacksApi.delete(id);
            return id; // Возвращаем ID удаленного отзыва
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Создаем slice для отзывов
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedbacks: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        // Legacy синхронный action для добавления отзыва (оставляем для совместимости)
        addFeedback: (state, action) => {
            state.feedbacks.push(action.payload);
        },
        // Сбросить состояние ошибки
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Обработка fetchFeedbacks
            .addCase(fetchFeedbacks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка createFeedback
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

            // Обработка updateFeedback
            .addCase(updateFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.feedbacks.findIndex(feedback => feedback.id === action.payload.id);
                if (index !== -1) {
                    state.feedbacks[index] = action.payload;
                }
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Обработка deleteFeedback
            .addCase(deleteFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = state.feedbacks.filter(feedback => feedback.id !== action.payload);
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { addFeedback, clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;