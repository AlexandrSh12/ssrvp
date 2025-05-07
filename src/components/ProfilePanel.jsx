// src/components/ProfilePanel.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, logoutUser } from '../store/authSlice';
import { useGetCurrentUserQuery } from '../store/apiSlice';
import ProfileForm from './ProfileForm';
import Button from './Button';
import Container from './Container';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';
import Message from './Message';

const ProfilePanel = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const { data: user, isLoading, error } = useGetCurrentUserQuery(undefined, {
        skip: !currentUser
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (error) {
            setMessage({
                text: `Ошибка при загрузке профиля: ${error.message || 'Неизвестная ошибка'}`,
                type: 'error'
            });
        }
    }, [error]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!currentUser) {
        return (
            <Container className="profile-panel">
                <p>Пожалуйста, авторизуйтесь, чтобы увидеть свой профиль.</p>
            </Container>
        );
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="profile-panel">
            {message.text && (
                <Message type={message.type}>
                    {message.text}
                </Message>
            )}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem'
            }}>
                <h2>Профиль пользователя</h2>
                <Button onClick={handleLogout}>Выйти</Button>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem 0',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#ddd',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    fontSize: '2rem',
                    color: '#888'
                }}>
                    {user?.name?.charAt(0) || '?'}
                </div>

                <h3>{user?.name || 'Пользователь'}</h3>
                <p>{user?.email || ''}</p>
                {user?.bio && <p style={{ fontStyle: 'italic' }}>{user.bio}</p>}
                <div style={{ marginTop: '1rem' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Редактировать профиль</Button>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Редактирование профиля"
            >
                <ProfileForm
                    user={user}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </Container>
    );
};

export default ProfilePanel;