import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import { Button as MuiButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useLoginState from '../hooks/useLoginState';

const Lab7 = () => {
    const isLoggedIn = useLoginState();
    const user = useSelector(state => state.auth.user);
    const [openDrawer, setOpenDrawer] = useState(false);

    const projects = [
        {
            id: 1,
            title: 'Проект 1',
            description: 'Описание первого проекта. React и Material UI.'
        },
        {
            id: 2,
            title: 'Проект 2',
            description: 'Описание второго проекта. Redux и API.'
        },
        {
            id: 3,
            title: 'Проект 3',
            description: 'Описание третьего проекта. Адаптивная верстка.'
        }
    ];

    return (
        <div>
            <h2>Лабораторная 7</h2>

            {/* Drawer Menu Toggle Button */}
            <MuiButton
                variant="contained"
                color="primary"
                onClick={() => setOpenDrawer(!openDrawer)}
                sx={{ marginBottom: 2 }}
            >
                {openDrawer ? 'Скрыть меню' : 'Показать меню'}
            </MuiButton>

            {/* Drawer Menu */}
            {openDrawer && (
                <div className="drawer-menu" style={{
                    width: '250px',
                    padding: '1rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                }}>
                    <Typography variant="h6" component="div">
                        Быстрая навигация
                    </Typography>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ padding: '0.5rem 0' }}>
                            <a href="#projects">Проекты</a>
                        </li>
                        <li style={{ padding: '0.5rem 0' }}>
                            <a href="#about">О себе</a>
                        </li>
                        <li style={{ padding: '0.5rem 0' }}>
                            <a href="#contacts">Контакты</a>
                        </li>
                    </ul>
                    {isLoggedIn && (
                        <div style={{ marginTop: '1rem' }}>
                            <Typography variant="subtitle2">
                                Вы вошли как: {user.name}
                            </Typography>
                        </div>
                    )}
                </div>
            )}

            <div className="page-content">
                {/* Hero Section */}
                <Container>
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <Typography variant="h3" component="div" gutterBottom>
                            Добро пожаловать в Лабораторную 7
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Интеграция Material UI и создание адаптивной верстки
                        </Typography>
                        <MuiButton variant="contained" color="primary" sx={{ marginTop: 2 }}>
                            Начать
                        </MuiButton>
                    </div>
                </Container>

                {/* Projects Section */}
                <section id="projects">
                    <Container>
                        <Typography variant="h4" component="div" gutterBottom sx={{ marginBottom: 3 }}>
                            Мои проекты
                        </Typography>

                        <Grid container spacing={3}>
                            {projects.map(project => (
                                <Grid item xs={12} sm={6} md={4} key={project.id}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={`/api/placeholder/400/140`}
                                            title={project.title}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {project.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {project.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <MuiButton size="small">Подробнее</MuiButton>
                                            <MuiButton size="small">Демо</MuiButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </section>

                {/* About Me Section */}
                <section id="about" style={{ marginTop: '2rem' }}>
                    <Container>
                        <Typography variant="h4" component="div" gutterBottom sx={{ marginBottom: 3 }}>
                            О себе
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`/api/placeholder/600/300`}
                                    alt="Фото профиля"
                                    sx={{ borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" gutterBottom>
                                    Имя Фамилия
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Я студент, изучающий React и веб-разработку. Мне нравится создавать современные интерфейсы и изучать новые технологии.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Этот проект был создан в рамках курса по React для демонстрации навыков работы с компонентами, маршрутизацией, управлением состоянием и интеграцией UI-библиотек.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Технологии, которые я использую: React, Redux, Material UI, React Router.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </section>

                {/* Contact Section */}
                <section id="contacts" style={{ marginTop: '2rem' }}>
                    <Container>
                        <Typography variant="h4" component="div" gutterBottom sx={{ marginBottom: 3 }}>
                            Контакты
                        </Typography>

                        <Card sx={{ padding: 2 }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom>
                                            Свяжитесь со мной
                                        </Typography>
                                        <Typography variant="body1">Email: example@example.com</Typography>
                                        <Typography variant="body1">GitHub: github.com/username</Typography>
                                        <Typography variant="body1">LinkedIn: linkedin.com/in/username</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom>
                                            Местоположение
                                        </Typography>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`/api/placeholder/600/200`}
                                            alt="Карта"
                                            sx={{ borderRadius: 1 }}
                                        />
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                                            Москва, Россия
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                </section>
            </div>

            {/* Mobile Notice */}
            <div className="mobile-notice" style={{
                display: 'none',
                padding: '1rem',
                backgroundColor: '#f0f4ff',
                marginTop: '2rem',
                borderRadius: '4px',
                '@media (max-width: 600px)': {
                    display: 'block'
                }
            }}>
                <Typography variant="body2">
                    Вы просматриваете мобильную версию сайта. Для полного опыта используйте десктопную версию.
                </Typography>
            </div>
        </div>
    );
};

export default Lab7;