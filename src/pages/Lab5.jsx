import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from '../components/Container';
import Message from '../components/Message';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { addFeedback } from '../store/feedbackSlice';
import useLoginState from '../hooks/useLoginState';

// Валидационные схемы
const validationSchema = Yup.object({
    email: Yup.string().email('Некорректный email').required('Email обязателен'),
    password: Yup.string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Пароль обязателен'),
    name: Yup.string().required('Имя обязательно'),
});

const feedbackSchema = Yup.object({
    name: Yup.string().required('Имя обязательно'),
    message: Yup.string().required('Сообщение обязательно').min(10, 'Сообщение должно содержать минимум 10 символов'),
    rating: Yup.number().min(1, 'Минимальная оценка - 1').max(5, 'Максимальная оценка - 5').required('Оценка обязательна'),
});

const Lab5 = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const isLoggedIn = useLoginState();
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedback.feedbacks);
    const user = useSelector(state => state.auth.user);

    // Проверяем наличие сохраненного пользователя при загрузке
    useEffect(() => {
        const savedUserEmail = localStorage.getItem('userEmail');
        const savedUserName = localStorage.getItem('userName');

        if (savedUserEmail && savedUserName) {
            setIsRegistered(true);
            // Автоматически входим, если есть сохраненные данные
            if (localStorage.getItem('autoLogin') === 'true') {
                dispatch(login({
                    name: savedUserName,
                    email: savedUserEmail
                }));
            }
        }
    }, [dispatch]);

    // Форма регистрации/авторизации
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            rememberMe: false
        },
        validationSchema,
        onSubmit: (values) => {
            if (isRegistered) {
                // Логика авторизации
                if (values.email === localStorage.getItem('userEmail') &&
                    values.password === localStorage.getItem('userPassword')) {
                    // Исправление: Диспатчим действие входа в систему
                    dispatch(login({
                        name: localStorage.getItem('userName'),
                        email: values.email,
                    }));

                    // Запоминаем пользователя если нужно
                    if (values.rememberMe) {
                        localStorage.setItem('autoLogin', 'true');
                    } else {
                        localStorage.removeItem('autoLogin');
                    }
                } else {
                    alert('Неверные данные для входа');
                }
            } else {
                // Логика регистрации
                localStorage.setItem('userEmail', values.email);
                localStorage.setItem('userPassword', values.password);
                localStorage.setItem('userName', values.name);
                setIsRegistered(true);
                alert('Вы успешно зарегистрировались! Теперь вы можете войти.');
            }
        },
    });

    // Форма обратной связи
    const feedbackFormik = useFormik({
        initialValues: {
            name: user?.name || '',
            message: '',
            rating: 5,
        },
        validationSchema: feedbackSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(addFeedback({
                ...values,
                id: Date.now(),
                date: new Date().toLocaleDateString()
            }));
            resetForm();
            alert('Отзыв успешно добавлен!');
        },
        enableReinitialize: true
    });

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('autoLogin');
    };

    // Профиль пользователя если авторизован
    if (isLoggedIn) {
        return (
            <div>
                <h2>Лабораторная 5 - Авторизация и формы</h2>
                <Container>
                    <h3>Профиль пользователя</h3>
                    <div style={{ textAlign: 'left', margin: '1rem' }}>
                        <p><strong>Имя:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    <Button onClick={handleLogout}>Выйти</Button>
                </Container>

                <Container>
                    <h3>Форма обратной связи</h3>
                    <form onSubmit={feedbackFormik.handleSubmit} style={{ textAlign: 'left', margin: '1rem' }}>
                        <div>
                            <label htmlFor="name">Имя:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={feedbackFormik.handleChange}
                                onBlur={feedbackFormik.handleBlur}
                                value={feedbackFormik.values.name}
                                style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)' }}
                            />
                            {feedbackFormik.touched.name && feedbackFormik.errors.name ? (
                                <div style={{ color: 'red' }}>{feedbackFormik.errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="message">Сообщение:</label>
                            <textarea
                                id="message"
                                name="message"
                                onChange={feedbackFormik.handleChange}
                                onBlur={feedbackFormik.handleBlur}
                                value={feedbackFormik.values.message}
                                style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)', minHeight: '100px' }}
                            />
                            {feedbackFormik.touched.message && feedbackFormik.errors.message ? (
                                <div style={{ color: 'red' }}>{feedbackFormik.errors.message}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="rating">Оценка (1-5):</label>
                            <input
                                id="rating"
                                name="rating"
                                type="number"
                                min="1"
                                max="5"
                                onChange={feedbackFormik.handleChange}
                                onBlur={feedbackFormik.handleBlur}
                                value={feedbackFormik.values.rating}
                                style={{ margin: '0.5rem', padding: '0.5rem', width: '100px' }}
                            />
                            {feedbackFormik.touched.rating && feedbackFormik.errors.rating ? (
                                <div style={{ color: 'red' }}>{feedbackFormik.errors.rating}</div>
                            ) : null}
                        </div>

                        <Button type="submit">Отправить отзыв</Button>
                    </form>
                </Container>

                <Container>
                    <h3>Список отзывов</h3>
                    {feedbacks.length === 0 ? (
                        <Message type="info">Отзывов пока нет</Message>
                    ) : (
                        <div style={{ textAlign: 'left' }}>
                            {feedbacks.map(feedback => (
                                <div key={feedback.id} style={{ margin: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <h4>{feedback.name} <small>({feedback.date})</small></h4>
                                    <p>{feedback.message}</p>
                                    <div>Оценка: {feedback.rating}/5</div>
                                </div>
                            ))}
                        </div>
                    )}
                </Container>
            </div>
        );
    }

    // Форма регистрации/авторизации если не авторизован
    return (
        <div>
            <h2>Лабораторная 5 - Авторизация и формы</h2>
            <Container>
                <h3>{isRegistered ? 'Авторизация' : 'Регистрация'}</h3>
                <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left', margin: '1rem' }}>
                    {!isRegistered && (
                        <div>
                            <label htmlFor="name">Имя:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)' }}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div style={{ color: 'red' }}>{formik.errors.name}</div>
                            ) : null}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)' }}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{ color: 'red' }}>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            style={{ margin: '0.5rem', padding: '0.5rem', width: 'calc(100% - 1rem)' }}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{ color: 'red' }}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    {isRegistered && (
                        <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem' }}>
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                                style={{ marginRight: '0.5rem' }}
                            />
                            <label htmlFor="rememberMe">Запомнить меня</label>
                        </div>
                    )}

                    <Button type="submit">{isRegistered ? 'Войти' : 'Зарегистрироваться'}</Button>
                    <Button type="button" onClick={() => setIsRegistered(!isRegistered)}>
                        {isRegistered ? 'Создать новый аккаунт' : 'Уже есть аккаунт?'}
                    </Button>
                </form>

                <Message type="warning">
                    Для доступа к функциям необходимо авторизоваться.
                    {isRegistered ? ' Используйте свои учетные данные для входа.' : ' Пожалуйста, зарегистрируйтесь.'}
                </Message>
            </Container>
        </div>
    );
};

export default Lab5;