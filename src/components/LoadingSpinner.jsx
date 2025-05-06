// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
    const spinnerStyle = {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #3498db',
        animation: 'spin 1s linear infinite',
        margin: '20px auto',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
            <div style={spinnerStyle}></div>
            <p>Загрузка...</p>
        </div>
    );
};

export default LoadingSpinner;