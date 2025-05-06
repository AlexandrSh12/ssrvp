// src/components/Modal.jsx
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        // Блокируем прокрутку страницы при открытом модальном окне
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Очистка при размонтировании
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };

    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '20px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        color: '#333',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    };

    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '0',
        color: '#333',
    };

    return (
        <div style={backdropStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    <button style={closeButtonStyle} onClick={onClose}>×</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;