// src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Создаем API с использованием RTK Query
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com', // Используем публичный API для тестирования
        // Вы можете заменить на 'http://localhost:3001', если ваш сервер работает
    }),
    endpoints: (builder) => ({
        // Эндпоинт для получения всех постов
        getPosts: builder.query({
            query: () => '/posts',
            // Добавляем обработку ошибок
            transformResponse: (response) => response,
            transformErrorResponse: (response, meta, arg) => {
                return response.error || 'Ошибка при загрузке данных';
            }
        }),

        // Эндпоинт для получения одного поста по ID
        getPostById: builder.query({
            query: (id) => `/posts/${id}`,
        }),

        // Другие эндпоинты можно добавить здесь по мере необходимости
    }),
});

// Экспортируем хуки для использования в компонентах
export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
} = api;