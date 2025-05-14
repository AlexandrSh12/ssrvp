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
            <h3>Описание выполненной работы:</h3>
            <p>
                — Реализованы формы авторизации и регистрации с валидацией (React Hook Form).<br />
                — Обратная связь: форма и список отзывов присутствуют.<br />
                — Submit обрабатывается через useCallback.<br />
                — Кастомный хук useLoginState управляет статусом авторизации.<br />
                — При авторизации отображается приложение, иначе — форма входа.<br />
                — Статус сохраняется (context/localStorage).<br />
                — В правом верхнем углу отображается профиль с кнопкой выхода.
            </p>
        </div>
    );
};

export default Lab5;