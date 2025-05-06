import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel
} from '@tanstack/react-table';
import Container from '../components/Container';
import Message from '../components/Message';
import Button from '../components/Button';
import useLoginState from '../hooks/useLoginState';
import { fetchUsers } from '../store/usersSlice';
import { fetchFeedbacks, deleteFeedback } from '../store/feedbackSlice';

// Компонент для фильтрации колонок
const DefaultColumnFilter = ({
                                 column: { filterValue, preFilteredRows, setFilter },
                             }) => {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Поиск ${count} записей...`}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
    );
};

const Table = ({ columns, data }) => {
    const filterTypes = useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={{
                                    borderBottom: 'solid 3px #ddd',
                                    background: '#f0f0f0',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    padding: '0.5rem',
                                    textAlign: 'left',
                                }}
                            >
                                {column.render('Header')}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} style={{
                            background: i % 2 === 0 ? 'white' : '#f9f9f9'
                        }}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '0.5rem',
                                            border: 'solid 1px #ddd',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="pagination" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                </div>
                <div>
          <span>
            Страница{' '}
              <strong>
              {pageIndex + 1} из {pageOptions.length}
            </strong>{' '}
          </span>
                    <span>
            | Перейти к странице:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: '50px' }}
                        />
          </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Показать {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

const Lab8 = () => {
    const isLoggedIn = useLoginState();
    const dispatch = useDispatch();
    const { user, role } = useSelector(state => state.auth);
    const users = useSelector(state => state.users.users);
    const feedbacks = useSelector(state => state.feedback.feedbacks);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            Promise.all([
                dispatch(fetchUsers()),
                dispatch(fetchFeedbacks())
            ])
                .then(() => setLoading(false))
                .catch(err => {
                    setError(err?.message || 'Ошибка загрузки данных');
                    setLoading(false);
                });
        }
    }, [dispatch, isLoggedIn]);

    const handleDeleteFeedback = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            dispatch(deleteFeedback(id));
        }
    };

    const userColumns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
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
                Header: 'Роль',
                accessor: 'role',
                Filter: ({ column }) => {
                    const { filterValue, setFilter } = column;
                    return (
                        <select
                            value={filterValue || ''}
                            onChange={e => setFilter(e.target.value || undefined)}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="">Все</option>
                            <option value="admin">Администратор</option>
                            <option value="user">Пользователь</option>
                        </select>
                    );
                },
            },
            {
                Header: 'Действия',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <Button
                            onClick={() => alert(`Редактирование пользователя ${row.original.name}`)}
                            style={{ marginRight: '0.5rem' }}
                        >
                            Редактировать
                        </Button>
                    </div>
                ),
                disableFilters: true,
            },
        ],
        []
    );

    const feedbackColumns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Имя пользователя',
                accessor: 'name',
            },
            {
                Header: 'Дата',
                accessor: 'date',
            },
            {
                Header: 'Сообщение',
                accessor: 'message',
            },
            {
                Header: 'Оценка',
                accessor: 'rating',
                Filter: ({ column }) => {
                    const { filterValue, setFilter } = column;
                    return (
                        <select
                            value={filterValue || ''}
                            onChange={e => setFilter(e.target.value || undefined)}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="">Все</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    );
                },
            },
            {
                Header: 'Действия',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <Button
                            onClick={() => alert(`Редактирование отзыва от ${row.original.name}`)}
                            style={{ marginRight: '0.5rem' }}
                        >
                            Редактировать
                        </Button>
                        <Button
                            onClick={() => handleDeleteFeedback(row.original.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                ),
                disableFilters: true,
            },
        ],
        [handleDeleteFeedback]
    );

    if (!isLoggedIn) {
        return (
            <div>
                <h2>Лабораторная 8</h2>
                <Message type="warning">
                    Для доступа к функциям необходимо авторизоваться в Лабораторной 5.
                </Message>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <h2>Лабораторная 8</h2>
                <Message type="info">Загрузка данных...</Message>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Лабораторная 8</h2>
                <Message type="error">Ошибка: {error}</Message>
            </div>
        );
    }

    return (
        <div>
            <h2>Лабораторная 8</h2>

            <Container>
                <h3>Информация о пользователе</h3>
                <div style={{ textAlign: 'left', margin: '1rem' }}>
                    <p><strong>Имя:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {role || 'user'}</p>
                </div>
                <Message type="info">
                    В данной лабораторной работе реализован функционал для ролей admin и user.
                    {role !== 'admin' && " Для полного доступа необходимо иметь роль admin."}
                </Message>
            </Container>

            {role === 'admin' && (
                <Container>
                    <h3>Список пользователей</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <Table columns={userColumns} data={users} />
                    </div>
                </Container>
            )}

            <Container>
                <h3>Список отзывов</h3>
                <div style={{ overflowX: 'auto' }}>
                    <Table columns={feedbackColumns} data={feedbacks} />
                </div>
            </Container>
        </div>
    );
};

export default Lab8;