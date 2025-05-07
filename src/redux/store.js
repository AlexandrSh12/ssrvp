import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import counterReducer from './counterSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // Отключаем проверку на сериализуемость для большей гибкости
        })
});

export default store;