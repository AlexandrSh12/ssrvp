import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Базовый URL API (можно заменить на ваш API)
const API_URL = 'https://jsonplaceholder.typicode.com/comments';

// Async thunks (объединяем старые и новые)
export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}?_limit=10`);
            return response.data.map(comment => ({
                id: comment.id,
                name: comment.name,
                email: comment.email,
                message: comment.body,
                rating: Math.floor(Math.random() * 5) + 1,
                date: new Date().toLocaleDateString(),
                status: 'active' // Добавляем статус из нового кода
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
            const response = await axios.post(API_URL, feedbackData);
            return {
                ...response.data,
                rating: feedbackData.rating,
                date: new Date().toLocaleDateString(),
                id: Date.now(),
                status: 'active' // Добавляем статус по умолчанию
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
                `${API_URL}/${feedbackData.id}`,
                feedbackData
            );
            return {
                ...response.data,
                rating: feedbackData.rating,
                date: feedbackData.date,
                status: feedbackData.status // Сохраняем статус
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
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleFeedbackStatus = createAsyncThunk(
    'feedback/toggleFeedbackStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            // Имитация PATCH-запроса к API
            const response = await axios.patch(`${API_URL}/${id}`, { status });
            return { id, status: response.data.status || status };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Объединённый initialState
const initialState = {
    feedbacks: [], // старое название (для совместимости)
    feedback: [], // новое название (можно использовать оба)
    loading: false, // старый статус
    status: 'idle', // новый статус ('idle' | 'loading' | 'succeeded' | 'failed')
    error: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch feedback (объединяем логику)
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.feedbacks = action.payload;
                state.feedback = action.payload; // Дублируем для совместимости
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.payload || 'Ошибка загрузки отзывов';
            })

            // Add feedback
            .addCase(addFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks.push(action.payload);
                state.feedback.push(action.payload);
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка добавления отзыва';
            })

            // Update feedback
            .addCase(updateFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.feedbacks.findIndex(f => f.id === action.payload.id);
                if (index !== -1) {
                    state.feedbacks[index] = action.payload;
                    state.feedback[index] = action.payload;
                }
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления отзыва';
            })

            // Delete feedback
            .addCase(deleteFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
                state.feedback = state.feedback.filter(f => f.id !== action.payload);
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка удаления отзыва';
            })

            // Toggle feedback status (новый action)
            .addCase(toggleFeedbackStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleFeedbackStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.feedbacks.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.feedbacks[index].status = action.payload.status;
                    state.feedback[index].status = action.payload.status;
                }
            })
            .addCase(toggleFeedbackStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка изменения статуса';
            });
    },
});

export default feedbackSlice.reducer;