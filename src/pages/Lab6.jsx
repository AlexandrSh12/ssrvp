import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { fetchFeedbacks, addFeedback, deleteFeedback } from '../redux/feedbackSlice';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import ProfileEditor from '../components/ProfileEditor';
import '../styles/lab6.css';

const Lab6 = () => {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(state => state.auth);
    const { feedbacks, loading, error } = useSelector(state => state.feedback);

    // Загружаем отзывы при монтировании компонента
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchFeedbacks());
        }
    }, [dispatch, isLoggedIn]);

    // Обработчик для выхода из системы
    const handleLogout = () => {
        dispatch(logout());
    };

    // Обработчик для добавления отзыва
    const handleAddFeedback = (feedbackData) => {
        dispatch(addFeedback({
            ...feedbackData,
            email: user.email // Добавляем email текущего пользователя
        }));
    };

    // Обработчик для удаления отзыва
    const handleDeleteFeedback = (feedbackId) => {
        dispatch(deleteFeedback(feedbackId));
    };

    // Если пользователь не авторизован, перенаправляем на страницу авторизации
    if (!isLoggedIn) {
        return (
            <div className="redirect-message">
                <h3>Для доступа к этой странице необходимо авторизоваться.</h3>
                <p>Пожалуйста, перейдите на страницу <a href="/lab5">Лабораторная 5</a> для авторизации.</p>
            </div>
        );
    }

    return (
        <div className="lab6-container">
            <div className="header">
                <h2>Лабораторная 6</h2>
                <div className="user-profile">
                    <span className="username">{user.username || user.email}</span>
                    <button className="logout-btn" onClick={handleLogout}>Выйти</button>
                </div>
            </div>

            <div className="main-content">
                <div className="profile-section">
                    <h3>Профиль пользователя</h3>
                    <ProfileEditor user={user} />
                </div>

                <div className="feedback-section">
                    <h3>Отзывы</h3>
                    <FeedbackForm onSubmit={handleAddFeedback} />

                    {loading ? (
                        <p>Загрузка отзывов...</p>
                    ) : error ? (
                        <p className="error">Ошибка: {error}</p>
                    ) : (
                        <FeedbackList
                            feedbacks={feedbacks}
                            onDelete={handleDeleteFeedback}
                            currentUserId={user.id}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lab6;