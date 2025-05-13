// src/redux/api.js

//базовые функции для работы с API
//Предоставляет методы для работы с пользователями и отзывами

// Базовый URL API сервера
const API_URL = 'https://jsonplaceholder.typicode.com';

// Общая функция для выполнения запросов
const fetchWithAuth = async (endpoint, options = {}) => {
    // Добавляем заголовки по умолчанию
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Выполняем запрос
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Если статус не OK, выбрасываем ошибку
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: `Ошибка HTTP: ${response.status}`,
        }));
        throw new Error(error.message || `Ошибка HTTP: ${response.status}`);
    }

    // Если ответ пустой, возвращаем null
    if (response.status === 204) {
        return null;
    }

    // Парсим JSON
    return await response.json();
};

// API для работы с пользователями
export const usersApi = {
    // Получить профиль пользователя по ID
    getUserProfile: (userId) => fetchWithAuth(`/users/${userId}`),

    // Обновить профиль пользователя
    updateUserProfile: (userId, userData) => fetchWithAuth(`/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    }),

    // Удалить пользователя
    deleteUser: (userId) => fetchWithAuth(`/users/${userId}`, {
        method: 'DELETE',
    }),
};

// API для работы с отзывами
export const feedbackApi = {
    // Получить все отзывы
    getAllFeedbacks: () => fetchWithAuth('/feedbacks'),

    // Получить отзыв по ID
    getFeedback: (feedbackId) => fetchWithAuth(`/feedbacks/${feedbackId}`),

    // Создать новый отзыв
    createFeedback: (feedbackData) => fetchWithAuth('/feedbacks', {
        method: 'POST',
        body: JSON.stringify(feedbackData),
    }),

    // Обновить отзыв
    updateFeedback: (feedbackId, feedbackData) => fetchWithAuth(`/feedbacks/${feedbackId}`, {
        method: 'PUT',
        body: JSON.stringify(feedbackData),
    }),

    // Удалить отзыв
    deleteFeedback: (feedbackId) => fetchWithAuth(`/feedbacks/${feedbackId}`, {
        method: 'DELETE',
    }),
};

export default {
    users: usersApi,
    feedbacks: feedbackApi,
};