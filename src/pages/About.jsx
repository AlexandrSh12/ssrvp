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
                            src="/api/placeholder/150/150"
                            sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Студент
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Разработчик React
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Email:</strong> student@example.com
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Группа:</strong> ИСиТ-0-00
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
                                Я студент направления "Информационные системы и технологии".
                                Изучаю веб-разработку, в частности React и связанные с ним
                                технологии. Этот проект является частью моего учебного курса.
                            </Typography>
                            <Typography variant="body1">
                                В процессе обучения я осваиваю различные библиотеки и фреймворки,
                                такие как Material-UI, Redux и React Router, что позволяет создавать
                                современные, адаптивные и функциональные веб-приложения.
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
                                        secondary="Веб-разработка, UX/UI дизайн, мобильные технологии"
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