// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import apiReducer from './apiSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        feedback: feedbackReducer,
        api: apiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;