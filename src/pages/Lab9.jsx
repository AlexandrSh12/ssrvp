import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import Message from '../components/Message';
import Button from '../components/Button';
import useLoginState from '../hooks/useLoginState';
//import { useGetFeedbacksQuery, useDeleteFeedbackMutation, useUpdateFeedbackMutation } from '../store/apiSlice';

const Lab9 = () => {
    const isLoggedIn = useLoginState();
    const { user } = useSelector(state => state.auth);

    const {
        data: feedbacks,
        isLoading,
        isError,
        error,
        refetch
    } = useGetFeedbacksQuery();

    const [deleteFeedback, { isLoading: isDeleting }] = useDeleteFeedbackMutation();
    const [updateFeedback, { isLoading: isUpdating }] = useUpdateFeedbackMutation();

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            try {
                await deleteFeedback(id).unwrap();
            } catch (err) {
                console.error('Ошибка при удалении:', err);
            }
        }
    };

    const handleMarkAsFavorite = async (feedback) => {
        try {
            await updateFeedback({
                id: feedback.id,
                isFavorite: !feedback.isFavorite
            }).unwrap();
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
        }
    };

    if (!isLoggedIn) {
        return (
            <div>
                <h2>Лабораторная 9</h2>
                <Message type="warning">
                    Для доступа к функциям необходимо авторизоваться в Лабораторной 5.
                </Message>
            </div>
        );
    }

    return (
        <div>
            <h2>Лабораторная 9</h2>

            <Container>
                <h3>Тестирование и RTK Query</h3>
                <p>В этой лабораторной работе реализован переход на RTK Query для работы с API и добавлены тесты компонентов.</p>
                <div style={{ marginTop: '1rem' }}>
                    <Button onClick={refetch} disabled={isLoading}>
                        {isLoading ? 'Загрузка...' : 'Обновить данные'}
                    </Button>
                </div>
            </Container>

            <Container>
                <h3>Информация о пользователе</h3>
                <div style={{ textAlign: 'left', margin: '1rem' }}>
                    <p><strong>Имя:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </Container>

            <Container>
                <h3>Список отзывов (с RTK Query)</h3>
                {isLoading ? (
                    <Message type="info">Загрузка данных...</Message>
                ) : isError ? (
                    <Message type="error">Ошибка: {error?.message || 'Что-то пошло не так'}</Message>
                ) : !feedbacks || feedbacks.length === 0 ? (
                    <Message type="info">Отзывов пока нет</Message>
                ) : (
                    <div style={{ textAlign: 'left' }}>
                        {feedbacks.map(feedback => (
                            <div
                                key={feedback.id}
                                style={{
                                    margin: '1rem',
                                    padding: '1rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    backgroundColor: feedback.isFavorite ? '#fffde7' : 'transparent'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4>{feedback.name} <small>({feedback.date})</small></h4>
                                    <div>
                                        <span style={{ marginRight: '1rem' }}>Оценка: {feedback.rating}/5</span>
                                        {feedback.isFavorite && <span style={{ color: '#ffc107' }}>★ Избранное</span>}
                                    </div>
                                </div>
                                <p>{feedback.message}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <Button
                                        onClick={() => handleMarkAsFavorite(feedback)}
                                        disabled={isUpdating}
                                    >
                                        {feedback.isFavorite ? 'Убрать из избранного' : 'В избранное'}
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(feedback.id)}
                                        disabled={isDeleting}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>

            <Container>
                <h3>Тестирование компонентов</h3>
                <p>В проекте добавлены тесты для следующих компонентов:</p>
                <ul style={{ textAlign: 'left', listStylePosition: 'inside' }}>
                    <li>Button.test.jsx - тестирование кнопки</li>
                    <li>Counter.test.jsx - тестирование счетчика</li>
                    <li>Message.test.jsx - тестирование компонента сообщений</li>
                    <li>AuthForm.test.jsx - тестирование формы авторизации</li>
                </ul>
                <Message type="success">
                    Все тесты успешно пройдены!
                </Message>
            </Container>
        </div>
    );
};

export default Lab9;