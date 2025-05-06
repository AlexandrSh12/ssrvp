import { useEffect } from 'react'

const useMountLogger = (label = 'Component') => {
    useEffect(() => {
        console.log(`${label} mounted`)
        return () => console.log(`${label} unmounted`)
    }, [])
}

export default useMountLogger
