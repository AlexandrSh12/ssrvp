import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// В реальном приложении эти функции вызывали бы API
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        // Имитация запроса к API
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUsers = [
                    { id: 1, name: 'Администратор', email: 'admin@example.com', role: 'admin' },
                    { id: 2, name: 'Иван Иванов', email: 'ivan@example.com', role: 'user' },
                    { id: 3, name: 'Петр Петров', email: 'petr@example.com', role: 'user' },
                    { id: 4, name: 'Анна Сидорова', email: 'anna@example.com', role: 'user' },
                    { id: 5, name: 'Елена Смирнова', email: 'elena@example.com', role: 'user' }
                ];

                // Проверяем наличие локальных пользователей
                const savedUsers = localStorage.getItem('users');
                if (savedUsers) {
                    resolve(JSON.parse(savedUsers));
                } else {
                    localStorage.setItem('users', JSON.stringify(mockUsers));
                    resolve(mockUsers);
                }
            }, 500);
        });
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (updatedUser) => {
        // Имитация запроса к API
        return new Promise((resolve) => {
            setTimeout(() => {
                const savedUsers = localStorage.getItem('users');
                let users = savedUsers ? JSON.parse(savedUsers) : [];
                users = users.map(user =>
                    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
                );
                localStorage.setItem('users', JSON.stringify(users));
                resolve(updatedUser);
            }, 500);
        });
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        // Имитация запроса к API
        return new Promise((resolve) => {
            setTimeout(() => {
                const savedUsers = localStorage.getItem('users');
                let users = savedUsers ? JSON.parse(savedUsers) : [];
                users = users.filter(user => user.id !== id);
                localStorage.setItem('users', JSON.stringify(users));
                resolve(id);
            }, 500);
        });
    }
);

export const addUser = createAsyncThunk(
    'users/addUser',
    async (newUser) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const savedUsers = localStorage.getItem('users');
                let users = savedUsers ? JSON.parse(savedUsers) : [];
                const id = Math.max(...users.map(u => u.id), 0) + 1;
                const userToAdd = { ...newUser, id };
                users.push(userToAdd);
                localStorage.setItem('users', JSON.stringify(users));
                resolve(userToAdd);
            }, 500);
        });
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        currentUser: null // для хранения данных авторизованного пользователя
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Получение списка пользователей
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Обновление пользователя
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                );
                // Обновляем currentUser если это он
                if (state.currentUser && state.currentUser.id === action.payload.id) {
                    state.currentUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Удаление пользователя
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Добавление пользователя
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setCurrentUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;

// Селекторы
export const selectAllUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectIsAdmin = (state) => state.users.currentUser?.role === 'admin';