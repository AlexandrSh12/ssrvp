// src/components/FeedbackItem.jsx
import React from 'react';
import Button from './Button';

const FeedbackItem = ({ feedback, onEdit, onDelete, isCurrentUser }) => {
    const containerStyle = {
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
    };

    const titleStyle = {
        margin: '0',
        fontWeight: '500',
    };

    const dateStyle = {
        color: '#888',
        fontSize: '0.9rem',
    };

    const messageStyle = {
        margin: '0.5rem 0',
        lineHeight: '1.5',
    };

    const ratingStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem',
    };

    const starStyle = {
        color: '#faad14',
        marginRight: '0.2rem',
    };

    const actionsStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.5rem',
        marginTop: '1rem',
    };

    // Отображение звезд рейтинга
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} style={starStyle}>
                    {i < rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h4 style={titleStyle}>{feedback.name}</h4>
                <span style={dateStyle}>{feedback.date}</span>
            </div>

            <div style={ratingStyle}>
                {renderStars(feedback.rating)}
                <span style={{ marginLeft: '0.5rem' }}>{feedback.rating}/5</span>
            </div>

            <p style={messageStyle}>{feedback.message}</p>

            {isCurrentUser && (
                <div style={actionsStyle}>
                    <Button onClick={() => onEdit(feedback)}>Редактировать</Button>
                    <Button onClick={() => onDelete(feedback.id)}>Удалить</Button>
                </div>
            )}
        </div>
    );
};

export default FeedbackItem;