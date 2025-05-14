// src/pages/Lab4.jsx
//хук для отладки, который выводит в консоль информацию о монтировании/размонтировании компонентов для лабы 4

import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../redux/counterSlice'
import { ThemeContext } from '../context/ThemeContext'
import useMountLogger from '../hooks/useMountLogger'

const Lab4 = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    const { theme, toggleTheme } = useContext(ThemeContext)

    useMountLogger('Lab4')

    return (
        <div>
            <h2>Лабораторная 4</h2>
            <p>Текущая тема: {theme}</p>
            <button onClick={toggleTheme}>Переключить тему</button>

            <hr />
            <p>Счётчик: {count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <h3>Описание выполненной работы:</h3>
            <p>
                — Реализовано переключение темы (день/ночь) через React Context.<br />
                — Использован useEffect через хук useMountLogger (монтирование/размонтирование).<br />
                — Подключён Redux, реализованы actions и reducers для счётчика (increment, decrement).<br />
                — Используются useSelector и useDispatch для управления состоянием.<br />
                — В проект внедрён react-router, переходы реализованы через меню (Sidebar).<br />
                — Обработка маршрутов реализована в Content с использованием роутера.<br />
            </p>
        </div>
    )
}

export default Lab4
