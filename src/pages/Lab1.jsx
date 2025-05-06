import React, { useEffect } from 'react'
import Counter from '../components/Counter'
import AuthForm from '../components/AuthForm'

const Lab1 = () => {
    useEffect(() => {
        console.log('Page fully loaded')
        alert('Page fully loaded')
    }, [])

    return (
        <div>
            <h2>Лабораторная 1</h2>
            <Counter />
            <AuthForm />
        </div>
    )
}

export default Lab1
