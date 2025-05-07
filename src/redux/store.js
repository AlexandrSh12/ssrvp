import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import feedbackReducer from './feedbackSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
    },
});

export default store;