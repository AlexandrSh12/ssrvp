// src/components/FeedbackItem.jsx
import React from 'react';
import Button from './Button';

const FeedbackItem = ({ feedback, onEdit, onDelete, isCurrentUser }) => {
    return (
        <div style={{
            margin: '1rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            position: 'relative'
        }}>
            <h4>
                {feedback.name} <small>({feedback.date})</small>
            </h4>
            <p>{feedback.message}</p>
            <div>Оценка: {feedback.rating}/5</div>

            {isCurrentUser && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Button onClick={() => onEdit(feedback)}>Редактировать</Button>
                    <Button onClick={() => onDelete(feedback.id)}>Удалить</Button>
                </div>
            )}
        </div>
    );
};

export default FeedbackItem;