import React, { useEffect, useState } from 'react'
import Button from './Button'

const Counter = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const handler = () => setCount(c => c - 1)
        const el = document.getElementById('decrement-btn')
        el?.addEventListener('click', handler)

        return () => el?.removeEventListener('click', handler)
    }, [])

    return (
        <div>
            <h3>Счётчик: {count}</h3>
            <Button onClick={() => setCount(c => c + 1)}>+1</Button>
            <button id="decrement-btn">-1</button>
        </div>
    )
}

export default Counter
