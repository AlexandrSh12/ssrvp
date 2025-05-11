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
            </Container>
        </div>
    )
}

export default Lab2
