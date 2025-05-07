// src/hooks/useLoginState.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Проверка функциональности хука - добавляем вывод для отладки
const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        // Отладочный вывод
        console.log('useLoginState - текущий пользователь:', user);

        // Проверяем наличие пользователя в Redux store
        setIsLoggedIn(!!user);

        console.log('useLoginState - статус авторизации:', !!user);
    }, [user]);

    return isLoggedIn;
};

export default useLoginState;