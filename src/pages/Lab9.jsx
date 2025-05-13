// src/pages/Lab9.jsx
import React from 'react';
import { useGetPostsQuery } from '../redux/apiSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Button from '../components/Button';
import Content from '../layout/Content';

const Lab9 = () => {
    // Используем RTK Query для получения данных
    const { data: posts, isLoading, isFetching, isError, error, refetch } = useGetPostsQuery();

    // Обработчик кнопки обновления данных
    const handleRefresh = () => {
        // Вызываем refetch и логируем процесс для отладки
        console.log('Начинаем обновление данных...');
        refetch()
            .then(result => console.log('Данные обновлены:', result))
            .catch(err => console.error('Ошибка при обновлении:', err));
    };

    return (
        <div className="lab-content">
            <h1>Лабораторная работа 9</h1>

            {/* Секция 1: Тест компонента кнопки */}
            <section>
                <h2>Часть 1: Тест компонента кнопки</h2>
                <p>
                    Для компонента Button был написан тест, проверяющий следующую функциональность:
                </p>
                <ul>
                    <li>Корректный рендеринг текста кнопки</li>
                    <li>Вызов функции onClick при клике на кнопку</li>
                    <li>Правильное значение type по умолчанию</li>
                    <li>Возможность изменить тип кнопки через пропс</li>
                </ul>
            </section>
            {/* Секция 2: Описание реализации */}
            <section>
                <h2>Описание реализации</h2>
                <p>
                    В рамках этой лабораторной работы были выполнены следующие задачи:
                </p>
                <ol>
                    <li>
                        <strong>Написан тест для компонента кнопки</strong> с использованием библиотеки
                        testing-library/react. Тест проверяет основную функциональность компонента.
                    </li>
                    <li>
                        <strong>Реализован RTK Query</strong> для взаимодействия с сервером.
                        Создан файл apiSlice.js с определением эндпоинтов для работы с постами.
                    </li>
                    <li>
                        <strong>Добавлен middleware RTK Query</strong> в существующий Redux store.
                    </li>
                    <li>
                        <strong>Реализовано отображение данных</strong> с использованием хука useGetPostsQuery,
                        который предоставляет доступ к данным и состояниям запроса.
                    </li>
                    <li>
                        <strong>Обработаны различные состояния запроса</strong>:
                        <ul>
                            <li>isLoading & isFetching - для отображения спиннера загрузки</li>
                            <li>isError - для отображения сообщения об ошибке</li>
                            <li>Успешный запрос - для отображения данных</li>
                        </ul>
                    </li>
                </ol>
            </section>
            {/* Секция 3: Работа с RTK Query */}
            <section>
                <h2>Часть 2: Список постов с использованием RTK Query</h2>

                <div style={{ marginBottom: '20px' }}>
                    <Button onClick={handleRefresh}>Обновить данные</Button>
                </div>

                {/* Отображение состояния загрузки */}
                {(isLoading || isFetching) && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <LoadingSpinner size="large" />
                        <p>Загрузка данных...</p>
                    </div>
                )}

                {/* Отображение ошибки */}
                {isError && (
                    <Message type="error">
                        <h3>Ошибка при загрузке данных</h3>
                        <p>{error?.data || error?.error || 'Произошла ошибка соединения. Пожалуйста, проверьте ваше подключение и доступность сервера.'}</p>
                    </Message>
                )}

                {/* Отображение данных */}
                {!isLoading && !isError && posts && (
                    <>
                        <Message type="success">
                            <p>Данные успешно загружены!</p>
                        </Message>

                        <div className="posts-list">
                            <h3>Список постов ({posts.length})</h3>
                            {posts.map(post => (
                                <div key={post.id} className="post-item" style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    padding: '15px',
                                    marginBottom: '10px'
                                }}>
                                    <h4>{post.title}</h4>
                                    <p>{post.body}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>


        </div>
    );
};

export default Lab9;