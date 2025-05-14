// src/pages/Lab2.jsx
import React from 'react'
import Container from '../components/Container'
import Button from '../components/Button'

const Lab2 = () => {
    return (
        <div>
            <h2>Лабораторная 2</h2>
            <Container>
                <p>Пример использования контейнера</p>
                <Button onClick={() => alert('Нажато!')}>Нажми меня</Button>
                <h3>Описание выполненной работы:</h3>
                <p>
                    — Создано React-приложение с использованием Vite.<br />
                    — Реализованы и использованы компоненты: кнопка и контейнер.<br />
                    — Создан шаблон страницы с размещением компонентов.<br />
                    — Компоненты навигации реализованы в рамках структуры проекта.<br />
                    — Проект размещен на GitHub.<br />
                </p>
            </Container>
        </div>
    )
}

export default Lab2
