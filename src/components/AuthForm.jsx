import React, { useEffect, useState } from 'react'
import Button from './Button'

const AuthForm = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const savedLogin = localStorage.getItem('login')
        const savedPass = localStorage.getItem('password')
        if (savedLogin && savedPass) {
            setLogin(savedLogin)
            setPassword(savedPass)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (login === 'admin' && password === 'admin') {
            setMessage('Успешный вход')
            localStorage.setItem('login', login)
            localStorage.setItem('password', password)
        } else {
            setMessage('Неверные данные')
        }
    }

    const handleClear = () => {
        setLogin('')
        setPassword('')
        setMessage('')
        localStorage.removeItem('login')
        localStorage.removeItem('password')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Форма аутентификации</h3>
            <input
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <br />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button type="submit">Войти</Button>
            <Button onClick={handleClear}>Очистить</Button>
            <div>{message}</div>
        </form>
    )
}

export default AuthForm
