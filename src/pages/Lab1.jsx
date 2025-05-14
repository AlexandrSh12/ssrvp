// src/pages/Lab1.jsx
import React, { useEffect, useState } from 'react'
import Counter from '../components/Counter'
import AuthForm from '../components/AuthForm'
import Message from '../components/Message'
import Container from '../components/Container'
const Lab1 = () => {
    const [notification, setNotification] = useState(false)

    useEffect(() => {
        console.log('Page fully loaded')
        setNotification(true)

        const timer = setTimeout(() => {
            setNotification(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <h2>Лабораторная 1</h2>
            <p>
                <strong>Описание выполненной работы:</strong><br />
                — Реализовано уведомление о полной загрузке страницы.<br />
                — Реализована кнопка-счетчик, увеличивающая значение на 1 (через onClick).<br />
                — Реализована кнопка-счетчик, уменьшающая значение на 1 (через addEventListener).<br />
                — Реализована форма аутентификации пользователя с элементом &lt;form&gt;.<br />
                — Добавлена очистка данных формы.<br />
                — Обработка отправки формы реализована через listener submit, без отправки на сервер.<br />
                — Выполняется валидация данных (login == "admin" и pass == "admin").<br />
                — Учетные данные сохраняются в localStorage и автоматически подставляются в поля.<br />
            </p>

            {notification && (
                <Message type="success">
                    Страница загружена успешно
                </Message>
            )}

            <Container>
                <Counter />
            </Container>

            <Container>
                <AuthForm />
            </Container>
        </div>
    )
}

export default Lab1