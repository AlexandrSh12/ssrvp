import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/authSlice';

const ProfileEditor = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: user.username || '',
            name: user.name || '',
            email: user.email || ''
        }
    });

    const onSubmit = (data) => {
        dispatch(updateProfile(data))
            .unwrap()
            .then(() => {
                setIsEditing(false);
            });
    };

    if (!isEditing) {
        return (
            <div className="profile-display">
                <div className="profile-info">
                    <div className="info-row">
                        <strong>Имя пользователя:</strong>
                        <span>{user.username || 'Не указано'}</span>
                    </div>
                    <div className="info-row">
                        <strong>Имя:</strong>
                        <span>{user.name || 'Не указано'}</span>
                    </div>
                    <div className="info-row">
                        <strong>Email:</strong>
                        <span>{user.email}</span>
                    </div>
                </div>
                <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                >
                    Редактировать профиль
                </button>
            </div>
        );
    }

    return (
        <div className="profile-editor">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Имя пользователя</label>
                    <input
                        {...register("username", {
                            required: "Обязательное поле",
                            minLength: { value: 3, message: "Минимум 3 символа" }
                        })}
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="form-group">
                    <label>Имя</label>
                    <input
                        {...register("name")}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email"
                            }
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                {error && <p className="error">{error}</p>}

                <div className="button-group">
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => setIsEditing(false)}
                        disabled={loading}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditor;