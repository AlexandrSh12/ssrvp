import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Базовый URL API
const API_URL = 'https://jsonplaceholder.typicode.com'; // Имитация API сервера

// Асинхронные actions
export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            // Используем JSONPlaceholder comments как имитацию отзывов
            const response = await axios.get(`${API_URL}/comments?_limit=10`);

            // Преобразуем данные для нашего формата
            return response.data.map(comment => ({
                id: comment.id,
                name: comment.name,
                email: comment.email,
                message: comment.body,
                rating: Math.floor(Math.random() * 5) + 1, // Имитация рейтинга
                date: new Date().toLocaleDateString()
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addFeedback = createAsyncThunk(
    'feedback/addFeedback',
    async (feedbackData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/comments`, feedbackData);

            // Для имитации возвращаем данные с дополнительными полями
            return {
                ...response.data,
                rating: feedbackData.rating,
                date: new Date().toLocaleDateString(),
                id: Date.now() // Гарантируем уникальность ID
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateFeedback = createAsyncThunk(
    'feedback/updateFeedback',
    async (feedbackData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/comments/${feedbackData.id}`,
                feedbackData
            );

            // Возвращаем обновленные данные
            return {
                ...response.data,
                rating: feedbackData.rating,
                date: feedbackData.date
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    'feedback/deleteFeedback',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/comments/${id}`);
            // Возвращаем ID для удаления из state
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    feedbacks: [],
    loading: false,
    error: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch feedbacks
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка загрузки отзывов';
            })
            // Add feedback
            .addCase(addFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks.push(action.payload);
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка добавления отзыва';
            })
            // Update feedback
            .addCase(updateFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.feedbacks.findIndex(f => f.id === action.payload.id);
                if (index !== -1) {
                    state.feedbacks[index] = action.payload;
                }
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления отзыва';
            })
            // Delete feedback
            .addCase(deleteFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка удаления отзыва';
            });
    },
});

export default feedbackSlice.reducer;