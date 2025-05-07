import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../redux/slices/authSlice';

// Форма регистрации
export const RegisterForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(registerUser(data))
            .unwrap() // Для обработки результата Promise
            .then(() => {
                alert('Регистрация успешна! Теперь вы можете войти.');
                reset();
            })
            .catch(() => {
                // Ошибка уже обрабатывается в reducer
            });
    };

    return (
        <div className="auth-form">
            <h3>Регистрация</h3>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Имя</label>
                    <input
                        {...register("name", {
                            required: "Обязательное поле",
                            minLength: { value: 2, message: "Минимум 2 символа" }
                        })}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

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

                <button type="submit" disabled={loading}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

// Форма авторизации
export const LoginForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

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
                            required: "Обязательное поле"
                        })}
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </button>
            </form>
        </div>
    );
};

// Компонент объединяющий обе формы
const AuthReduxForms = () => {
    const [activeTab, setActiveTab] = useState('login');

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
                <RegisterForm />
            )}
        </div>
    );
};

export default AuthReduxForms;