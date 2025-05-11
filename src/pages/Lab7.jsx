// src/pages/Lab7.jsx
import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

const Lab7 = () => {
    return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Лабораторная работа 7
                </Typography>

                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Внедрение Material-UI и адаптивность
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Добавление Material-UI библиотеки"
                                    secondary="Внедрена библиотека MUI для создания адаптивного интерфейса"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Адаптивный Header"
                                    secondary="Реализован Header с навигацией (Главная, О себе) и переключателем темы"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Выдвижное меню"
                                    secondary="Добавлено скрываемое меню с лабораторными работами"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Профиль пользователя"
                                    secondary="Профиль пользователя приведен к стандартам Material-UI"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Нижнее меню"
                                    secondary="Добавлены кнопки быстрых действий в нижнем меню"
                                />
                            </ListItem>
                        </List>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">
                                Приложение адаптировано под различные размеры устройств, включая мобильные телефоны,
                                планшеты и настольные компьютеры.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
    );
};

export default Lab7;