// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import feedbackReducer from './feedbackSlice';
import counterReducer from './counterSlice'; // Импорт counterSlice
import { api } from './apiSlice'; // Импорт созданного API

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        counter: counterReducer,
        [api.reducerPath]: api.reducer, // Добавляем редьюсер RTK Query
    },
    // Добавляем middleware для кэширования и других функций RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;