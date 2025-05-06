import React, { useState } from 'react'
import Button from './Button'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => setCount(c => c + 1)
    const decrement = () => setCount(c => c - 1)

    return (
        <div className="card">
            <h3>Счётчик: {count}</h3>
            <div>
                <Button onClick={increment}>+1</Button>
                <Button onClick={decrement}>-1</Button>
            </div>
        </div>
    )
}

export default Counter