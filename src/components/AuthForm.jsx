import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, registerUser, clearError } from '../redux/authSlice';

// Форма регистрации (сохранена старая версия с интеграцией Redux)
export const RegisterForm = ({ onSwitchTab }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        try {
            await dispatch(registerUser(data)).unwrap();
            reset();
            alert('Регистрация успешна! Теперь вы можете войти.');
            onSwitchTab('login');
        } catch (err) {
            console.error('Ошибка регистрации:', err);
        }
    };

    return (
        <div className="auth-form">
            <h3>Регистрация</h3>
            {error && <div className="error-message">{error}</div>}

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

                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Обязательное поле",
                            minLength: { value: 6, message: "Минимум 6 символов" }
                        })}
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

// Форма авторизации (объединённая версия)
export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { error, status, user } = useSelector((state) => state.auth);

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    const handleChange = () => {
        if (error) {
            dispatch(clearError());
        }
    };

    if (user) {
        return (
            <div className="auth-info">
                <h3>Информация о пользователе</h3>
                <p>Логин: {user.username}</p>
                <p>Роль: {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
            </div>
        );
    }

    return (
        <div className="auth-form">
            <h3>Авторизация</h3>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email"
                            },
                            onChange: handleChange
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Обязательное поле",
                            onChange: handleChange
                        })}
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Вход...' : 'Войти'}
                </button>
            </form>

            <div className="auth-hint">
                <p>Для входа используйте:</p>
                <p>Администратор: admin / admin</p>
                <p>Пользователь: user / user</p>
            </div>
        </div>
    );
};

// Компонент объединяющий обе формы (обновлённая версия)
const AuthForms = () => {
    const [activeTab, setActiveTab] = useState('login');
    const { user } = useSelector((state) => state.auth);

    if (user) {
        return (
            <div className="auth-info">
                <h3>Вы уже авторизованы</h3>
                <p>Логин: {user.username}</p>
                <p>Роль: {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <button
                    className={activeTab === 'login' ? 'active' : ''}
                    onClick={() => setActiveTab('login')}
                >
                    Вход
                </button>
                <button
                    className={activeTab === 'register' ? 'active' : ''}
                    onClick={() => setActiveTab('register')}
                >
                    Регистрация
                </button>
            </div>

            {activeTab === 'login' ? (
                <LoginForm />
            ) : (
                <RegisterForm onSwitchTab={() => setActiveTab('login')} />
            )}
        </div>
    );
};

export default AuthForms;