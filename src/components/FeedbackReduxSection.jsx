import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchFeedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback
} from '../redux/slices/feedbackSlice';

const FeedbackReduxSection = () => {
    const dispatch = useDispatch();
    const { feedbacks, loading, error } = useSelector(state => state.feedback);
    const { user } = useSelector(state => state.auth);
    const [editingId, setEditingId] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    // Загружаем отзывы при первом рендере
    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    // Обработчик добавления отзыва через useCallback
    const handleFeedbackSubmit = useCallback((data) => {
        const newFeedback = {
            name: user.name || user.username,
            email: user.email,
            message: data.message,
            rating: data.rating
        };

        dispatch(addFeedback(newFeedback))
            .unwrap()
            .then(() => {
                reset();
            });
    }, [dispatch, user, reset]);

    // Обработчик редактирования отзыва
    const handleEdit = (feedback) => {
        setEditingId(feedback.id);
        setValue('message', feedback.message);
        setValue('rating', feedback.rating);
    };

    // Обработчик сохранения редактирования
    const handleEditSubmit = useCallback((data) => {
        if (!editingId) return;

        const updatedFeedback = {
            id: editingId,
            name: user.name || user.username,
            email: user.email,
            message: data.message,
            rating: data.rating,
            date: new Date().toLocaleDateString()
        };

        dispatch(updateFeedback(updatedFeedback))
            .unwrap()
            .then(() => {
                setEditingId(null);
                reset();
            });
    }, [dispatch, editingId, user, reset]);

    // Обработчик удаления отзыва
    const handleDelete = (id) => {
        if (window.confirm('Вы действительно хотите удалить этот отзыв?')) {
            dispatch(deleteFeedback(id));
        }
    };

    // Отмена редактирования
    const handleCancelEdit = () => {
        setEditingId(null);
        reset();
    };

    return (
        <div className="feedback-section">
            <h3>{editingId ? 'Редактировать отзыв' : 'Оставить отзыв'}</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit(editingId ? handleEditSubmit : handleFeedbackSubmit)}>
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

                <div className="form-buttons">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Отправка...' : (editingId ? 'Сохранить изменения' : 'Отправить отзыв')}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                        >
                            Отмена
                        </button>
                    )}
                </div>
            </form>

            <div className="feedback-list">
                <h3>Отзывы</h3>
                {loading && <p>Загрузка отзывов...</p>}

                {!loading && feedbacks.length === 0 ? (
                    <p>Пока нет отзывов.</p>
                ) : (
                    <ul>
                        {feedbacks.map(feedback => (
                            <li key={feedback.id} className="feedback-item">
                                <div className="feedback-header">
                                    <div>
                                        <strong>{feedback.name}</strong>
                                        <small>({feedback.email})</small>
                                    </div>
                                    <span>Оценка: {feedback.rating}/5</span>
                                    <span>{feedback.date}</span>
                                </div>
                                <p>{feedback.message}</p>

                                {/* Показываем кнопки редактирования только для отзывов текущего пользователя */}
                                {user.email === feedback.email && (
                                    <div className="feedback-actions">
                                        <button onClick={() => handleEdit(feedback)}>Редактировать</button>
                                        <button onClick={() => handleDelete(feedback.id)}>Удалить</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FeedbackReduxSection;