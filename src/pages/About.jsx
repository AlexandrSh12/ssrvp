// src/pages/About.jsx
import React from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Avatar,
    Grid,
    Divider,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import InterestsIcon from '@mui/icons-material/Interests';

const About = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
                О себе
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <Avatar
                            alt="Профиль пользователя"
                            src="../public/react.webp"
                            sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Александр Шаповалов
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Студент
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Email:</strong> alexsh@example.com
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Группа:</strong> 4.105-1
                            </Typography>
                            <Typography variant="body2">
                                <strong>Год обучения:</strong> 2025
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Обо мне
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Я студент направления "Фундаментальная информатика и информационные технологии".
                                Изучаю веб-разработку на курсе Современные средства разработки Web-приложений,
                                в частности React и связанные с ним технологии. Этот проект является частью моего учебного курса.
                            </Typography>
                            <Typography variant="body1">
                                В процессе обучения я осваиваю различные библиотеки и фреймворки,
                                такие как Material-UI, Redux и React Router.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Мои навыки и интересы
                            </Typography>

                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Образование"
                                        secondary="Изучаю информационные системы и технологии в университете"
                                    />
                                </ListItem>

                                <Divider variant="inset" component="li" />

                                <ListItem>
                                    <ListItemIcon>
                                        <CodeIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Навыки программирования"
                                        secondary="JavaScript, React, HTML, CSS, Material-UI"
                                    />
                                </ListItem>

                                <Divider variant="inset" component="li" />

                                <ListItem>
                                    <ListItemIcon>
                                        <InterestsIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Интересы"
                                        secondary="Веб-разработка, Backend, Frontend"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default About;