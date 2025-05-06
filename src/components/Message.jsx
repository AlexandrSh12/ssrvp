import React from 'react'

const Message = ({ type = 'info', children }) => {
    const getStyles = () => {
        const baseStyles = {
            padding: '10px 15px',
            marginBottom: '15px',
            borderRadius: '4px',
            borderLeft: '4px solid'
        };

        const typeStyles = {
            info: {
                backgroundColor: '#e6f7ff',
                borderLeftColor: '#1890ff'
            },
            success: {
                backgroundColor: '#f6ffed',
                borderLeftColor: '#52c41a'
            },
            warning: {
                backgroundColor: '#fffbe6',
                borderLeftColor: '#faad14'
            },
            error: {
                backgroundColor: '#fff2f0',
                borderLeftColor: '#ff4d4f'
            }
        };

        return { ...baseStyles, ...typeStyles[type] };
    };

    return (
        <div style={getStyles()}>
            {children}
        </div>
    );
};

export default Message;