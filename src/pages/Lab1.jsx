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