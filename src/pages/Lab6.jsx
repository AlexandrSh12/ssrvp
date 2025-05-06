import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/Container';
import Message from '../components/Message';
import Button from '../components/Button';
import useLoginState from '../hooks/useLoginState';
import { fetchUsers, updateUser, deleteUser } from '../store/usersSlice';
import { fetchFeedbacks, updateFeedback, removeFeedback  } from '../store/feedbackSlice';

const Lab6 = () => {
    const isLoggedIn = useLoginState();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const feedbacks = useSelector(state => state.feedback.feedbacks);
    const users = useSelector(state => state.users.users);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editUserId, setEditUserId] = useState(null);
    const [editFeedbackId, setEditFeedbackId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        rating: 5
    });

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            Promise.all([
                dispatch(fetchUsers()),
                dispatch(fetchFeedbacks())
            ])
                .then(() => setLoading(false))
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [dispatch, isLoggedIn]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rating' ? parseInt(value, 10) : value
        });
    };

    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setFormData({
            name: user.name,
            email: user.email
        });
    };

    const handleEditFeedback = (feedback) => {
        setEditFeedbackId(feedback.id);
        setFormData({
            message: feedback.message,
            rating: feedback.rating
        });
    };

    const handleUpdateUser = () => {
        dispatch(updateUser({
            id: editUserId,
            name: formData.name,
            email: formData.email
        }));
        setEditUserId(null);
        setFormData({ name: '', email: '', message: '', rating: 5 });
    };

    const handleUpdateFeedback = () => {
        dispatch(updateFeedback({
            id: editFeedbackId,
            message: formData.message,
            rating: formData.rating
        }));
        setEditFeedbackId(null);
        setFormData({ name: '', email: '', message: '', rating: 5 });
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            dispatch(deleteUser(id));
        }
    };

    const handleDeleteFeedback = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            dispatch(removeFeedback(id));
        }
    };

    // Редактирование профиля пользователя
    const handleEditProfile = () => {
        setFormData({
            name: user.name,
            email: user.email
        });
        const currentUserId = users.find(u => u.email === user.email)?.id;
        if (currentUserId) {
            setEditUserId(currentUserId);
        }
    };

    if (!isLoggedIn) {
        return (
            <div>
                <h2>Лабораторная 6</h2>
                <Message type="warning">
                    Для доступа к функциям необходимо авторизоваться в Лабораторной 5.
                </Message>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <h2>Лабораторная 6</h2>
                <Message type="info">Загрузка данных...</Message>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Лабораторная 6</h2>
                <Message type="error">Ошибка: {error}</Message>
            </div>
        );
    }

    return (
        <div>
            <h2>Лабораторная 6</h2>
            <Container>
                <h3>REST API и управление данными</h3>
                <Message type="info">
                    В этой лабораторной реализована работа с REST API для управления пользователями и отзывами.
                    Данные имитируются через Redux store.
                </Message>
            </Container>

            <Container>
                <h3>Профиль пользователя</h3>
                <div style={{ textAlign: 'left', margin: '1rem' }}>
                    <p><strong>Имя:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <Button onClick={handleEditProfile}>Редактировать профиль</Button>
            </Container>

            {editUserId && (
                <Container>
                    <h3>Редактирование профиля</h3>
                    <div style={{ textAlign: 'left', margin: '1rem' }}>
                        <div>
                            <label htmlFor="name">Имя:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{ margin: '0.5rem', padding: '0.5rem', width: '100%' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{ margin: '0.5rem', padding: '0.5rem', width: '100%' }}
                            />
                        </div>
                        <Button onClick={handleUpdateUser}>Сохранить</Button>
                        <Button onClick={() => {
                            setEditUserId(null);
                            setFormData({ name: '', email: '', message: '', rating: 5 });
                        }}>Отмена</Button>
                    </div>
                </Container>
            )}

            <Container>
                <h3>Список отзывов</h3>
                {feedbacks.length === 0 ? (
                    <Message type="info">Отзывов пока нет</Message>
                ) : (
                    <div style={{ textAlign: 'left' }}>
                        {feedbacks.map(feedback => (
                            <div key={feedback.id} style={{ margin: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                                {editFeedbackId === feedback.id ? (
                                    <div>
                                        <div>
                                            <label htmlFor="message">Сообщение:</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                style={{ margin: '0.5rem', padding: '0.5rem', width: '100%', minHeight: '100px' }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Оценка (1-5):</label>
                                            <input
                                                id="rating"
                                                name="rating"
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={formData.rating}
                                                onChange={handleInputChange}
                                                style={{ margin: '0.5rem', padding: '0.5rem', width: '100px' }}
                                            />
                                        </div>
                                        <Button onClick={handleUpdateFeedback}>Сохранить</Button>
                                        <Button onClick={() => {
                                            setEditFeedbackId(null);
                                            setFormData({ name: '', email: '', message: '', rating: 5 });
                                        }}>Отмена</Button>
                                    </div>
                                ) : (
                                    <>
                                        <h4>{feedback.name} <small>({feedback.date})</small></h4>
                                        <p>{feedback.message}</p>
                                        <div>Оценка: {feedback.rating}/5</div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <Button onClick={() => handleEditFeedback(feedback)}>Редактировать</Button>
                                            <Button onClick={() => handleDeleteFeedback(feedback.id)}>Удалить</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Lab6;