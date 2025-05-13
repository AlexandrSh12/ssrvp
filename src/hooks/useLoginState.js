// src/hooks/useLoginState.jsx
import { useState, useEffect } from 'react';

//Кастомный хук для управления состоянием авторизации
//Предоставляет функции для входа/выхода и хранит информацию о пользователе в localStorage

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Проверяем состояние авторизации при загрузке
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    // Функция для входа пользователя
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
    };

    // Функция для выхода пользователя
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn,
        user,
        login,
        logout
    };
};

export default useLoginState;