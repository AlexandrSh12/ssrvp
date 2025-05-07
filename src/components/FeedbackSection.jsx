import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const FeedbackSection = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Используем useCallback для обработки submit формы
    const handleFeedbackSubmit = useCallback((data) => {
        const newFeedback = {
            id: Date.now(),
            name: data.name,
            message: data.message,
            rating: data.rating,
            date: new Date().toLocaleDateString()
        };

        setFeedbacks(prevFeedbacks => [...prevFeedbacks, newFeedback]);
        reset();
    }, [reset]);

    return (
        <div className="feedback-section">
            <h3>Оставить отзыв</h3>

            <form onSubmit={handleSubmit(handleFeedbackSubmit)}>
                <div className="form-group">
                    <label>Ваше имя</label>
                    <input
                        {...register("name", {
                            required: "Обязательное поле"
                        })}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                    <label>Оценка</label>
                    <select {...register("rating", { required: "Выберите оценку" })}>
                        <option value="">Выберите оценку</option>
                        <option value="5">Отлично (5)</option>
                        <option value="4">Хорошо (4)</option>
                        <option value="3">Удовлетворительно (3)</option>
                        <option value="2">Плохо (2)</option>
                        <option value="1">Очень плохо (1)</option>
                    </select>
                    {errors.rating && <span className="error">{errors.rating.message}</span>}
                </div>

                <div className="form-group">
                    <label>Сообщение</label>
                    <textarea
                        {...register("message", {
                            required: "Обязательное поле",
                            minLength: { value: 10, message: "Сообщение должно содержать минимум 10 символов" }
                        })}
                        rows="4"
                    ></textarea>
                    {errors.message && <span className="error">{errors.message.message}</span>}
                </div>

                <button type="submit">Отправить отзыв</button>
            </form>

            <div className="feedback-list">
                <h3>Отзывы</h3>
                {feedbacks.length === 0 ? (
                    <p>Пока нет отзывов.</p>
                ) : (
                    <ul>
                        {feedbacks.map(feedback => (
                            <li key={feedback.id} className="feedback-item">
                                <div className="feedback-header">
                                    <strong>{feedback.name}</strong>
                                    <span>Оценка: {feedback.rating}/5</span>
                                    <span>{feedback.date}</span>
                                </div>
                                <p>{feedback.message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FeedbackSection;