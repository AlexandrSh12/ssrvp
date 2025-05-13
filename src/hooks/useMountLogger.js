// src/hooks/useMountLogger.jsx
import { useEffect } from 'react'
//хук для отладки, который выводит в консоль информацию о монтировании/размонтировании компонентов
const useMountLogger = (label = 'Component') => {
    useEffect(() => {
        console.log(`${label} mounted`)
        return () => console.log(`${label} unmounted`)
    }, [])
}

export default useMountLogger
