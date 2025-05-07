import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedbacks } from '../redux/feedbackSlice';
import LoadingSpinner from './LoadingSpinner';

const FeedbackList = ({
                          onDelete,
                          currentUserId,
                          readOnly = false
                      }) => {
    const dispatch = useDispatch();
    const { feedback, status, error } = useSelector((state) => state.feedback);

    // Загрузка отзывов из Redux (новая функциональность)
    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    // Состояние загрузки и ошибки (новая функциональность)
    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">Ошибка: {error}</div>;
    }

    // Фильтрация отзывов (новая функциональность + старая)
    const displayFeedback = readOnly
        ? feedback.filter(item => item.status === 'active') // Фильтр по статусу
        : feedback;

    // Дополнительная фильтрация для кнопки удаления (старая функциональность)
    const canDelete = (feedbackItem) => {
        return (
            (feedbackItem.email === currentUserId ||
                feedbackItem.userId === currentUserId) &&
            !readOnly
        );
    };

    if (displayFeedback.length === 0) {
        return <div className="no-feedback">Пока нет отзывов.</div>;
    }

    return (
        <div className="feedback-list">
            <h3>Отзывы пользователей</h3>
            <ul>
                {displayFeedback.map(item => (
                    <li key={item.id} className="feedback-item">
                        <div className="feedback-header">
                            <strong>{item.name}</strong>
                            {item.rating && <span>Оценка: {item.rating}/5</span>}
                            {item.email && <span className="feedback-email">{item.email}</span>}
                            {item.date && <span>{item.date}</span>}
                        </div>
                        <p className="feedback-message">{item.message}</p>

                        {/* Кнопка удаления (старая функциональность) */}
                        {canDelete(item) && (
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(item.id)}
                            >
                                Удалить
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackList;