import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateProfile, logout } from '../redux/slices/authSlice';

const UserProfileRedux = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth);
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || ''
        }
    });

    const handleLogout = () => {
        dispatch(logout());
    };

    const onSubmit = (data) => {
        dispatch(updateProfile(data))
            .unwrap()
            .then(() => {
                setIsEditing(false);
            });
    };

    if (isEditing) {
        return (
            <div className="user-profile-edit">
                <h3>Редактирование профиля</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Имя</label>
                        <input
                            {...register("name", {
                                required: "Имя обязательно"
                            })}
                        />
                        {errors.name && <span className="error">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Имя пользователя</label>
                        <input
                            {...register("username", {
                                required: "Имя пользователя обязательно"
                            })}
                        />
                        {errors.username && <span className="error">{errors.username.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email обязателен",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Некорректный email"
                                }
                            })}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => setIsEditing(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="user-profile">
            <div className="profile-dropdown">
                <div className="profile-info">
                    <span className="username">{user?.username || user?.email}</span>
                </div>

                <div className="profile-dropdown-content">
                    <div className="profile-details">
                        <p><strong>Имя:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <div className="profile-actions">
                            <button onClick={() => setIsEditing(true)}>Редактировать профиль</button>
                            <button className="logout-btn" onClick={handleLogout}>Выйти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileRedux;