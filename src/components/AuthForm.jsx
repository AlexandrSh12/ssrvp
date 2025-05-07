import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Форма регистрации
export const RegisterForm = ({ onRegister }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        onRegister(data);
        reset();
    };

    return (
        <div className="auth-form">
            <h3>Регистрация</h3>
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

                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

// Форма авторизации
export const LoginForm = ({ onLogin }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        onLogin(data);
        reset();
    };

    return (
        <div className="auth-form">
            <h3>Авторизация</h3>
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

                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

// Компонент объединяющий обе формы
const AuthForms = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState('login');

    const handleRegister = (data) => {
        // В реальном приложении здесь был бы API запрос
        localStorage.setItem('registeredUsers', JSON.stringify([
            ...(JSON.parse(localStorage.getItem('registeredUsers')) || []),
            data
        ]));
        alert('Регистрация успешна! Теперь вы можете войти.');
        setActiveTab('login');
    };

    const handleLogin = (data) => {
        // Имитация проверки в базе данных
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(u =>
            u.email === data.email && u.password === data.password
        );

        if (user) {
            onLogin(user);
        } else {
            alert('Неверный email или пароль');
        }
    };

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
                <LoginForm onLogin={handleLogin} />
            ) : (
                <RegisterForm onRegister={handleRegister} />
            )}
        </div>
    );
};

export default AuthForms;