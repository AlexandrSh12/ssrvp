// src/hooks/useMountLogger.jsx
import { useEffect } from 'react'

const useMountLogger = (label = 'Component') => {
    useEffect(() => {
        console.log(`${label} mounted`)
        return () => console.log(`${label} unmounted`)
    }, [])
}

export default useMountLogger
