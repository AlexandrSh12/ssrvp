// src/pages/Lab3.jsx
import React from 'react'
import Container from '../components/Container'

const Lab3 = () => {
    return (
        <div>
            <h2>Лабораторная 3</h2>
            <Container>
                <p>Контент лабораторной работы 3</p>
                <p>Header, Footer, Sidebar и Content уже используются.</p>
                <h3>Описание выполненной работы:</h3>
                    <p>
                        — Реализован шаблон страницы с использованием компонентов: Header, Footer, Sidebar, Content.<br />
                        — В меню (Sidebar) представлен список лабораторных работ с навигацией между ними.<br />
                        — Содержимое каждой лабораторной отображается в блоке Content.<br />
                        — Использована компонентная структура через layout-компоненты.<br />
                    </p>
            </Container>
        </div>
    )
}

export default Lab3
