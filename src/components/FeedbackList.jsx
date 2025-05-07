import React from 'react';

const FeedbackList = ({ feedbacks, onDelete, currentUserId }) => {
    if (!feedbacks || feedbacks.length === 0) {
        return <p>Пока нет отзывов.</p>;
    }

    return (
        <div className="feedback-list">
            <ul>
                {feedbacks.map(feedback => (
                    <li key={feedback.id} className="feedback-item">
                        <div className="feedback-header">
                            <strong>{feedback.name}</strong>
                            <span>Оценка: {feedback.rating}/5</span>
                            <span>{feedback.date}</span>
                        </div>
                        <p>{feedback.message}</p>

                        {/*
                            Показываем кнопку удаления только для отзывов текущего пользователя.
                            В реальной системе здесь можно было бы проверять права доступа.
                        */}
                        {(feedback.email === currentUserId || feedback.userId === currentUserId) && (
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(feedback.id)}
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