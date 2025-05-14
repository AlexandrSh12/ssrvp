// src/pages/Lab8.jsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useSortBy, useBlockLayout, useResizeColumns, useColumnOrder } from 'react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchFeedbacks,
    deleteFeedback,
    toggleFeedbackStatus
} from '../redux/feedbackSlice';
import '../styles/lab8.css';
import LoadingSpinner from '../components/LoadingSpinner';

// Фиктивные данные для пользователей (в реальном приложении они должны быть в Redux)
const initialUsers = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: 2, username: 'user1', email: 'user1@example.com', role: 'user', status: 'active' },
    { id: 3, username: 'user2', email: 'user2@example.com', role: 'user', status: 'active' },
    { id: 4, username: 'user3', email: 'user3@example.com', role: 'user', status: 'blocked' },
];

// Компонент для перетаскивания колонок
const DraggableHeader = ({ column, index, moveColumn }) => {
    const ref = React.useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'column',
        drop: (item) => moveColumn(item.index, index),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'column',
        item: () => ({ id: column.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                backgroundColor: isOver ? '#f0f0f0' : 'transparent',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...column.getHeaderProps(column.getSortByToggleProps())}
        >
            {column.render('Header')}
            <span>
                {column.isSorted
                    ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                    : ''}
            </span>
        </div>
    );
};

// Компонент таблицы
const DraggableTable = ({ columns, data }) => {
    const defaultColumn = useMemo(
        () => ({
            minWidth: 100,
            width: 200,
            maxWidth: 400,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setColumnOrder,
        state: { columnOrder },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useColumnOrder,
        useBlockLayout,
        useResizeColumns,
        useSortBy
    );

    const moveColumn = useCallback((dragIndex, hoverIndex) => {
        const newColumnOrder = [...columnOrder];
        newColumnOrder.splice(hoverIndex, 0, newColumnOrder.splice(dragIndex, 1)[0]);
        setColumnOrder(newColumnOrder);
    }, [columnOrder, setColumnOrder]);

    return (
        <div style={{ width: '100%', overflow: 'auto' }}>
            <div {...getTableProps()} style={{ width: '100%', display: 'inline-block' }}>
                <div>
                    {headerGroups.map(headerGroup => (
                        <div {...headerGroup.getHeaderGroupProps()} style={{ display: 'flex' }}>
                            {headerGroup.headers.map((column, i) => (
                                <div
                                    {...column.getHeaderProps()}
                                    style={{
                                        width: column.width,
                                        minWidth: column.minWidth,
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        background: '#f8f8f8',
                                    }}
                                >
                                    <DraggableHeader
                                        column={column}
                                        index={i}
                                        moveColumn={moveColumn}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} style={{ display: 'flex' }}>
                                {row.cells.map(cell => (
                                    <div
                                        {...cell.getCellProps()}
                                        style={{
                                            width: cell.column.width,
                                            minWidth: cell.column.minWidth,
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Компонент администрирования
const AdminPanel = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState(initialUsers);
    const { feedback, status, error } = useSelector((state) => state.feedback);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    // Обработчики для пользователей
    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleToggleUserStatus = (userId) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
                : user
        ));
    };

    // Обработчики для отзывов
    const handleDeleteFeedback = (id) => {
        dispatch(deleteFeedback(id));
    };

    const handleToggleFeedbackStatus = (id, status) => {
        dispatch(toggleFeedbackStatus({ id, status: status === 'active' ? 'blocked' : 'active' }));
    };

    // Столбцы для таблицы пользователей
    const userColumns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                width: 50,
            },
            {
                Header: 'Имя пользователя',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Роль',
                accessor: 'role',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span style={{ color: value === 'active' ? 'green' : 'red' }}>
            {value === 'active' ? 'Активен' : 'Заблокирован'}
          </span>
                ),
            },
            {
                Header: 'Действия',
                id: 'actions',
                Cell: ({ row }) => (
                    <div className="action-buttons">
                        <button
                            onClick={() => handleToggleUserStatus(row.original.id)}
                            className="action-button"
                        >
                            {row.original.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                        <button
                            onClick={() => handleDeleteUser(row.original.id)}
                            className="action-button delete"
                        >
                            Удалить
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // Столбцы для таблицы отзывов
    const feedbackColumns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                width: 50,
            },
            {
                Header: 'Имя',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Сообщение',
                accessor: 'message',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span style={{ color: value === 'active' ? 'green' : 'red' }}>
            {value === 'active' ? 'Активен' : 'Заблокирован'}
          </span>
                ),
            },
            {
                Header: 'Действия',
                id: 'actions',
                Cell: ({ row }) => (
                    <div className="action-buttons">
                        <button
                            onClick={() => handleToggleFeedbackStatus(row.original.id, row.original.status)}
                            className="action-button"
                        >
                            {row.original.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                        <button
                            onClick={() => handleDeleteFeedback(row.original.id)}
                            className="action-button delete"
                        >
                            Удалить
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">Ошибка: {error}</div>;
    }

    return (
        <div className="admin-panel">
            <h2>Панель администрирования</h2>

            <div className="tab-buttons">
                <button
                    className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Пользователи
                </button>
                <button
                    className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feedback')}
                >
                    Обратная связь
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'users' && (
                    <DndProvider backend={HTML5Backend}>
                        <DraggableTable
                            columns={userColumns}
                            data={users}
                            onAction={handleDeleteUser}
                        />
                    </DndProvider>
                )}

                {activeTab === 'feedback' && (
                    <DndProvider backend={HTML5Backend}>
                        <DraggableTable
                            columns={feedbackColumns}
                            data={feedback}
                            onAction={handleDeleteFeedback}
                        />
                    </DndProvider>
                )}
            </div>
        </div>
    );
};

// Компонент просмотра отзывов для обычных пользователей
const UserFeedbackView = () => {
    const { feedback, status, error } = useSelector((state) => state.feedback);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    const feedbackColumns = useMemo(
        () => [
            {
                Header: 'Имя',
                accessor: 'name',
            },
            {
                Header: 'Сообщение',
                accessor: 'message',
            },
        ],
        []
    );

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">Ошибка: {error}</div>;
    }

    // Фильтруем отзывы для показа только активных
    const activeFeedback = feedback.filter(item => item.status === 'active');

    return (
        <div className="user-feedback-view">
            <h2>Отзывы пользователей</h2>

            <DndProvider backend={HTML5Backend}>
                <DraggableTable
                    columns={feedbackColumns}
                    data={activeFeedback}
                />
            </DndProvider>
        </div>
    );
};

// Основной компонент лабораторной 8
const Lab8 = () => {
    // В реальном приложении нужно получать текущего пользователя из Redux или контекста
    const [currentUser, setCurrentUser] = useState({ role: 'admin' });

    // Для демонстрации переключения между ролями
    const toggleRole = () => {
        setCurrentUser(prev => ({
            ...prev,
            role: prev.role === 'admin' ? 'user' : 'admin'
        }));
    };

    return (
        <div className="lab8-container">
            <h1>Лабораторная работа 8</h1>
            <h3>Описание выполненной работы:</h3>
            <p>Внедрение таблиц с react-table для отображения данных и функционала сортировки и перетаскивания колонок.</p>
            <p>Добавлены роли пользователей: admin и user с разными правами.</p>
            <p>Реализован блок администрирования для admin: управление пользователями и отзывами.</p>
            <p>Страница списка пользователей с действиями: удаление, блокировка и разблокировка.</p>
            <p>Поддержка сортировки и перетаскивания колонок в таблице.</p>
            <p>Адаптация таблицы для мобильных устройств.</p>
            <div className="role-switcher">
                <button onClick={toggleRole}>
                    Переключить роль (текущая: {currentUser.role})
                </button>
            </div>

            {currentUser.role === 'admin' ? (
                <AdminPanel currentUser={currentUser} />
            ) : (
                <UserFeedbackView />
            )}

            <style jsx>{`
        .lab8-container {
          padding: 20px;
        }
        
        .role-switcher {
          margin-bottom: 20px;
        }
        
        .tab-buttons {
          display: flex;
          margin-bottom: 20px;
        }
        
        .tab-button {
          padding: 10px 20px;
          background-color: #f0f0f0;
          border: none;
          cursor: pointer;
          margin-right: 10px;
        }
        
        .tab-button.active {
          background-color: #e0e0e0;
          font-weight: bold;
        }
        
        .table-container {
          overflow-x: auto;
          position: relative;
        }
        
        .table {
          border-collapse: collapse;
          width: 100%;
        }
        
        .thead {
          background-color: #f5f5f5;
        }
        
        .th, .td {
          padding: 8px 12px;
          border: 1px solid #ddd;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .action-buttons {
          display: flex;
          gap: 5px;
        }
        
        .action-button {
          padding: 5px 10px;
          border: none;
          cursor: pointer;
          background-color: #f0f0f0;
        }
        
        .action-button.delete {
          background-color: #ffdddd;
        }
      `}</style>
        </div>
    );
};

export default Lab8;