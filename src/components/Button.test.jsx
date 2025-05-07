// src/components/Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
    test('рендерит кнопку с правильным текстом', () => {
        render(<Button>Тестовая кнопка</Button>);
        const buttonElement = screen.getByText('Тестовая кнопка');
        expect(buttonElement).toBeInTheDocument();
    });

    test('вызывает функцию onClick при клике', () => {
        // Создаем mock-функцию
        const handleClick = jest.fn();

        // Рендерим кнопку с mock-функцией
        render(<Button onClick={handleClick}>Кликни меня</Button>);

        // Находим кнопку и кликаем по ней
        const buttonElement = screen.getByText('Кликни меня');
        fireEvent.click(buttonElement);

        // Проверяем, что функция была вызвана
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('имеет правильный тип кнопки по умолчанию', () => {
        render(<Button>Кнопка</Button>);
        const buttonElement = screen.getByText('Кнопка');
        expect(buttonElement.type).toBe('button');
    });

    test('можно изменить тип кнопки через пропс', () => {
        render(<Button type="submit">Отправить</Button>);
        const buttonElement = screen.getByText('Отправить');
        expect(buttonElement.type).toBe('submit');
    });
});