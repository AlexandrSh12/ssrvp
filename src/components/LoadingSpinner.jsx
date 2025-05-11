// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
    // Определение размеров в зависимости от пропса
    const dimensions = {
        small: { width: '16px', height: '16px', border: '2px' },
        medium: { width: '24px', height: '24px', border: '3px' },
        large: { width: '32px', height: '32px', border: '4px' }
    };

    const { width, height, border } = dimensions[size] || dimensions.medium;

    return (
        <div
            style={{
                display: 'inline-block',
                width,
                height,
                borderRadius: '50%',
                border: `${border} solid rgba(0, 0, 0, 0.1)`,
                borderLeftColor: '#007bff',
                animation: 'spin 1s linear infinite',
                verticalAlign: 'middle',
            }}
        />
    );
};

// Стили анимации в head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(styleElement);
}

export default LoadingSpinner;