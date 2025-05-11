// src/pages/Lab5.jsx
import React, { useCallback } from 'react';
import AuthForms from '../components/AuthForm';
import FeedbackSection from '../components/FeedbackSection';
import UserProfile from '../components/UserProfile';
import useLoginState from '../hooks/useLoginState';


const Lab5 = () => {
    // Используем кастомный хук для управления состоянием авторизации
    const { isLoggedIn, user, login, logout } = useLoginState();

    // Обработчик события входа (используем useCallback)
    const handleLogin = useCallback((userData) => {
        // В реальном приложении здесь был бы API запрос
        login(userData);
    }, [login]);

    // Обработчик выхода (используем useCallback)
    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <div className="lab5-container">
            <div className="header">
                <h2>Лабораторная 5</h2>
                {isLoggedIn && <UserProfile user={user} onLogout={handleLogout} />}
            </div>

            {!isLoggedIn ? (
                <AuthForms onLogin={handleLogin} />
            ) : (
                <div className="main-content">
                    <h3>Добро пожаловать, {user.username || user.email}!</h3>
                    <p>Вы успешно авторизовались в системе.</p>

                    <FeedbackSection />
                </div>
            )}
        </div>
    );
};

export default Lab5;