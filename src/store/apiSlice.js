import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Базовый URL API (в реальном проекте вынес бы в .env)
const BASE_URL = 'http://localhost:3001/api';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // Добавляем токен авторизации из хранилища
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['User', 'Feedback'],
    endpoints: (builder) => ({
        // Аутентификация
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            invalidatesTags: ['User']
        }),

        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            })
        }),

        // Пользователи
        getCurrentUser: builder.query({
            query: () => '/users/me',
            providesTags: ['User']
        }),

        updateUser: builder.mutation({
            query: (updatedUser) => ({
                url: `/users/${updatedUser.id}`,
                method: 'PUT',
                body: updatedUser
            }),
            invalidatesTags: ['User']
        }),

        // Отзывы
        getFeedbacks: builder.query({
            query: () => '/feedbacks',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Feedback', id })), 'Feedback']
                    : ['Feedback']
        }),

        addFeedback: builder.mutation({
            query: (feedback) => ({
                url: '/feedbacks',
                method: 'POST',
                body: feedback
            }),
            invalidatesTags: ['Feedback']
        }),

        updateFeedback: builder.mutation({
            query: ({ id, ...feedback }) => ({
                url: `/feedbacks/${id}`,
                method: 'PUT',
                body: feedback
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Feedback', id }]
        }),

        deleteFeedback: builder.mutation({
            query: (id) => ({
                url: `/feedbacks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Feedback', id }]
        })
    })
});

// Экспорт хуков для использования в компонентах
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetCurrentUserQuery,
    useUpdateUserMutation,
    useGetFeedbacksQuery,
    useAddFeedbackMutation,
    useUpdateFeedbackMutation,
    useDeleteFeedbackMutation
} = apiSlice;

// Для интеграции с существующими слайсами
export const apiMiddleware = apiSlice.middleware;
export const apiReducer = apiSlice.reducer;