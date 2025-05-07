import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import feedbackReducer from './feedbackSlice';
import counterReducer from './counterSlice' // Импорт counterSlice

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        counter: counterReducer
    },
});

export default store;