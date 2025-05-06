// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer
    }
});

// Для удобства можно также экспортировать типы
export * from './authSlice';
export * from './feedbackSlice';