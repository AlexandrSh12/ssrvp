import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import Message from '../components/Message';
import Button from '../components/Button';
import ProfileForm from '../components/ProfileForm';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackItem from '../components/FeedbackItem';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import useLoginState from '../hooks/useLoginState';
import {
    fetchUserProfile,
    updateUserProfile,
    deleteUserProfile,
    fetchAllFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    clearApiError
} from '../store/apiSlice';

const Lab6 = () => {

    const isLoggedIn = useLoginState();
    const dispatch = useDispatch();



    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isEditFeedbackOpen, setIsEditFeedbackOpen] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState(null);

    const { user, feedbacks, isLoading, error } = useSelector(state => state.api);
    const authUser = useSelector(state => state.auth.user);




    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchAllFeedbacks());
            dispatch(fetchUserProfile(authUser.id)); // Замените на реальный ID из authUser при интеграции
            console.log("authUser:", authUser); // Проверьте, есть ли здесь id

        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        return () => {
            dispatch(clearApiError());
        };
    }, [dispatch]);

    const handleEditProfileClick = () => {
        setIsEditProfileOpen(true);
    };

    const handleProfileSubmit = (values) => {
        dispatch(updateUserProfile({ userId: 1, userData: values }))
            .unwrap()
            .then(() => {
                setIsEditProfileOpen(false);
            })
            .catch(error => {
                console.error('Failed to update profile:', error);
            });
    };

    const handleDeleteProfile = () => {
        if (window.confirm('Вы уверены, что хотите удалить свой профиль? Это действие нельзя отменить.')) {
            dispatch(deleteUserProfile(1))
                .unwrap()
                .then(() => {
                    alert('Профиль удален');
                })
                .catch(error => {
                    console.error('Failed to delete profile:', error);
                });
        }
    };

    const handleEditFeedback = (feedback) => {
        setCurrentFeedback(feedback);
        setIsEditFeedbackOpen(true);
    };

    const handleFeedbackSubmit = (values) => {
        if (currentFeedback) {
            dispatch(updateFeedback({
                feedbackId: currentFeedback.id,
                feedbackData: {
                    ...values,
                    date: currentFeedback.date
                }
            }))
                .unwrap()
                .then(() => {
                    setIsEditFeedbackOpen(false);
                    setCurrentFeedback(null);
                })
                .catch(error => {
                    console.error('Failed to update feedback:', error);
                });
        } else {
            dispatch(createFeedback({
                ...values,
                userId: authUser.id, // Замените на authUser.id при интеграции
                date: new Date().toLocaleDateString()
            }))
                .unwrap()
                .then(() => {
                    alert('Отзыв успешно добавлен!');
                })
                .catch(error => {
                    console.error('Failed to create feedback:', error);
                });
        }
    };

    const handleDeleteFeedback = (feedbackId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            dispatch(deleteFeedback(feedbackId))
                .unwrap()
                .then(() => {
                    alert('Отзыв удален');
                })
                .catch(error => {
                    console.error('Failed to delete feedback:', error);
                });
        }
    };

    if (!isLoggedIn) {
        return (
            <div>
                <h2>Лабораторная 6 - REST API</h2>
                <Container>
                    <Message type="warning">
                        Для доступа к функциям необходимо авторизоваться. Пожалуйста, перейдите на страницу Лабораторной 5 для входа.
                    </Message>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <h2>Лабораторная 6 - REST API</h2>

            {error && (
                <Container>
                    <Message type="error">
                        Произошла ошибка: {error}
                        <Button onClick={() => dispatch(clearApiError())}>Закрыть</Button>
                    </Message>
                </Container>
            )}

            <Container>
                <h3>Профиль пользователя</h3>
                {user ? (
                    <div>
                        <div style={{ textAlign: 'left', margin: '1rem' }}>
                            <p><strong>Имя:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            {user.bio && <p><strong>О себе:</strong> {user.bio}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <Button onClick={handleEditProfileClick}>Редактировать профиль</Button>
                            <Button onClick={handleDeleteProfile}>Удалить профиль</Button>
                        </div>
                    </div>
                ) : (
                    <Message type="info">Профиль не найден</Message>
                )}
            </Container>

            <Container>
                <h3>Добавить отзыв</h3>
                <FeedbackForm
                    initialValues={{ name: authUser?.name || '', message: '', rating: 5 }}
                    onSubmit={handleFeedbackSubmit}
                    isLoading={isLoading}
                />
            </Container>

            <Container>
                <h3>Список отзывов</h3>
                {isLoading && <LoadingSpinner />}

                {feedbacks.length === 0 ? (
                    <Message type="info">Отзывов пока нет</Message>
                ) : (
                    <div style={{ textAlign: 'left' }}>
                        {feedbacks.map(feedback => (
                            <FeedbackItem
                                key={feedback.id}
                                feedback={feedback}
                                onEdit={handleEditFeedback}
                                onDelete={handleDeleteFeedback}
                                isCurrentUser={true} // Замените на проверку feedback.userId === authUser.id
                            />
                        ))}
                    </div>
                )}
            </Container>

            <Modal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                title="Редактирование профиля"
            >
                {user && (
                    <ProfileForm
                        initialValues={user}
                        onSubmit={handleProfileSubmit}
                        isLoading={isLoading}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isEditFeedbackOpen}
                onClose={() => {
                    setIsEditFeedbackOpen(false);
                    setCurrentFeedback(null);
                }}
                title="Редактирование отзыва"
            >
                {currentFeedback && (
                    <FeedbackForm
                        initialValues={currentFeedback}
                        onSubmit={handleFeedbackSubmit}
                        isLoading={isLoading}
                        isEditing={true}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Lab6;