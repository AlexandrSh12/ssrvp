// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API для работы с пользователями
export const usersApi = {
    // Получить всех пользователей
    getAll: () => api.get('/users'),

    // Получить одного пользователя по ID
    getById: (id) => api.get(`/users/${id}`),

    // Создать пользователя
    create: (userData) => api.post('/users', userData),

    // Обновить данные пользователя
    update: (id, userData) => api.put(`/users/${id}`, userData),

    // Удалить пользователя
    delete: (id) => api.delete(`/users/${id}`)
};

// API для работы с отзывами
export const feedbacksApi = {
    // Получить все отзывы
    getAll: () => api.get('/feedbacks'),

    // Получить один отзыв по ID
    getById: (id) => api.get(`/feedbacks/${id}`),

    // Создать отзыв
    create: (feedbackData) => api.post('/feedbacks', feedbackData),

    // Обновить отзыв
    update: (id, feedbackData) => api.put(`/feedbacks/${id}`, feedbackData),

    // Удалить отзыв
    delete: (id) => api.delete(`/feedbacks/${id}`)
};

// API для работы с профилем
export const profileApi = {
    // Получить профиль
    get: () => api.get('/profile'),

    // Обновить профиль
    update: (profileData) => api.put('/profile', profileData)
};

export default {
    users: usersApi,
    feedbacks: feedbacksApi,
    profile: profileApi
};